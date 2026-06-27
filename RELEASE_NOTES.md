# CodeVeil369 Release Notes

## v0.9.0 — Gallery Management

This sprint adds local gallery bundle management while preserving snapshot hash receipts.

### Added

- `public/galleryEnhancer.js` as a lightweight gallery management overlay.
- `src/utils/galleryBundle.ts` for gallery bundle import/export support.
- Gallery overlay is mounted from `index.html` using the Vite base path.
- Overlay can refresh, relabel, remove, export, and import local gallery snapshots.
- Package version updated to v0.9.0.

### Boundary

Gallery bundles are local software receipts for saved simulator states. They are not evidence of external hidden code or an external-reality claim.

## v0.8.0 — A/B Export Polish

Added comparison poster export for current vs comparison snapshots.

## v0.7.0 — Shader Field Upgrade

Added accelerated field rendering with a canvas fallback path.

## v0.6.0 — Snapshot Hash + Compare Polish

Added deterministic snapshot hashes, current/compare hash labels, field/chamber compare toggles, and a local preset gallery.

## v0.5.0 — Preset Ledger + A/B Compare

Added save/load JSON preset ledgers, same-seed comparison panels, and snapshot JSON inspection.

## v0.4.0 — Modular Kernel Split

Split shared types, presets, receipts, visual math, field rendering, chamber rendering, and poster export into separate modules.

## v0.3.0 — Instrument Polish + Export Mode

Added instrument presets, poster export, share text, fullscreen, Ledger receipt selector, runtime status, and mobile polish.

## v0.2.0 — Material Code Chamber

Added a symbolic chamber scene that renders multiple materials as different code languages while preserving the Ledger boundary.
