/**
 * Dinero en quetzales. Toda cantidad se representa como entero en centavos (Q1.00 = 100).
 * Los precios publicados en Guatemala incluyen IVA (12 %); el IVA se desglosa a partir del total.
 */

export const CURRENCY = 'GTQ' as const;
export const IVA_RATE = 0.12;
/** Multiplicador entero para evitar flotantes: total = base * 112 / 100. */
const IVA_NUM = 112;
const IVA_DEN = 100;

export function assertCentavos(value: number, name = 'amount'): void {
  if (!Number.isInteger(value) || value < 0) {
    throw new RangeError(`${name} must be a non-negative integer number of centavos, got ${value}`);
  }
}

/** Convierte quetzales (decimal) a centavos con redondeo bancario estándar al centavo. */
export function toCentavos(quetzales: number): number {
  if (!Number.isFinite(quetzales)) throw new RangeError('quetzales must be finite');
  return Math.round(quetzales * 100);
}

export function fromCentavos(centavos: number): number {
  assertCentavos(centavos);
  return centavos / 100;
}

/** Formatea centavos como "Q15.00" (sin separador de miles, estable para tests y recibos). */
export function formatGTQ(centavos: number): string {
  const sign = centavos < 0 ? '-' : '';
  const abs = Math.abs(centavos);
  const q = Math.floor(abs / 100);
  const c = abs % 100;
  return `${sign}Q${q}.${c.toString().padStart(2, '0')}`;
}

/** IVA contenido en un monto que ya incluye IVA: total - total/1.12, redondeado al centavo. */
export function ivaFromInclusive(totalCentavos: number): number {
  assertCentavos(totalCentavos, 'totalCentavos');
  const base = Math.round((totalCentavos * IVA_DEN) / IVA_NUM);
  return totalCentavos - base;
}

/** Base imponible (sin IVA) de un monto que incluye IVA. */
export function baseFromInclusive(totalCentavos: number): number {
  return totalCentavos - ivaFromInclusive(totalCentavos);
}

/** Aplica puntos básicos (1 bps = 0.01 %) a un monto; redondea al centavo. */
export function applyBps(centavos: number, bps: number): number {
  assertCentavos(centavos);
  if (!Number.isInteger(bps) || bps < 0 || bps > 10_000) {
    throw new RangeError(`bps must be an integer in [0, 10000], got ${bps}`);
  }
  return Math.round((centavos * bps) / 10_000);
}

export interface MoneyLine {
  /** Clave estable para UI y contabilidad, p. ej. "parking", "reservation_fee", "overstay", "discount". */
  key: string;
  /** Etiqueta en español para mostrar al usuario. */
  label: string;
  amountCentavos: number;
}

export function sumLines(lines: readonly MoneyLine[]): number {
  return lines.reduce((acc, l) => acc + l.amountCentavos, 0);
}
