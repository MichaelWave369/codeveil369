# CodeVeil369 Release Notes

## v0.4.0 — Modular Kernel Split

This sprint restructures CodeVeil369 so the visual instrument is easier to extend toward save/load presets, A/B comparisons, shader rendering, and a future 3D chamber.

### Added

- `src/types.ts` for shared Mode, Material, ReceiptTier, Params, and Preset types.
- `src/data/presets.ts` for modes, materials, glyphs, default params, and instrument presets.
- `src/data/receipts.ts` for Ledger receipt tiers.
- `src/kernels/visualMath.ts` for clamp, noise, and wavelength color helpers.
- `src/kernels/fieldKernel.ts` for visual field rendering.
- `src/kernels/chamberKernel.ts` for Material Code Chamber rendering.
- `src/utils/exportPoster.ts` for poster PNG export.
- v0.4 runtime labels and package version.

### Boundary

This remains a toy-model simulator and symbolic renderer. It does not prove external hidden code or provide real-world operational instructions.

## v0.3.0 — Instrument Polish + Export Mode

Added instrument presets, poster export, share text, fullscreen, Ledger receipt selector, runtime status, and mobile polish.

## v0.2.0 — Material Code Chamber

Added a symbolic chamber scene that renders multiple materials as different code languages while preserving the Ledger boundary.
