import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Mode = "sober" | "entoptic" | "altered" | "glyph" | "substrate";
type Material = "all" | "wall" | "water" | "quartz" | "bamboo" | "magnet" | "observer";

type Params = {
  mode: Mode;
  wavelength: number;
  diffraction: number;
  speckle: number;
  entoptic: number;
  perception: number;
  meaning: number;
  glyphs: number;
  time: number;
  reveal: number;
  sweep: number;
  seed: number;
  material: Material;
};

const modes: Mode[] = ["sober", "entoptic", "altered", "glyph", "substrate"];
const materials: Material[] = ["all", "wall", "water", "quartz", "bamboo", "magnet", "observer"];
const glyphs = ["ア", "ミ", "サ", "◇", "△", "∴", "λ", "φ", "Ω", "369", "⟡", "∿", "ψ", "⌬"];

const presets: Record<Mode, Partial<Params>> = {
  sober: { mode: "sober", entoptic: 0.05, perception: 0.08, meaning: 0.05, glyphs: 0.02, time: 0.1, reveal: 0.08 },
  entoptic: { mode: "entoptic", entoptic: 0.55, perception: 0.18, meaning: 0.18, glyphs: 0.12, time: 0.22, reveal: 0.18 },
  altered: { mode: "altered", entoptic: 0.66, perception: 0.72, meaning: 0.42, glyphs: 0.28, time: 0.52, reveal: 0.34 },
  glyph: { mode: "glyph", entoptic: 0.74, perception: 0.86, meaning: 0.74, glyphs: 0.78, time: 0.7, reveal: 0.62 },
  substrate: { mode: "substrate", entoptic: 0.62, perception: 0.78, meaning: 0.92, glyphs: 0.96, time: 0.84, reveal: 0.93 },
};

const initial: Params = {
  mode: "substrate",
  wavelength: 650,
  diffraction: 0.82,
  speckle: 0.42,
  entoptic: 0.62,
  perception: 0.74,
  meaning: 0.92,
  glyphs: 0.96,
  time: 0.82,
  reveal: 0.92,
  sweep: 0.72,
  seed: 369,
  material: "all",
};

function clamp(n: number) { return Math.max(0, Math.min(1, n)); }
function noise(x: number, y: number, seed: number) { const v = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453; return v - Math.floor(v); }
function rgb(w: number) { if (w < 455) return [116, 78, 255]; if (w < 565) return [50, 255, 126]; if (w < 610) return [255, 190, 62]; return [255, 35, 25]; }

