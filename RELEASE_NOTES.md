# CodeVeil369 Release Notes

## v0.5.0 — Preset Ledger + A/B Compare

This sprint adds receipt-style preset persistence and same-seed comparison tools.

### Added

- Save current settings as CodeVeil369 preset ledger JSON.
- Load preset ledger JSON back into the instrument.
- Copy the current preset ledger JSON to clipboard.
- Same-seed A/B comparison panel.
- A/B buttons for sober, glyph, and substrate comparison states.
- Snapshot JSON card for receipt inspection.
- `src/utils/presetLedger.ts` for preset ledger creation, download, and file reading.

### Boundary

Preset ledgers preserve simulation settings and claim boundaries. They are reproducible software receipts, not proof of external hidden code.

## v0.4.0 — Modular Kernel Split

Split shared types, presets, receipts, visual math, field rendering, chamber rendering, and poster export into separate modules.

## v0.3.0 — Instrument Polish + Export Mode

Added instrument presets, poster export, share text, fullscreen, Ledger receipt selector, runtime status, and mobile polish.

## v0.2.0 — Material Code Chamber

Added a symbolic chamber scene that renders multiple materials as different code languages while preserving the Ledger boundary.
