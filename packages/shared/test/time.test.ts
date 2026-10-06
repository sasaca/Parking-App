import { describe, expect, it } from 'vitest';
import { ceilToSlot, floorToSlot, localTimeGT, minutesBetween, slotsBetween, startOfLocalDayGT } from '../src/time.js';

describe('time', () => {
  it('rounds to 15-minute slots', () => {
    const d = new Date('2026-10-06T15:07:30Z');
    expect(floorToSlot(d).toISOString()).toBe('2026-10-06T15:00:00.000Z');
    expect(ceilToSlot(d).toISOString()).toBe('2026-10-06T15:15:00.000Z');
    const exact = new Date('2026-10-06T15:15:00Z');
    expect(ceilToSlot(exact).toISOString()).toBe('2026-10-06T15:15:00.000Z');
  });

  it('enumerates slots covering a range', () => {
    const slots = slotsBetween(new Date('2026-10-06T15:05:00Z'), new Date('2026-10-06T16:00:00Z'));
    expect(slots.map((s) => s.toISOString())).toEqual([
      '2026-10-06T15:00:00.000Z',
      '2026-10-06T15:15:00.000Z',
      '2026-10-06T15:30:00.000Z',
      '2026-10-06T15:45:00.000Z',
    ]);
    expect(slotsBetween(new Date('2026-10-06T16:00:00Z'), new Date('2026-10-06T16:00:00Z'))).toEqual([]);
  });

  it('computes Guatemala local time (UTC-6, no DST)', () => {
    expect(localTimeGT(new Date('2026-10-06T03:30:00Z'))).toEqual({ hour: 21, minute: 30, weekday: 1 });
    expect(startOfLocalDayGT(new Date('2026-10-06T03:30:00Z')).toISOString()).toBe('2026-10-05T06:00:00.000Z');
    expect(minutesBetween(new Date('2026-10-06T10:00:00Z'), new Date('2026-10-06T12:30:00Z'))).toBe(150);
  });
});
