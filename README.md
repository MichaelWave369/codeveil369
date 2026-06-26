# CodeVeil369

A claim-safe structured-light perception simulator plus symbolic substrate-code renderer.

Current sprint: **MVP v0.6 — Snapshot Hash + Compare Polish**.

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

## v0.6 Additions

1. Deterministic snapshot hashes for parameter bundles.
2. Snapshot hashes included in preset ledger JSON.
3. Current vs comparison hash display.
4. Field/chamber compare toggles.
5. Local browser preset gallery.
6. Load saved gallery snapshots back into the instrument.
7. New `src/utils/snapshotHash.ts` utility.

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
2. Add WebGL/GLSL field rendering.
3. Add field/chamber A/B export poster.
4. Add a walking 3D chamber with Three.js.
