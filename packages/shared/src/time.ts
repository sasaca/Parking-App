/**
 * Utilidades de tiempo. Guatemala usa America/Guatemala (UTC-6, sin horario de verano).
 * Internamente todo viaja como ISO 8601 en UTC; los slots de inventario son de 15 minutos.
 */

export const GT_TIMEZONE = 'America/Guatemala';
export const GT_UTC_OFFSET_MINUTES = -6 * 60;
export const SLOT_MINUTES = 15;
const MS_PER_MINUTE = 60_000;

export function minutesBetween(start: Date, end: Date): number {
  return (end.getTime() - start.getTime()) / MS_PER_MINUTE;
}

export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * MS_PER_MINUTE);
}

/** Redondea hacia abajo al inicio del slot de 15 minutos. */
export function floorToSlot(date: Date, slotMinutes = SLOT_MINUTES): Date {
  const ms = slotMinutes * MS_PER_MINUTE;
  return new Date(Math.floor(date.getTime() / ms) * ms);
}

/** Redondea hacia arriba al fin del slot de 15 minutos (un instante exacto se mantiene). */
export function ceilToSlot(date: Date, slotMinutes = SLOT_MINUTES): Date {
  const ms = slotMinutes * MS_PER_MINUTE;
  return new Date(Math.ceil(date.getTime() / ms) * ms);
}

/** Inicio de cada slot de 15 minutos cubierto por [start, end). */
export function slotsBetween(start: Date, end: Date, slotMinutes = SLOT_MINUTES): Date[] {
  if (end.getTime() <= start.getTime()) return [];
  const first = floorToSlot(start, slotMinutes);
  const last = ceilToSlot(end, slotMinutes);
  const out: Date[] = [];
  for (let t = first.getTime(); t < last.getTime(); t += slotMinutes * MS_PER_MINUTE) {
    out.push(new Date(t));
  }
  return out;
}

/** Hora local de Guatemala (0–23) y minutos para un instante UTC. */
export function localTimeGT(date: Date): { hour: number; minute: number; weekday: number } {
  const shifted = new Date(date.getTime() + GT_UTC_OFFSET_MINUTES * MS_PER_MINUTE);
  return { hour: shifted.getUTCHours(), minute: shifted.getUTCMinutes(), weekday: shifted.getUTCDay() };
}

/** Medianoche local de Guatemala del día que contiene `date`, expresada en UTC. */
export function startOfLocalDayGT(date: Date): Date {
  const shifted = new Date(date.getTime() + GT_UTC_OFFSET_MINUTES * MS_PER_MINUTE);
  const localMidnight = Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth(), shifted.getUTCDate());
  return new Date(localMidnight - GT_UTC_OFFSET_MINUTES * MS_PER_MINUTE);
}

export function isoNow(now: () => Date = () => new Date()): string {
  return now().toISOString();
}
