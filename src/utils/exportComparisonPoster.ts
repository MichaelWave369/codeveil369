import type { Params, ReceiptTier } from "../types";
import { snapshotHash } from "./snapshotHash";

export function exportComparisonPoster(args: {
  currentCanvas: HTMLCanvasElement;
  comparisonCanvas: HTMLCanvasElement;
  currentParams: Params;
  comparisonParams: Params;
  viewMode: "field" | "chamber";
  receiptTier: ReceiptTier;
  receiptLabel: string;
  receiptBoundary: string;
}) {
  const out = document.createElement("canvas");
  const ctx = out.getContext("2d");
  if (!ctx) return false;

  out.width = 1800;
  out.height = 1600;
  const currentHash = snapshotHash(args.currentParams);
  const comparisonHash = snapshotHash(args.comparisonParams);
  const match = currentHash === comparisonHash ? "same parameter bundle" : "different parameter bundles";
  const bg = ctx.createLinearGradient(0, 0, 0, out.height);
  bg.addColorStop(0, "#16070c");
  bg.addColorStop(0.55, "#060306");
  bg.addColorStop(1, "#020103");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, out.width, out.height);

  ctx.fillStyle = "#ffb1a8";
  ctx.font = "28px Arial";
  ctx.fillText("PARALLAX LAB · CODEVEIL369 v0.8", 80, 90);
  ctx.fillStyle = "#f7edf2";
  ctx.font = "bold 78px Arial";
  ctx.fillText("A/B Comparison Receipt", 80, 180);
  ctx.fillStyle = "#dec3cb";
  ctx.font = "30px Arial";
  ctx.fillText(`View: ${args.viewMode} · Receipt: ${args.receiptLabel} · ${match}`, 80, 235);

  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 2;
  ctx.strokeRect(70, 300, 790, 560);
  ctx.strokeRect(940, 300, 790, 560);
  ctx.drawImage(args.currentCanvas, 90, 320, 750, 500);
  ctx.drawImage(args.comparisonCanvas, 960, 320, 750, 500);

  ctx.fillStyle = "#ffb1a8";
  ctx.font = "bold 28px Arial";
  ctx.fillText("CURRENT", 90, 900);
  ctx.fillText("COMPARISON", 960, 900);
  ctx.fillStyle = "#f7edf2";
  ctx.font = "24px Arial";
  ctx.fillText(currentHash, 90, 940);
  ctx.fillText(comparisonHash, 960, 940);
  ctx.fillText(`mode ${args.currentParams.mode} · seed ${args.currentParams.seed} · material ${args.currentParams.material}`, 90, 980);
  ctx.fillText(`mode ${args.comparisonParams.mode} · seed ${args.comparisonParams.seed} · material ${args.comparisonParams.material}`, 960, 980);

  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fillRect(70, 1060, 1660, 390);
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 30px Arial";
  ctx.fillText("Ledger Boundary", 100, 1120);
  ctx.font = "25px Arial";
  const lines = [
    `Current: ${currentHash}`,
    `Comparison: ${comparisonHash}`,
    `View mode: ${args.viewMode}`,
    `Receipt tier: ${args.receiptLabel}`,
    `Boundary: ${args.receiptBoundary}`,
    "This is a symbolic perception simulation, not proof of external code."
  ];
  lines.forEach((line, index) => ctx.fillText(line, 100, 1175 + index * 44));

  const link = document.createElement("a");
  link.href = out.toDataURL("image/png");
  link.download = `codeveil369-ab-${args.viewMode}-${currentHash}-${comparisonHash}.png`;
  link.click();
  return true;
}