function drawField(canvas: HTMLCanvasElement, p: Params, t: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = 420, h = 280, c = rgb(p.wavelength), beat = 8 + p.diffraction * 28, drift = t * (0.18 + p.time * 0.52);
  canvas.width = w; canvas.height = h;
  const img = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    const ny = (y / h - 0.5) * 2;
    for (let x = 0; x < w; x++) {
      const nx = (x / w - 0.5) * 2, r = Math.sqrt(nx * nx + ny * ny), th = Math.atan2(ny, nx);
      const grating = Math.sin((nx * beat + Math.sin(th * 3 + drift) * 0.42) * Math.PI);
      const radial = Math.sin(r * (35 + p.diffraction * 58) - drift * 4.2 + th * (2 + p.meaning * 6));
      const lattice = Math.sin((nx + ny) * beat * 1.22 + drift) * Math.sin((nx - ny) * beat * 1.1 - drift);
      const speck = (noise(Math.floor(x / 2), Math.floor(y / 2), p.seed) - 0.5) * p.speckle * 1.8;
      const macula = Math.cos(th * 2 + drift) * Math.exp(-r * 2.4);
      const neural = Math.sin(th * (6 + p.perception * 12) + r * (18 + p.perception * 42) - drift * 5);
      let f = 0.34 + 0.24 * grating + 0.24 * radial + 0.18 * lattice + speck;
      f = f * (0.55 + 0.45 * Math.max(0, 1 - r * 0.85)) + p.entoptic * macula * 0.28 + p.perception * 0.18 * neural;
      const intensity = clamp(Math.pow(clamp(f), 1.3 - p.perception * 0.55));
      const i = (y * w + x) * 4, glow = 0.16 + intensity * 1.35;
      img.data[i] = Math.min(255, c[0] * glow + intensity * 40);
      img.data[i+1] = Math.min(255, c[1] * glow + intensity * 18);
      img.data[i+2] = Math.min(255, c[2] * glow + intensity * 36 * p.perception);
      img.data[i+3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  ctx.save(); ctx.globalCompositeOperation = "screen"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  for (let i = 0; i < Math.floor(p.glyphs * 130); i++) {
    const a = noise(i * 17, p.seed, 3) * Math.PI * 2 + t * (0.03 + p.time * 0.08);
    const orbit = 0.18 + noise(i, i, p.seed) * 0.78;
    const x = w / 2 + Math.cos(a * (1 + p.meaning)) * orbit * w * 0.48;
    const y = h / 2 + Math.sin(a * (1.2 + p.perception * 0.5)) * orbit * h * 0.48;
    ctx.font = `${10 + noise(i, 12, p.seed) * 18 + p.meaning * 8}px ui-monospace, Menlo, Consolas, monospace`;
    ctx.fillStyle = `rgba(255,255,255,${0.08 + p.glyphs * 0.42 * noise(i + 8, 9, p.seed)})`;
    ctx.fillText(glyphs[i % glyphs.length], x, y);
  }
  ctx.restore();
  ctx.fillStyle = "rgba(0,0,0,0.36)"; ctx.fillRect(14, h - 56, w - 28, 42);
  ctx.fillStyle = "rgba(255,255,255,0.72)"; ctx.font = "12px ui-monospace, Menlo, Consolas, monospace";
  ctx.fillText("LEDGER: toy-model simulation · no external-reality proof", 24, h - 33);
  ctx.fillText(`MODE: ${p.mode} · λ ${p.wavelength}nm · C = G(N(E(L)))`, 24, h - 17);
}

function drawChamber(canvas: HTMLCanvasElement, p: Params, t: number) {
  const ctx = canvas.getContext("2d"); if (!ctx) return;
  const w = 720, h = 420, c = rgb(p.wavelength), sweep = Math.sin(t * (0.35 + p.sweep * 1.8)) * (16 + p.sweep * 80);
  canvas.width = w; canvas.height = h;
  const bg = ctx.createRadialGradient(w * 0.55, h * 0.2, 30, w * 0.45, h * 0.45, w * 0.85);
  bg.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${0.08 + p.reveal * 0.16})`); bg.addColorStop(0.46, "#10080e"); bg.addColorStop(1, "#020103");
  ctx.fillStyle = bg; ctx.fillRect(0,0,w,h);
  ctx.strokeStyle = "rgba(255,255,255,0.09)"; ctx.fillStyle = "rgba(255,255,255,0.035)";
  ctx.beginPath(); ctx.moveTo(100,52); ctx.lineTo(620,52); ctx.lineTo(670,328); ctx.lineTo(50,328); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},0.88)`; ctx.lineWidth = 3; ctx.shadowBlur = 18; ctx.shadowColor = `rgba(${c[0]},${c[1]},${c[2]},0.9)`;
  ctx.beginPath(); ctx.moveTo(62, 210 + sweep * 0.12); ctx.lineTo(625, 185 + sweep * 0.2); ctx.stroke(); ctx.shadowBlur = 0;
  const alpha = (m: Material) => p.material === "all" || p.material === m ? 1 : 0.18;
  const drawBox = (m: Material, x: number, y: number, ww: number, hh: number, label: string) => { ctx.save(); ctx.globalAlpha = alpha(m); ctx.fillStyle = "rgba(255,255,255,0.055)"; ctx.strokeStyle = "rgba(255,255,255,0.18)"; ctx.fillRect(x,y,ww,hh); ctx.strokeRect(x,y,ww,hh); ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.fillText(label,x+10,y+20); ctx.restore(); for(let i=0;i<24*p.reveal;i++){ ctx.fillStyle=`rgba(255,255,255,${alpha(m)*p.reveal*(0.06+0.22*noise(i,3,p.seed))})`; ctx.font=`${12+noise(i,4,p.seed)*15}px ui-monospace`; ctx.fillText(glyphs[(i+m.length)%glyphs.length],x+18+noise(i,5,p.seed)*Math.max(1,ww-36),y+32+noise(i,6,p.seed)*Math.max(1,hh-44)); } };
  drawBox("wall",430,78,170,150,"wall"); drawBox("water",195,272,130,42,"water"); drawBox("quartz",392,202,70,74,"quartz"); drawBox("bamboo",126,172,42,154,"bamboo"); drawBox("magnet",490,252,112,94,"magnet"); drawBox("observer",40,220,72,120,"observer");
  ctx.fillStyle = "rgba(0,0,0,0.42)"; ctx.fillRect(22,22,312,34); ctx.fillStyle = "rgba(255,255,255,0.74)"; ctx.font = "13px ui-monospace, Menlo, Consolas, monospace"; ctx.fillText(`Material Code Chamber · focus=${p.material}`,34,44);
}

function LoopCanvas({ p, chamber = false }: { p: Params; chamber?: boolean }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => { let frame = 0, raf = 0; const loop = () => { if (ref.current) chamber ? drawChamber(ref.current, p, frame / 60) : drawField(ref.current, p, frame / 60); frame++; raf = requestAnimationFrame(loop); }; loop(); return () => cancelAnimationFrame(raf); }, [p, chamber]);
  return <canvas className={chamber ? "chamber-canvas" : "sim-canvas"} ref={ref} />;
}

