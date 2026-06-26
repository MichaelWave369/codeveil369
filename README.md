# CodeVeil369

A claim-safe structured-light perception simulator plus symbolic substrate-code renderer.

Current sprint: **MVP v0.8 — A/B Export Polish**.

Live demo target:

```text
https://michaelwave369.github.io/codeveil369/
```

This browser app renders:

- simulated diffraction / speckle fields
- entoptic-style filtering
- a toy-model altered-perception layer
- emergent glyph/code attractors
- a symbolic substrate-code mode
- a Material Code Chamber with wall, water, quartz, bamboo, magnet, and observer lenses
- a WebGL field renderer with canvas fallback
- instrument presets, simulation meters, and runtime status
- poster export and share-text generation
- A/B comparison poster export
- save/load preset JSON ledgers
- deterministic snapshot hashes
- same-seed field/chamber A/B comparison panels
- a local browser preset gallery
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

## v0.8 Additions

1. Added `src/utils/exportComparisonPoster.ts`.
2. Added Export A/B button to the main toolbar.
3. Added Export A/B button inside the comparison panel.
4. A/B exports include current hash, comparison hash, view mode, seed, material, and Ledger tier.
5. Comparison panels now keep canvas refs for poster capture.
6. Updated runtime labels and package version.

## Architecture

```text
C = G(N(E(L)))

L = structured field
E = eye / entoptic transform
N = perceptual-state toy model
G = glyph / code attractor
C = perceived code-field render
```

## Next Sprint Ideas

1. Add stronger local preset gallery management.
2. Add field renderer selector in the UI.
3. Add gallery import/export bundle.
4. Add a walking 3D chamber with Three.js.
