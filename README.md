# CodeVeil369

A claim-safe DMT-laser perception simulator plus symbolic substrate-code renderer.

Current sprint: **MVP v0.2 — Material Code Chamber**.

This browser app renders:

- simulated laser diffraction / speckle fields
- entoptic-style filtering
- a toy-model altered-perception layer
- emergent glyph/code attractors
- a symbolic substrate-code mode
- a Material Code Chamber with wall, water, quartz, bamboo, magnet, and observer lenses
- material focus controls and simulation meters
- a built-in Ledger boundary panel

## Ledger Boundary

This is not evidence that reality contains visible source code. It is a software simulation for exploring how structured light, visual-system transforms, altered perceptual weighting, and symbolic pattern recognition might produce code-like experiences.

The Material Code Chamber renders matter *as if* its state can be read as symbolic code. That is an artistic/research visualization layer, not a physical proof claim.

This is also not a drug guide or laser-use protocol. Do not aim lasers at eyes. Follow all local laws and safety standards.

## Run

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in your terminal.

## Build

```bash
npm run build
npm run preview
```

## Architecture

```text
C = G(N(E(L)))

L = laser / diffraction field
E = eye / entoptic transform
N = neural / perceptual-state toy model
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

## v0.2 Additions

1. Material Code Chamber canvas.
2. Water, quartz, bamboo, magnet, wall, and observer symbolic behaviors.
3. Material focus buttons.
4. Chamber reveal and laser sweep controls.
5. Simulation meters for optical carrier, perceptual gain, glyph coherence, and substrate reveal.
6. Test Harness card for no-laser, expectation, and receipt-rule comparison thinking.

## Next Sprint Ideas

1. Add WebGL/GLSL shaders for faster visual fields.
2. Add screenshot/export-to-poster mode.
3. Add real test harness snapshots: A/B render comparisons using the same seed.
4. Add a Veilbreak metadata adapter for metadata-only analytics.
5. Add project save/load JSON presets.
6. Add a walking 3D chamber with Three.js.
