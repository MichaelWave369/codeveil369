import type { ReceiptTier } from "../types";

export const receipts: Record<ReceiptTier, { label: string; summary: string; boundary: string }> = {
  symbolic: {
    label: "Symbolic / Artistic",
    summary: "Visual philosophy, cybernetic art, and symbolic rendering.",
    boundary: "No external-reality claim. Visuals are expressive, not evidentiary."
  },
  perceptual: {
    label: "Perceptual Toy Model",
    summary: "Structured light, entoptic transforms, and altered perception as a software toy model.",
    boundary: "Not a real brain or clinical model. Useful for intuition and comparison only."
  },
  hypothesis: {
    label: "Hypothesis Framing",
    summary: "A space for future experiment and report-ledger comparisons.",
    boundary: "A question generator, not a proof engine. Claims still require receipts."
  }
};
