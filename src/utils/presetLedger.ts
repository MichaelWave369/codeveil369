import type { Params, ReceiptTier } from "../types";
import { snapshotHash } from "./snapshotHash";

export type PresetLedgerEntry = {
  schema: "codeveil369.preset.v1";
  appVersion: "0.6.0";
  createdAt: string;
  presetId: string;
  receiptTier: ReceiptTier;
  ledgerBoundary: string;
  snapshotHash: string;
  params: Params;
};

export function makePresetLedgerEntry(args: { params: Params; presetId: string; receiptTier: ReceiptTier; ledgerBoundary: string }): PresetLedgerEntry {
  return {
    schema: "codeveil369.preset.v1",
    appVersion: "0.6.0",
    createdAt: new Date().toISOString(),
    presetId: args.presetId,
    receiptTier: args.receiptTier,
    ledgerBoundary: args.ledgerBoundary,
    snapshotHash: snapshotHash(args.params),
    params: args.params
  };
}

export function downloadPresetLedger(entry: PresetLedgerEntry) {
  const blob = new Blob([JSON.stringify(entry, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `codeveil369-preset-${entry.snapshotHash}-${entry.presetId}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function readPresetLedgerFile(file: File): Promise<PresetLedgerEntry> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (parsed?.schema !== "codeveil369.preset.v1" || !parsed?.params) throw new Error("CodeVeil369 preset check failed.");
        resolve(parsed as PresetLedgerEntry);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}
