export type VeilbreakProtocol = {
  id: number;
  title: string;
  laser_wavelength?: number;
  tags?: string[];
};

export type VeilbreakExperiment = {
  id: number;
  title: string;
  observed?: boolean;
  laser_wavelength?: number;
  symbols_description?: string;
};

/**
 * Future adapter boundary.
 *
 * CodeVeil369 should only ingest public/read-only metadata for analysis and
 * visualization. It should not reproduce real-world operational instructions.
 */
export function summarizeProtocolForSimulation(protocol: VeilbreakProtocol) {
  return {
    title: protocol.title,
    wavelengthNm: protocol.laser_wavelength ?? 650,
    tags: protocol.tags ?? [],
    ledgerUse: "metadata-only simulation seed",
  };
}
