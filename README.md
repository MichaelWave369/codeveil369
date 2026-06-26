# CodeVeil369

A claim-safe structured-light perception simulator plus symbolic substrate-code renderer.

Current sprint: **MVP v0.5 — Preset Ledger + A/B Compare**.

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
- save/load preset JSON ledgers
- same-seed A/B comparison panels
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

## v0.5 Additions

1. Save current settings as a JSON preset ledger.
2. Load CodeVeil369 preset ledger JSON files.
3. Copy preset ledger JSON to clipboard.
4. Same-seed A/B comparison panel.
5. A/B buttons for sober, glyph, and substrate comparison states.
6. Snapshot JSON card for receipt inspection.
7. New `src/utils/presetLedger.ts` utility.

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

1. Add stronger A/B layout controls for field vs chamber.
2. Add reproducible snapshot hashes.
3. Add gallery of saved presets.
4. Add smoother WebGL/GLSL field rendering.
5. Add a walking 3D chamber with Three.js.
