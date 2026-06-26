import type { Material, Params } from "../types";
import { glyphs } from "../data/presets";
import { noise, rgb } from "./visualMath";

export function drawChamber(canvas: HTMLCanvasElement, p: Params, t: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const w = 720;
  const h = 420;
  const c = rgb(p.wavelength);
  const sweep = Math.sin(t * (0.35 + p.sweep * 1.8)) * (16 + p.sweep * 80);
  canvas.width = w;
  canvas.height = h;

  const bg = ctx.createRadialGradient(w * 0.55, h * 0.2, 30, w * 0.45, h * 0.45, w * 0.85);
  bg.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${0.08 + p.reveal * 0.16})`);
  bg.addColorStop(0.46, "#10080e");
  bg.addColorStop(1, "#020103");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "rgba(255,255,255,0.09)";
  ctx.fillStyle = "rgba(255,255,255,0.035)";
  ctx.beginPath();
  ctx.moveTo(100, 52);
  ctx.lineTo(620, 52);
  ctx.lineTo(670, 328);
  ctx.lineTo(50, 328);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},0.88)`;
  ctx.lineWidth = 3;
  ctx.shadowBlur = 18;
  ctx.shadowColor = `rgba(${c[0]},${c[1]},${c[2]},0.9)`;
  ctx.beginPath();
  ctx.moveTo(62, 210 + sweep * 0.12);
  ctx.lineTo(625, 185 + sweep * 0.2);
  ctx.stroke();
  ctx.shadowBlur = 0;

  const alpha = (m: Material) => (p.material === "all" || p.material === m ? 1 : 0.18);
  const drawBox = (m: Material, x: number, y: number, ww: number, hh: number, label: string) => {
    ctx.save();
    ctx.globalAlpha = alpha(m);
    ctx.fillStyle = "rgba(255,255,255,0.055)";
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.fillRect(x, y, ww, hh);
    ctx.strokeRect(x, y, ww, hh);
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "12px ui-monospace, Menlo, Consolas, monospace";
    ctx.fillText(label, x + 10, y + 20);
    ctx.restore();

    for (let i = 0; i < 24 * p.reveal; i++) {
      ctx.fillStyle = `rgba(255,255,255,${alpha(m) * p.reveal * (0.06 + 0.22 * noise(i, 3, p.seed))})`;
      ctx.font = `${12 + noise(i, 4, p.seed) * 15}px ui-monospace`;
      ctx.fillText(glyphs[(i + m.length) % glyphs.length], x + 18 + noise(i, 5, p.seed) * Math.max(1, ww - 36), y + 32 + noise(i, 6, p.seed) * Math.max(1, hh - 44));
    }
  };

  drawBox("wall", 430, 78, 170, 150, "wall");
  drawBox("water", 195, 272, 130, 42, "water");
  drawBox("quartz", 392, 202, 70, 74, "quartz");
  drawBox("bamboo", 126, 172, 42, 154, "bamboo");
  drawBox("magnet", 490, 252, 112, 94, "magnet");
  drawBox("observer", 40, 220, 72, 120, "observer");

  ctx.fillStyle = "rgba(0,0,0,0.42)";
  ctx.fillRect(22, 22, 312, 34);
  ctx.fillStyle = "rgba(255,255,255,0.74)";
  ctx.font = "13px ui-monospace, Menlo, Consolas, monospace";
  ctx.fillText(`Material Code Chamber · focus=${p.material}`, 34, 44);
}
