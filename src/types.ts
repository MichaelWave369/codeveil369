export type Mode = "sober" | "entoptic" | "altered" | "glyph" | "substrate";
export type Material = "all" | "wall" | "water" | "quartz" | "bamboo" | "magnet" | "observer";
export type ReceiptTier = "symbolic" | "perceptual" | "hypothesis";

export type Params = {
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

export type Preset = {
  id: string;
  name: string;
  note: string;
  patch: Partial<Params>;
};
