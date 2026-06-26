# CodeVeil369

A claim-safe structured-light perception simulator plus symbolic substrate-code renderer.

Current sprint: **MVP v0.3 — Instrument Polish + Export Mode**.

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

If the first deployment does not appear automatically, open the repo settings and set Pages source to **GitHub Actions**.

## v0.3 Additions

1. Instrument preset selector and preset notes.
2. Poster export button.
3. Share-text copy button.
4. Fullscreen mode.
5. Ledger Receipt selector.
6. Runtime status card.
7. Mobile polish for the instrument toolbar.

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

1. Split kernels and components into modular files.
2. Add save/load JSON presets.
3. Add same-seed A/B comparison mode.
4. Add smoother WebGL/GLSL field rendering.
5. Add a walking 3D chamber with Three.js.
