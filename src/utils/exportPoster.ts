import type { Params, Preset } from "../types";
import { snapshotHash } from "./snapshotHash";

export function exportPosterPng(args: { field: HTMLCanvasElement; chamber: HTMLCanvasElement; params: Params; activePresetId: string; presets: Preset[]; receiptLabel: string; receiptSummary: string; receiptBoundary: string }) {
  const out = document.createElement("canvas");
  const ctx = out.getContext("2d");
  if (!ctx) return false;

  out.width = 1600;
  out.height = 2200;
  const hash = snapshotHash(args.params);
  const presetName = args.presets.find((preset) => preset.id === args.activePresetId)?.name ?? "custom";
  const bg = ctx.createLinearGradient(0, 0, 0, out.height);
  bg.addColorStop(0, "#14070b");
  bg.addColorStop(0.48, "#060306");
  bg.addColorStop(1, "#020103");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, out.width, out.height);
  ctx.fillStyle = "#ffb1a8";
  ctx.font = "28px Arial";
  ctx.fillText("PARALLAX LAB · CODEVEIL369 v0.6", 80, 90);
  ctx.fillStyle = "#f7edf2";
  ctx.font = "bold 92px Arial";
  ctx.fillText("CodeVeil369", 80, 190);
  ctx.fillStyle = "#dec3cb";
  ctx.font = "34px Arial";
  ctx.fillText("Structured-light perception simulator + symbolic substrate-code renderer", 80, 245);
  ctx.fillStyle = "#ffb1a8";
  ctx.font = "26px Arial";
  ctx.fillText(`Snapshot: ${hash}`, 80, 290);
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 2;
  ctx.strokeRect(70, 320, 1460, 590);
  ctx.drawImage(args.field, 90, 340, 1420, 550);
  ctx.strokeRect(70, 960, 1460, 720);
  ctx.drawImage(args.chamber, 90, 1010, 1420, 600);
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fillRect(70, 1720, 1460, 400);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 30px Arial";
  ctx.fillText("Ledger Receipt", 90, 1770);
  ctx.font = "26px Arial";
  [
    `Snapshot: ${hash}`,
    `Tier: ${args.receiptLabel}`,
    `Summary: ${args.receiptSummary}`,
    `Boundary: ${args.receiptBoundary}`,
    `Preset: ${presetName} · Mode: ${args.params.mode} · Seed: ${args.params.seed} · Material: ${args.params.material}`,
    "This is a symbolic perception simulation, not proof of external code."
  ].forEach((line, index) => ctx.fillText(line, 90, 1825 + index * 45));
  const link = document.createElement("a");
  link.href = out.toDataURL("image/png");
  link.download = `codeveil369-${hash}-${args.activePresetId}.png`;
  link.click();
  return true;
}
