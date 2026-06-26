# CodeVeil369 Release Notes

## v0.6.0 — Snapshot Hash + Compare Polish

This sprint adds deterministic snapshot hashes and clearer comparison tools.

### Added

- Deterministic snapshot hashes for parameter bundles.
- Snapshot hash utility at `src/utils/snapshotHash.ts`.
- Snapshot hashes included in preset ledger JSON.
- Current vs comparison hash display.
- Field/chamber compare toggle.
- Local browser preset gallery.
- Load saved gallery snapshots back into the instrument.
- v0.6 runtime labels and package version.

### Boundary

Snapshot hashes identify software parameter bundles only. They are reproducibility receipts for the simulator, not proof of external hidden code.

## v0.5.0 — Preset Ledger + A/B Compare

Added save/load JSON preset ledgers, same-seed comparison panels, and snapshot JSON inspection.

## v0.4.0 — Modular Kernel Split

Split shared types, presets, receipts, visual math, field rendering, chamber rendering, and poster export into separate modules.

## v0.3.0 — Instrument Polish + Export Mode

Added instrument presets, poster export, share text, fullscreen, Ledger receipt selector, runtime status, and mobile polish.

## v0.2.0 — Material Code Chamber

Added a symbolic chamber scene that renders multiple materials as different code languages while preserving the Ledger boundary.
