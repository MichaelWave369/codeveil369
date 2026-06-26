import type { Params } from "../types";
import { glyphs } from "../data/presets";
import { clamp, noise, rgb } from "./visualMath";

export function drawCanvasField(canvas: HTMLCanvasElement, p: Params, t: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const w = 420;
  const h = 280;
  const c = rgb(p.wavelength);
  const beat = 8 + p.diffraction * 28;
  const drift = t * (0.18 + p.time * 0.52);
  canvas.width = w;
  canvas.height = h;

  const img = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    const ny = (y / h - 0.5) * 2;
    for (let x = 0; x < w; x++) {
      const nx = (x / w - 0.5) * 2;
      const r = Math.sqrt(nx * nx + ny * ny);
      const th = Math.atan2(ny, nx);
      const grating = Math.sin((nx * beat + Math.sin(th * 3 + drift) * 0.42) * Math.PI);
      const radial = Math.sin(r * (35 + p.diffraction * 58) - drift * 4.2 + th * (2 + p.meaning * 6));
      const lattice = Math.sin((nx + ny) * beat * 1.22 + drift) * Math.sin((nx - ny) * beat * 1.1 - drift);
      const speck = (noise(Math.floor(x / 2), Math.floor(y / 2), p.seed) - 0.5) * p.speckle * 1.8;
      const macula = Math.cos(th * 2 + drift) * Math.exp(-r * 2.4);
      const neural = Math.sin(th * (6 + p.perception * 12) + r * (18 + p.perception * 42) - drift * 5);
      let field = 0.34 + 0.24 * grating + 0.24 * radial + 0.18 * lattice + speck;
      field = field * (0.55 + 0.45 * Math.max(0, 1 - r * 0.85)) + p.entoptic * macula * 0.28 + p.perception * 0.18 * neural;
      const intensity = clamp(Math.pow(clamp(field), 1.3 - p.perception * 0.55));
      const i = (y * w + x) * 4;
      const glow = 0.16 + intensity * 1.35;
      img.data[i] = Math.min(255, c[0] * glow + intensity * 40);
      img.data[i + 1] = Math.min(255, c[1] * glow + intensity * 18);
      img.data[i + 2] = Math.min(255, c[2] * glow + intensity * 36 * p.perception);
      img.data[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
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

  ctx.fillStyle = "rgba(0,0,0,0.36)";
  ctx.fillRect(14, h - 56, w - 28, 42);
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "12px ui-monospace, Menlo, Consolas, monospace";
  ctx.fillText("LEDGER: toy-model simulation · no external-reality proof", 24, h - 33);
  ctx.fillText(`MODE: ${p.mode} · λ ${p.wavelength}nm · C = G(N(E(L)))`, 24, h - 17);
}
