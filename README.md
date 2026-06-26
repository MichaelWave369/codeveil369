# CodeVeil369

A claim-safe structured-light perception simulator plus symbolic substrate-code renderer.

Current sprint: **MVP v0.4 — Modular Kernel Split**.

Live demo target:

```text
https://michaelwave369.github.io/codeveil369/
```

This browser app renders:

- simulated laser diffraction / speckle fields
- entoptic-style filtering
- a toy-model altered-perception layer
- emergent glyph/code attractors
- a symbolic substrate-code mode
- a Material Code Chamber with wall, water, quartz, bamboo, magnet, and observer lenses
- instrument presets, simulation meters, and runtime status
- poster export and share-text generation
- a built-in Ledger boundary panel

## Ledger Boundary

This is not evidence that reality contains visible source code. It is a software simulation for exploring how structured light, visual-system transforms, altered perceptual weighting, and symbolic pattern recognition might produce code-like experiences.

The Material Code Chamber renders matter *as if* its state can be read as symbolic code. That is an artistic/research visualization layer, not a physical proof claim.

This is also not a real-world protocol. Do not aim lasers at eyes. Follow all local laws and safety standards.

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

This repo includes a GitHub Pages workflow at:

```text
.github/workflows/deploy-pages.yml
```

The Vite base path is configured for the project page route:

```text
/codeveil369/
```

## v0.4 Additions

1. Split shared types into `src/types.ts`.
2. Split presets and glyph families into `src/data/presets.ts`.
3. Split Ledger receipt tiers into `src/data/receipts.ts`.
4. Split field math helpers into `src/kernels/visualMath.ts`.
5. Split the visual field renderer into `src/kernels/fieldKernel.ts`.
6. Split the chamber renderer into `src/kernels/chamberKernel.ts`.
7. Split poster export into `src/utils/exportPoster.ts`.
8. Updated runtime labels to v0.4.

## Architecture

```text
C = G(N(E(L)))

L = structured field
E = eye / entoptic transform
N = perceptual-state toy model
G = glyph / code attractor
C = perceived code-field render
```

Material chamber layer:

```text
WorldCode(x,t) = SymbolMap(
  MatterState(x,t),
  RelationGraph(x,t),
  WavePhase(x,t),
  MemoryTrace(x,t)
)
```

## Next Sprint Ideas

1. Add save/load JSON presets.
2. Add same-seed A/B comparison mode.
3. Move UI components into dedicated files once connector filters permit it.
4. Add smoother WebGL/GLSL field rendering.
5. Add a walking 3D chamber with Three.js.
