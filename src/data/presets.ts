import type { Material, Mode, Params, Preset } from "../types";

export const modes: Mode[] = ["sober", "entoptic", "altered", "glyph", "substrate"];
export const materials: Material[] = ["all", "wall", "water", "quartz", "bamboo", "magnet", "observer"];

export const glyphs = ["ア", "ミ", "サ", "◇", "△", "∴", "λ", "φ", "Ω", "369", "⟡", "∿", "ψ", "⌬"];

export const modePatch: Record<Mode, Partial<Params>> = {
  sober: { mode: "sober", entoptic: 0.05, perception: 0.08, meaning: 0.05, glyphs: 0.02, time: 0.1, reveal: 0.08 },
  entoptic: { mode: "entoptic", entoptic: 0.55, perception: 0.18, meaning: 0.18, glyphs: 0.12, time: 0.22, reveal: 0.18 },
  altered: { mode: "altered", entoptic: 0.66, perception: 0.72, meaning: 0.42, glyphs: 0.28, time: 0.52, reveal: 0.34 },
  glyph: { mode: "glyph", entoptic: 0.74, perception: 0.86, meaning: 0.74, glyphs: 0.78, time: 0.7, reveal: 0.62 },
  substrate: { mode: "substrate", entoptic: 0.62, perception: 0.78, meaning: 0.92, glyphs: 0.96, time: 0.84, reveal: 0.93 }
};

export const instrumentPresets: Preset[] = [
  { id: "sober-optics", name: "Sober Optics", note: "Structured field with minimal symbolic loading.", patch: { mode: "sober", material: "wall", wavelength: 650, diffraction: 0.7, speckle: 0.28, entoptic: 0.05, perception: 0.08, meaning: 0.05, glyphs: 0.02, time: 0.08, reveal: 0.1, sweep: 0.28 } },
  { id: "entoptic-bloom", name: "Entoptic Bloom", note: "Eye/entoptic transforms come forward while glyphs stay quiet.", patch: { mode: "entoptic", material: "observer", wavelength: 610, diffraction: 0.76, speckle: 0.34, entoptic: 0.64, perception: 0.22, meaning: 0.16, glyphs: 0.12, time: 0.2, reveal: 0.24, sweep: 0.36 } },
  { id: "altered-glyph-field", name: "Altered Glyph Field", note: "Perceptual intensity rises and code-like symbols begin to bind.", patch: { mode: "altered", material: "all", wavelength: 650, diffraction: 0.82, speckle: 0.42, entoptic: 0.62, perception: 0.74, meaning: 0.52, glyphs: 0.46, time: 0.58, reveal: 0.42, sweep: 0.58 } },
  { id: "substrate-chamber", name: "Substrate Chamber", note: "The full chamber with symbolic matter-as-code rendering.", patch: { mode: "substrate", material: "all", wavelength: 650, diffraction: 0.82, speckle: 0.42, entoptic: 0.62, perception: 0.78, meaning: 0.92, glyphs: 0.96, time: 0.84, reveal: 0.93, sweep: 0.72 } },
  { id: "report-seed", name: "Report Seed", note: "A neutralized report-style seed for hypothesis framing and comparisons.", patch: { mode: "glyph", material: "wall", wavelength: 650, diffraction: 0.78, speckle: 0.39, entoptic: 0.56, perception: 0.66, meaning: 0.74, glyphs: 0.72, time: 0.61, reveal: 0.58, sweep: 0.47 } }
];

export const initialParams: Params = {
  mode: "substrate",
  wavelength: 650,
  diffraction: 0.82,
  speckle: 0.42,
  entoptic: 0.62,
  perception: 0.78,
  meaning: 0.92,
  glyphs: 0.96,
  time: 0.84,
  reveal: 0.93,
  sweep: 0.72,
  seed: 369,
  material: "all"
};
