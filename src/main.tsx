import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { drawChamber } from "./kernels/chamberKernel";
import { drawField } from "./kernels/fieldKernel";
import { clamp } from "./kernels/visualMath";
import { materials, modePatch, modes, initialParams, instrumentPresets } from "./data/presets";
import { receipts } from "./data/receipts";
import { exportPosterPng } from "./utils/exportPoster";
import { exportComparisonPoster } from "./utils/exportComparisonPoster";
import { downloadPresetLedger, makePresetLedgerEntry, readPresetLedgerFile, type PresetLedgerEntry } from "./utils/presetLedger";
import { snapshotHash } from "./utils/snapshotHash";
import type { Params, ReceiptTier } from "./types";

const GALLERY_KEY = "codeveil369.gallery.v1";
type CompareView = "field" | "chamber";

function LoopCanvas({ params, chamber = false, canvasRef }: { params: Params; chamber?: boolean; canvasRef?: React.RefObject<HTMLCanvasElement | null> }) {
  const localRef = useRef<HTMLCanvasElement | null>(null);
  const ref = canvasRef ?? localRef;
  useEffect(() => {
    let frame = 0;
    let raf = 0;
    const loop = () => {
      if (ref.current) chamber ? drawChamber(ref.current, params, frame / 60) : drawField(ref.current, params, frame / 60);
      frame++;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [params, chamber, ref]);
  return <canvas className={chamber ? "chamber-canvas" : "sim-canvas"} ref={ref} />;
}

function Slider({ label, value, min = 0, max = 1, step = 0.01, onChange }: { label: string; value: number; min?: number; max?: number; step?: number; onChange: (n: number) => void }) {
  return <label className="slider-row"><span>{label}</span><input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} /><b>{value.toFixed(step === 1 ? 0 : 2)}</b></label>;
}

function Meter({ label, value, note }: { label: string; value: number; note: string }) {
  return <div className="meter-row"><div className="meter-copy"><strong>{label}</strong><span>{note}</span></div><div className="meter-track"><i style={{ width: `${Math.round(value * 100)}%` }} /></div><b>{Math.round(value * 100)}%</b></div>;
}

function App() {
  const [params, setParams] = useState<Params>(initialParams);
  const [compareParams, setCompareParams] = useState<Params>({ ...initialParams, ...modePatch.sober, material: "wall" });
  const [presetId, setPresetId] = useState("substrate-chamber");
  const [tier, setTier] = useState<ReceiptTier>("symbolic");
  const [status, setStatus] = useState("CodeVeil369 v0.8 A/B export ready.");
  const [compareView, setCompareView] = useState<CompareView>("field");
  const [gallery, setGallery] = useState<PresetLedgerEntry[]>([]);
  const fieldRef = useRef<HTMLCanvasElement | null>(null);
  const chamberRef = useRef<HTMLCanvasElement | null>(null);
  const currentCompareRef = useRef<HTMLCanvasElement | null>(null);
  const comparisonCompareRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<HTMLElement | null>(null);
  const set = (patch: Partial<Params>) => setParams((prev) => ({ ...prev, ...patch }));
  const activePreset = instrumentPresets.find((item) => item.id === presetId);
  const currentHash = snapshotHash(params);
  const compareHash = snapshotHash(compareParams);
  const optics = clamp((params.diffraction + params.speckle + params.entoptic) / 3);
  const perception = clamp((params.perception + params.meaning + params.time) / 3);
  const coherence = clamp(params.glyphs * 0.65 + params.meaning * 0.35);
  const ledgerEntry = useMemo(() => makePresetLedgerEntry({ params, presetId, receiptTier: tier, ledgerBoundary: receipts[tier].boundary }), [params, presetId, tier]);
  const shareText = useMemo(() => [`CodeVeil369 snapshot: ${currentHash}`, `Preset: ${activePreset?.name ?? "custom / loaded JSON"}`, `Mode: ${params.mode} · Material focus: ${params.material} · Seed: ${params.seed}`, `Compare: ${compareHash} · ${compareView}`, `Ledger tier: ${receipts[tier].label}`, `Boundary: ${receipts[tier].boundary}`, "This is a symbolic perception simulation, not proof of external code."].join("\n"), [activePreset, currentHash, compareHash, compareView, params.mode, params.material, params.seed, tier]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(GALLERY_KEY);
      if (saved) setGallery(JSON.parse(saved));
    } catch {
      setStatus("Preset gallery could not be loaded in this browser.");
    }
  }, []);

  function writeGallery(next: PresetLedgerEntry[]) { setGallery(next); try { localStorage.setItem(GALLERY_KEY, JSON.stringify(next)); } catch { setStatus("Preset gallery could not be saved in this browser."); } }
  function applyPreset(id: string) { const preset = instrumentPresets.find((item) => item.id === id); if (!preset) return; setParams((prev) => ({ ...prev, ...preset.patch })); setPresetId(id); setStatus(`Preset loaded: ${preset.name}.`); }
  async function copyShareText() { try { await navigator.clipboard.writeText(shareText); setStatus("Share text copied to clipboard."); } catch { setStatus("Clipboard copy failed in this browser."); } }
  async function copySnapshotJson() { try { await navigator.clipboard.writeText(JSON.stringify(ledgerEntry, null, 2)); setStatus(`Preset ledger JSON copied: ${ledgerEntry.snapshotHash}.`); } catch { setStatus("JSON copy failed in this browser."); } }
  function savePresetJson() { downloadPresetLedger(ledgerEntry); setStatus(`Preset ledger JSON downloaded: ${ledgerEntry.snapshotHash}.`); }
  function saveToGallery() { const next = [ledgerEntry, ...gallery.filter((item) => item.snapshotHash !== ledgerEntry.snapshotHash)].slice(0, 12); writeGallery(next); setStatus(`Saved to local gallery: ${ledgerEntry.snapshotHash}.`); }
  function clearGallery() { writeGallery([]); setStatus("Local preset gallery cleared."); }
  function loadGalleryItem(entry: PresetLedgerEntry) { setParams(entry.params); setCompareParams((prev) => ({ ...prev, seed: entry.params.seed })); setPresetId(entry.presetId); setTier(entry.receiptTier); setStatus(`Loaded gallery snapshot: ${entry.snapshotHash}.`); }
  async function loadPresetJson(event: React.ChangeEvent<HTMLInputElement>) { const file = event.target.files?.[0]; if (!file) return; try { const entry = await readPresetLedgerFile(file); setParams(entry.params); setCompareParams((prev) => ({ ...prev, seed: entry.params.seed })); setPresetId(entry.presetId); setTier(entry.receiptTier); setStatus(`Loaded preset ledger: ${entry.snapshotHash ?? entry.presetId}.`); } catch { setStatus("Preset ledger load failed."); } finally { event.target.value = ""; } }
  function exportPoster() { if (!fieldRef.current || !chamberRef.current) return setStatus("Poster export failed because a canvas is not ready yet."); const ok = exportPosterPng({ field: fieldRef.current, chamber: chamberRef.current, params, activePresetId: presetId, presets: instrumentPresets, receiptLabel: receipts[tier].label, receiptSummary: receipts[tier].summary, receiptBoundary: `${receipts[tier].boundary} Snapshot ${currentHash}.` }); setStatus(ok ? "Poster exported as PNG." : "Poster export failed."); }
  function exportAB() { if (!currentCompareRef.current || !comparisonCompareRef.current) return setStatus("A/B export failed because comparison canvases are not ready yet."); const ok = exportComparisonPoster({ currentCanvas: currentCompareRef.current, comparisonCanvas: comparisonCompareRef.current, currentParams: params, comparisonParams: compareParams, viewMode: compareView, receiptTier: tier, receiptLabel: receipts[tier].label, receiptBoundary: receipts[tier].boundary }); setStatus(ok ? `A/B poster exported: ${currentHash} vs ${compareHash}.` : "A/B poster export failed."); }
  async function toggleFullscreen() { const node = appRef.current; if (!node) return; try { if (!document.fullscreenElement) { await node.requestFullscreen(); setStatus("Entered fullscreen mode."); } else { await document.exitFullscreen(); setStatus("Exited fullscreen mode."); } } catch { setStatus("Fullscreen is not available in this browser."); } }
  function compareFromCurrent() { setCompareParams(params); setStatus(`A/B captured from current settings: ${currentHash}.`); }
  function compareSameSeed(mode: "sober" | "glyph" | "substrate") { setCompareParams((prev) => ({ ...prev, ...modePatch[mode], seed: params.seed, material: params.material, wavelength: params.wavelength })); setStatus(`A/B comparison set to same-seed ${mode}.`); }
  return <main className="shell" ref={appRef}>
    <header className="hero"><div><p className="eyebrow">Parallax Lab · MVP v0.8</p><h1>CodeVeil369</h1><p className="subtitle">A claim-safe structured-light perception simulator plus symbolic substrate-code renderer.</p></div><div className="formula">{currentHash}</div></header>
    <section className="viewer" style={{ marginBottom: 18 }}><div style={{ display: "flex", gap: 18, flexWrap: "wrap", justifyContent: "space-between" }}><div><p className="eyebrow">a/b export</p><h2>v0.8 Comparison Receipts</h2><p style={{ color: "#d9bec6", maxWidth: 560 }}>Export a poster that captures current vs comparison view, both snapshot hashes, mode, seed, material, and Ledger tier.</p></div><div className="mode-buttons"><select value={presetId} onChange={(event) => applyPreset(event.target.value)}>{instrumentPresets.map((preset) => <option key={preset.id} value={preset.id}>{preset.name}</option>)}</select><button onClick={() => applyPreset(presetId)}>Load preset</button><button onClick={exportPoster}>Export poster</button><button onClick={exportAB}>Export A/B</button><button onClick={copyShareText}>Copy share text</button><button onClick={toggleFullscreen}>Fullscreen</button></div></div><p style={{ color: "#d9bec6" }}><strong>{activePreset?.name ?? "Loaded JSON"}</strong> — {activePreset?.note ?? "Custom preset ledger loaded from JSON."}</p><div className="mode-buttons"><button onClick={savePresetJson}>Save JSON</button><button onClick={copySnapshotJson}>Copy JSON</button><button onClick={saveToGallery}>Save Gallery</button><button onClick={clearGallery}>Clear Gallery</button><label style={{ border: "1px solid rgba(255,255,255,.12)", borderRadius: 999, padding: "9px 13px", cursor: "pointer" }}>Load JSON<input style={{ display: "none" }} type="file" accept="application/json" onChange={loadPresetJson} /></label><button onClick={compareFromCurrent}>Capture A/B</button><button onClick={() => compareSameSeed("sober")}>A/B Sober</button><button onClick={() => compareSameSeed("glyph")}>A/B Glyph</button><button onClick={() => compareSameSeed("substrate")}>A/B Substrate</button></div></section>
    <section className="workbench"><div className="viewer"><LoopCanvas params={params} canvasRef={fieldRef} /><div className="mode-buttons">{modes.map((mode) => <button key={mode} className={params.mode === mode ? "active" : ""} onClick={() => { set(modePatch[mode]); setStatus(`Mode changed to ${mode}.`); }}>{mode}</button>)}</div></div><aside className="panel"><h2>Simulation Controls</h2><Slider label="Wavelength nm" min={400} max={700} step={1} value={params.wavelength} onChange={(n) => set({ wavelength: n })} /><Slider label="Diffraction" value={params.diffraction} onChange={(n) => set({ diffraction: n })} /><Slider label="Speckle" value={params.speckle} onChange={(n) => set({ speckle: n })} /><Slider label="Entoptic filter" value={params.entoptic} onChange={(n) => set({ entoptic: n })} /><Slider label="Perceptual intensity" value={params.perception} onChange={(n) => set({ perception: n })} /><Slider label="Meaning binding" value={params.meaning} onChange={(n) => set({ meaning: n })} /><Slider label="Glyph emergence" value={params.glyphs} onChange={(n) => set({ glyphs: n })} /><Slider label="Time elasticity" value={params.time} onChange={(n) => set({ time: n })} /><Slider label="Seed" min={1} max={999} step={1} value={params.seed} onChange={(n) => set({ seed: n })} /></aside></section>
    <section className="chamber-section"><div className="chamber-card"><div className="section-title"><div><p className="eyebrow">v0.8 chamber</p><h2>Material Code Chamber</h2></div><p>Every material has a symbolic code-language. The observer is modeled as a perception lens, not a proof source.</p></div><LoopCanvas params={params} chamber canvasRef={chamberRef} /><div className="focus-buttons">{materials.map((material) => <button key={material} className={params.material === material ? "active" : ""} onClick={() => { set({ material }); setStatus(`Material focus set to ${material}.`); }}>{material}</button>)}</div></div><aside className="panel chamber-controls"><h2>Chamber Controls</h2><Slider label="Substrate reveal" value={params.reveal} onChange={(n) => set({ reveal: n })} /><Slider label="Sweep" value={params.sweep} onChange={(n) => set({ sweep: n })} /><Meter label="Optical carrier" value={optics} note="diffraction + speckle + entoptic seed" /><Meter label="Perceptual gain" value={perception} note="toy-model intensity + binding + time" /><Meter label="Glyph coherence" value={coherence} note="symbol emergence from field attractors" /><Meter label="Substrate reveal" value={params.reveal} note="artistic matter-as-code rendering" /></aside></section>
    <section className="chamber-section"><div className="viewer"><div className="section-title"><div><p className="eyebrow">current · {currentHash}</p><h2>{compareView === "field" ? "Current Field" : "Current Chamber"}</h2></div><p>Mode {params.mode} · seed {params.seed} · material {params.material}</p></div>{compareView === "field" ? <LoopCanvas params={params} canvasRef={currentCompareRef} /> : <LoopCanvas params={params} chamber canvasRef={currentCompareRef} />}</div><div className="viewer"><div className="section-title"><div><p className="eyebrow">comparison · {compareHash}</p><h2>{compareView === "field" ? "Compare Field" : "Compare Chamber"}</h2></div><p>Mode {compareParams.mode} · seed {compareParams.seed} · material {compareParams.material}</p></div>{compareView === "field" ? <LoopCanvas params={compareParams} canvasRef={comparisonCompareRef} /> : <LoopCanvas params={compareParams} chamber canvasRef={comparisonCompareRef} />}<div className="mode-buttons"><button className={compareView === "field" ? "active" : ""} onClick={() => setCompareView("field")}>Field compare</button><button className={compareView === "chamber" ? "active" : ""} onClick={() => setCompareView("chamber")}>Chamber compare</button><button onClick={exportAB}>Export A/B</button></div></div></section>
    <section className="cards"><article><h3>A/B Export Receipt</h3><p><strong>Current:</strong> {currentHash}</p><p><strong>Compare:</strong> {compareHash}</p><p><strong>View:</strong> {compareView}</p><p><strong>Match:</strong> {currentHash === compareHash ? "same parameter bundle" : "different parameter bundle"}</p></article><article><h3>Ledger Panel</h3><p><strong>Evidence tier:</strong> {receipts[tier].label}.</p><p><strong>External reality claim:</strong> not asserted.</p><p><strong>Boundary:</strong> perception and symbolic rendering only.</p></article><article><h3>Ledger Receipt</h3><label style={{ display: "block", marginBottom: 10 }}><span>Receipt tier</span><select style={{ width: "100%" }} value={tier} onChange={(event) => setTier(event.target.value as ReceiptTier)}>{Object.entries(receipts).map(([key, info]) => <option key={key} value={key}>{info.label}</option>)}</select></label><p>{receipts[tier].summary}</p><p><strong>Boundary:</strong> {receipts[tier].boundary}</p></article><article><h3>Preset Gallery</h3>{gallery.length === 0 ? <p>No local snapshots saved yet.</p> : gallery.map((item) => <p key={item.snapshotHash}><button onClick={() => loadGalleryItem(item)}>Load</button> <strong>{item.snapshotHash}</strong><br />{item.params.mode} · seed {item.params.seed}</p>)}</article></section>
    <section className="cards"><article style={{ gridColumn: "1 / -1" }}><h3>Snapshot JSON</h3><pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: ".72rem", maxHeight: 260, overflow: "auto" }}>{JSON.stringify(ledgerEntry, null, 2)}</pre></article></section>
    <section className="status-card"><p className="eyebrow">instrument status</p><h3>Runtime Messages</h3><p>{status}</p></section>
  </main>;
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
