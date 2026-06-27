import type { PresetLedgerEntry } from "./presetLedger";

export type GalleryEntry = PresetLedgerEntry & { label?: string };

export type GalleryBundle = {
  schema: "codeveil369.gallery.v1";
  appVersion: "0.9.0";
  exportedAt: string;
  count: number;
  items: GalleryEntry[];
};

export function makeGalleryBundle(items: GalleryEntry[]): GalleryBundle {
  return {
    schema: "codeveil369.gallery.v1",
    appVersion: "0.9.0",
    exportedAt: new Date().toISOString(),
    count: items.length,
    items
  };
}

export function downloadGalleryBundle(items: GalleryEntry[]) {
  const bundle = makeGalleryBundle(items);
  const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `codeveil369-gallery-${bundle.count}-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

export function readGalleryBundleFile(file: File): Promise<GalleryBundle> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (parsed?.schema !== "codeveil369.gallery.v1" || !Array.isArray(parsed?.items)) throw new Error("CodeVeil369 gallery check failed.");
        resolve(parsed as GalleryBundle);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}
