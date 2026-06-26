import type { Params } from "../types";
import { drawField } from "./fieldKernel";

const vertexSource = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentSource = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_wavelength;
uniform float u_diffraction;
uniform float u_speckle;
uniform float u_entoptic;
uniform float u_perception;
uniform float u_meaning;
uniform float u_glyphs;
uniform float u_elastic;
uniform float u_seed;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7)) + u_seed * 74.7) * 43758.5453);
}

vec3 waveColor(float wavelength) {
  if (wavelength < 455.0) return vec3(0.45, 0.30, 1.0);
  if (wavelength < 565.0) return vec3(0.20, 1.0, 0.50);
  if (wavelength < 610.0) return vec3(1.0, 0.74, 0.24);
  return vec3(1.0, 0.14, 0.10);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0) * 2.0;
  float r = length(p);
  float a = atan(p.y, p.x);
  float t = u_time * (0.18 + u_elastic * 0.55);
  float beat = 8.0 + u_diffraction * 34.0;
  float grating = sin((p.x * beat + sin(a * 3.0 + t) * 0.45) * 3.14159);
  float radial = sin(r * (38.0 + u_diffraction * 72.0) - t * 5.0 + a * (2.0 + u_meaning * 7.0));
  float lattice = sin((p.x + p.y) * beat * 1.2 + t) * sin((p.x - p.y) * beat * 1.15 - t);
  float speck = (hash(floor(gl_FragCoord.xy / 2.0)) - 0.5) * u_speckle * 1.8;
  float entoptic = cos(a * 2.0 + t) * exp(-r * 2.5) * u_entoptic;
  float neural = sin(a * (6.0 + u_perception * 12.0) + r * (18.0 + u_perception * 46.0) - t * 5.5);
  float field = 0.34 + 0.24 * grating + 0.25 * radial + 0.18 * lattice + speck + entoptic * 0.32 + neural * u_perception * 0.20;
  float vignette = 0.54 + 0.46 * max(0.0, 1.0 - r * 0.88);
  float intensity = pow(clamp(field * vignette, 0.0, 1.0), 1.25 - u_perception * 0.52);
  float glyphVeil = step(0.94 - u_glyphs * 0.28, fract(sin((p.x + p.y + a) * 28.0 + t * 2.0) * 12.731));
  intensity += glyphVeil * u_glyphs * 0.22 * (1.0 - smoothstep(0.2, 1.25, r));
  vec3 base = waveColor(u_wavelength);
  vec3 color = base * (0.12 + intensity * 1.22) + vec3(intensity * 0.18, intensity * 0.06, intensity * u_perception * 0.18);
  gl_FragColor = vec4(color, 1.0);
}
`;

type ShaderState = {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  buffer: WebGLBuffer;
  locations: Record<string, WebGLUniformLocation | null>;
};

const states = new WeakMap<HTMLCanvasElement, ShaderState>();

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return null;
  return shader;
}

function createState(canvas: HTMLCanvasElement): ShaderState | null {
  const gl = canvas.getContext("webgl", { antialias: false, preserveDrawingBuffer: true });
  if (!gl) return null;
  const vertex = compile(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertex || !fragment) return null;
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  if (!program || !buffer) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const names = ["u_resolution", "u_time", "u_wavelength", "u_diffraction", "u_speckle", "u_entoptic", "u_perception", "u_meaning", "u_glyphs", "u_elastic", "u_seed"];
  const locations = Object.fromEntries(names.map((name) => [name, gl.getUniformLocation(program, name)]));
  const state = { gl, program, buffer, locations };
  states.set(canvas, state);
  return state;
}

export function drawShaderField(canvas: HTMLCanvasElement, params: Params, time: number) {
  const width = 720;
  const height = 480;
  canvas.width = width;
  canvas.height = height;
  const state = states.get(canvas) ?? createState(canvas);
  if (!state) {
    drawField(canvas, params, time);
    return;
  }
  const { gl, program, buffer, locations } = state;
  gl.viewport(0, 0, width, height);
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  const position = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  gl.uniform2f(locations.u_resolution, width, height);
  gl.uniform1f(locations.u_time, time);
  gl.uniform1f(locations.u_wavelength, params.wavelength);
  gl.uniform1f(locations.u_diffraction, params.diffraction);
  gl.uniform1f(locations.u_speckle, params.speckle);
  gl.uniform1f(locations.u_entoptic, params.entoptic);
  gl.uniform1f(locations.u_perception, params.perception);
  gl.uniform1f(locations.u_meaning, params.meaning);
  gl.uniform1f(locations.u_glyphs, params.glyphs);
  gl.uniform1f(locations.u_elastic, params.time);
  gl.uniform1f(locations.u_seed, params.seed);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}
