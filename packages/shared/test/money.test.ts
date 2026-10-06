import { describe, expect, it } from 'vitest';
import { applyBps, baseFromInclusive, formatGTQ, ivaFromInclusive, sumLines, toCentavos } from '../src/money.js';

describe('money', () => {
  it('formats centavos as quetzales', () => {
    expect(formatGTQ(1500)).toBe('Q15.00');
    expect(formatGTQ(5)).toBe('Q0.05');
    expect(formatGTQ(-250)).toBe('-Q2.50');
    expect(formatGTQ(123456)).toBe('Q1234.56');
  });

  it('converts quetzales to centavos with rounding', () => {
    expect(toCentavos(15)).toBe(1500);
    expect(toCentavos(0.1 + 0.2)).toBe(30);
  });

  it('splits IVA from inclusive totals', () => {
    // Q15.00 incluye IVA: base Q13.39, IVA Q1.61
    expect(ivaFromInclusive(1500)).toBe(161);
    expect(baseFromInclusive(1500)).toBe(1339);
    expect(ivaFromInclusive(0)).toBe(0);
    expect(ivaFromInclusive(112)).toBe(12);
  });

  it('applies basis points', () => {
    expect(applyBps(1500, 1000)).toBe(150); // 10 %
    expect(applyBps(6000, 1500)).toBe(900); // 15 %
    expect(() => applyBps(100, 20000)).toThrow(RangeError);
    expect(() => applyBps(-1, 100)).toThrow(RangeError);
  });

  it('sums lines', () => {
    expect(
      sumLines([
        { key: 'parking', label: 'Parqueo', amountCentavos: 1500 },
        { key: 'fee', label: 'Fee', amountCentavos: 300 },
        { key: 'discount', label: 'Descuento', amountCentavos: -200 },
      ]),
    ).toBe(1600);
  });
});
