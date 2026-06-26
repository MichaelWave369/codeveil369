export const clamp = (n: number) => Math.max(0, Math.min(1, n));

export function noise(x: number, y: number, seed: number) {
  const v = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
  return v - Math.floor(v);
}

export function rgb(wavelength: number) {
  if (wavelength < 455) return [116, 78, 255];
  if (wavelength < 565) return [50, 255, 126];
  if (wavelength < 610) return [255, 190, 62];
  return [255, 35, 25];
}
