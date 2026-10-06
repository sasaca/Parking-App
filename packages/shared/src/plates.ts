/**
 * Placas vehiculares de Guatemala.
 * Formato moderno: prefijo de 1–3 letras (P particular, M moto, C comercial, A alquiler, O oficial,
 * U, TC transporte colectivo, CD cuerpo diplomático, CC cuerpo consular, MI misión internacional, etc.),
 * 3 dígitos y 3 letras, p. ej. "P 123ABC". Se normaliza a "P123ABC".
 * Se aceptan además placas extranjeras/antiguas como alfanuméricas de 5–10 caracteres (isGuatemalan=false).
 */

const GT_PREFIXES = ['P', 'M', 'C', 'A', 'O', 'U', 'TC', 'CD', 'CC', 'MI', 'E', 'TRC', 'DIS', 'AL', 'TRP'] as const;
const GT_PLATE_RE = new RegExp(`^(${GT_PREFIXES.join('|')})(\\d{3})([A-Z]{3})$`);
const GENERIC_PLATE_RE = /^[A-Z0-9]{5,10}$/;

export interface NormalizedPlate {
  /** Placa normalizada: mayúsculas, sin espacios ni guiones. */
  plate: string;
  isGuatemalan: boolean;
  prefix?: string;
}

/** Quita espacios, guiones y puntos; pasa a mayúsculas. No valida. */
export function normalizePlate(input: string): string {
  return input
    .normalize('NFKC')
    .toUpperCase()
    .replace(/[\s\-.·_]/g, '')
    .replace(/[^A-Z0-9]/g, '');
}

export function parsePlate(input: string): NormalizedPlate | null {
  const plate = normalizePlate(input);
  const gt = GT_PLATE_RE.exec(plate);
  if (gt) {
    return { plate, isGuatemalan: true, prefix: gt[1] };
  }
  if (GENERIC_PLATE_RE.test(plate)) {
    return { plate, isGuatemalan: false };
  }
  return null;
}

export function isValidPlate(input: string): boolean {
  return parsePlate(input) !== null;
}

/** Formato legible: "P123ABC" -> "P 123ABC". Placas no guatemaltecas se devuelven tal cual. */
export function formatPlate(normalized: string): string {
  const gt = GT_PLATE_RE.exec(normalized);
  if (!gt) return normalized;
  return `${gt[1]} ${gt[2]}${gt[3]}`;
}

/** Inferencia simple del tipo de vehículo por prefijo (solo para precargar el formulario). */
export function inferVehicleTypeFromPlate(normalized: string): 'AUTO' | 'MOTO' | null {
  const gt = GT_PLATE_RE.exec(normalized);
  if (!gt) return null;
  return gt[1] === 'M' ? 'MOTO' : 'AUTO';
}
