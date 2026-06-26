import type { Params } from "../types";
import { drawWebglField } from "./webglFieldKernel";
export { drawCanvasField } from "./canvasFieldKernel";

export function drawField(canvas: HTMLCanvasElement, params: Params, time: number) {
  drawWebglField(canvas, params, time);
}
