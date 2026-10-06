import { describe, expect, it } from 'vitest';
import { boundingBox, GUATEMALA_CITY_CENTER, haversineMeters } from '../src/geo.js';

describe('geo', () => {
  it('measures distances', () => {
    // Plaza de la Constitución -> Oakland Mall (zona 10) ≈ 5.3 km
    const oakland = { lat: 14.5988, lng: -90.5069 };
    const d = haversineMeters(GUATEMALA_CITY_CENTER, oakland);
    expect(d).toBeGreaterThan(4500);
    expect(d).toBeLessThan(6000);
    expect(haversineMeters(oakland, oakland)).toBe(0);
  });

  it('builds a bounding box that contains the radius', () => {
    const box = boundingBox(GUATEMALA_CITY_CENTER, 1500);
    expect(box.minLat).toBeLessThan(GUATEMALA_CITY_CENTER.lat);
    expect(box.maxLat).toBeGreaterThan(GUATEMALA_CITY_CENTER.lat);
    const north = { lat: box.maxLat, lng: GUATEMALA_CITY_CENTER.lng };
    expect(haversineMeters(GUATEMALA_CITY_CENTER, north)).toBeCloseTo(1500, -1);
  });
});
