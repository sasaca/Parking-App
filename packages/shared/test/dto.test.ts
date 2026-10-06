import { describe, expect, it } from 'vitest';
import { canTransition, createReservationSchema, quoteRequestSchema, rateRuleParamsSchema, searchFacilitiesQuerySchema } from '../src/index.js';

describe('dto schemas', () => {
  it('validates quote requests and rejects inverted ranges', () => {
    const ok = quoteRequestSchema.safeParse({
      facilityId: 'fac_12345678',
      startsAt: '2026-10-06T15:00:00Z',
      endsAt: '2026-10-06T17:00:00Z',
    });
    expect(ok.success).toBe(true);
    const bad = quoteRequestSchema.safeParse({
      facilityId: 'fac_12345678',
      startsAt: '2026-10-06T17:00:00Z',
      endsAt: '2026-10-06T15:00:00Z',
    });
    expect(bad.success).toBe(false);
  });

  it('coerces search query params', () => {
    const q = searchFacilitiesQuerySchema.parse({ lat: '14.6', lng: '-90.5' });
    expect(q.radiusM).toBe(1500);
    expect(q.vehicleType).toBe('AUTO');
    expect(q.limit).toBe(20);
  });

  it('normalizes plates in reservation creation', () => {
    const r = createReservationSchema.parse({
      facilityId: 'fac_12345678',
      plate: 'p 123-abc',
      startsAt: '2026-10-06T15:00:00Z',
      endsAt: '2026-10-06T17:00:00Z',
      idempotencyKey: 'idem-12345678',
    });
    expect(r.plate).toBe('P123ABC');
    expect(
      createReservationSchema.safeParse({
        facilityId: 'fac_12345678',
        startsAt: '2026-10-06T15:00:00Z',
        endsAt: '2026-10-06T17:00:00Z',
        idempotencyKey: 'idem-12345678',
      }).success,
    ).toBe(false);
  });

  it('discriminates rate rule params', () => {
    expect(rateRuleParamsSchema.parse({ type: 'HOURLY', pricePerHourCentavos: 1200 }).type).toBe('HOURLY');
    expect(rateRuleParamsSchema.safeParse({ type: 'FLAT_WINDOW', priceCentavos: 1500 }).success).toBe(false);
  });

  it('guards reservation state transitions', () => {
    expect(canTransition('CONFIRMED', 'CHECKED_IN')).toBe(true);
    expect(canTransition('COMPLETED', 'CANCELLED')).toBe(false);
    expect(canTransition('PENDING_PAYMENT', 'CHECKED_IN')).toBe(false);
  });
});
