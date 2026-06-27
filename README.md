# CodeVeil369

A claim-safe structured-light perception simulator plus symbolic substrate-code renderer.

Current release: **v1.0.0 — Public Demo Polish**.

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
- a gallery overlay for relabeling, removing, exporting, and importing gallery bundles
- public demo metadata and accessibility notes
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

## v1.0 Additions

1. Added public demo metadata in `index.html`.
2. Added a noscript fallback message.
3. Added `docs/public-demo-audit.md`.
4. Added `docs/accessibility.md`.
5. Confirmed public boundary language for demo release.
6. Updated package version to v1.0.0.

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

1. Integrate gallery management directly into the React panel.
2. Add field renderer selector in the UI.
3. Add a walking 3D chamber with Three.js.
4. Prepare v1.1 research metadata lane.
