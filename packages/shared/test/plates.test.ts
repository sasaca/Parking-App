import { describe, expect, it } from 'vitest';
import { formatPlate, inferVehicleTypeFromPlate, isValidPlate, normalizePlate, parsePlate } from '../src/plates.js';

describe('plates', () => {
  it('normalizes spacing, case and punctuation', () => {
    expect(normalizePlate('p 123abc')).toBe('P123ABC');
    expect(normalizePlate('P-123-ABC')).toBe('P123ABC');
    expect(normalizePlate(' m 456 xyz ')).toBe('M456XYZ');
  });

  it('parses Guatemalan plates', () => {
    expect(parsePlate('P 123ABC')).toEqual({ plate: 'P123ABC', isGuatemalan: true, prefix: 'P' });
    expect(parsePlate('TC 001AAA')).toEqual({ plate: 'TC001AAA', isGuatemalan: true, prefix: 'TC' });
    expect(parsePlate('CD 123ABC')?.isGuatemalan).toBe(true);
  });

  it('accepts foreign plates as generic', () => {
    expect(parsePlate('ABC1234')).toEqual({ plate: 'ABC1234', isGuatemalan: false });
    expect(isValidPlate('X')).toBe(false);
    expect(isValidPlate('')).toBe(false);
  });

  it('formats and infers vehicle type', () => {
    expect(formatPlate('P123ABC')).toBe('P 123ABC');
    expect(formatPlate('ABC1234')).toBe('ABC1234');
    expect(inferVehicleTypeFromPlate('M123ABC')).toBe('MOTO');
    expect(inferVehicleTypeFromPlate('P123ABC')).toBe('AUTO');
    expect(inferVehicleTypeFromPlate('ABC1234')).toBeNull();
  });
});