function Slider({ label, value, min = 0, max = 1, step = 0.01, onChange }: { label: string; value: number; min?: number; max?: number; step?: number; onChange: (n: number) => void }) {
  return <label className="slider-row"><span>{label}</span><input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))}/><b>{value.toFixed(step === 1 ? 0 : 2)}</b></label>;
}
function Meter({ label, value, note }: { label: string; value: number; note: string }) { return <div className="meter-row"><div className="meter-copy"><strong>{label}</strong><span>{note}</span></div><div className="meter-track"><i style={{ width: `${Math.round(value * 100)}%` }} /></div><b>{Math.round(value * 100)}%</b></div>; }

function App() {
  const [p, setP] = useState<Params>(initial);
  const set = (patch: Partial<Params>) => setP((prev) => ({ ...prev, ...patch }));
  const optics = clamp((p.diffraction + p.speckle + p.entoptic) / 3), perception = clamp((p.perception + p.meaning + p.time) / 3), coherence = clamp((p.glyphs * 0.65) + (p.meaning * 0.35));
  return <main className="shell">
    <header className="hero"><div><p className="eyebrow">Parallax Lab · MVP v0.2</p><h1>CodeVeil369</h1><p className="subtitle">A claim-safe structured-light perception simulator plus symbolic substrate-code renderer.</p></div><div className="formula">C = G(N(E(L)))</div></header>
    <section className="workbench"><div className="viewer"><LoopCanvas p={p}/><div className="mode-buttons">{modes.map((m) => <button key={m} className={p.mode === m ? "active" : ""} onClick={() => set(presets[m])}>{m}</button>)}</div></div><aside className="panel"><h2>Simulation Controls</h2><Slider label="Wavelength nm" min={400} max={700} step={1} value={p.wavelength} onChange={(n) => set({ wavelength: n })}/><Slider label="Diffraction" value={p.diffraction} onChange={(n) => set({ diffraction: n })}/><Slider label="Speckle" value={p.speckle} onChange={(n) => set({ speckle: n })}/><Slider label="Entoptic filter" value={p.entoptic} onChange={(n) => set({ entoptic: n })}/><Slider label="Perceptual intensity" value={p.perception} onChange={(n) => set({ perception: n })}/><Slider label="Meaning binding" value={p.meaning} onChange={(n) => set({ meaning: n })}/><Slider label="Glyph emergence" value={p.glyphs} onChange={(n) => set({ glyphs: n })}/><Slider label="Time elasticity" value={p.time} onChange={(n) => set({ time: n })}/><Slider label="Seed" min={1} max={999} step={1} value={p.seed} onChange={(n) => set({ seed: n })}/></aside></section>
    <section className="chamber-section"><div className="chamber-card"><div className="section-title"><div><p className="eyebrow">v0.2 chamber</p><h2>Material Code Chamber</h2></div><p>Every material has a symbolic code-language. The observer is modeled as a perception lens, not a proof source.</p></div><LoopCanvas p={p} chamber/><div className="focus-buttons">{materials.map((m) => <button key={m} className={p.material === m ? "active" : ""} onClick={() => set({ material: m })}>{m}</button>)}</div></div><aside className="panel chamber-controls"><h2>Chamber Controls</h2><Slider label="Substrate reveal" value={p.reveal} onChange={(n) => set({ reveal: n })}/><Slider label="Sweep" value={p.sweep} onChange={(n) => set({ sweep: n })}/><Meter label="Optical carrier" value={optics} note="diffraction + speckle + entoptic seed"/><Meter label="Perceptual gain" value={perception} note="toy-model intensity + binding + time"/><Meter label="Glyph coherence" value={coherence} note="symbol emergence from field attractors"/><Meter label="Substrate reveal" value={p.reveal} note="artistic matter-as-code rendering"/></aside></section>
    <section className="cards"><article><h3>Ledger Panel</h3><p><strong>Evidence tier:</strong> symbolic / artistic toy model.</p><p><strong>External reality claim:</strong> not asserted.</p></article><article><h3>Layer Map</h3><p><strong>L</strong> structured field → <strong>E</strong> entoptic transform → <strong>N</strong> perceptual toy model → <strong>G</strong> glyph attractor.</p></article><article><h3>Test Harness</h3><p>Same-seed and material-focus comparisons belong here in future sprints.</p></article><article><h3>Safety Boundary</h3><p>Software-only model. Do not treat visuals as proof.</p></article></section>
  </main>;
}

createRoot(document.getElementById("root")!).render(<App />);
