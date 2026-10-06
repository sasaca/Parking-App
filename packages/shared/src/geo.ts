/** Geometría esférica simple (sin PostGIS) para búsqueda por radio sobre lat/lng indexados. */

const EARTH_RADIUS_M = 6_371_008.8;

export interface LatLng {
  lat: number;
  lng: number;
}

export function haversineMeters(a: LatLng, b: LatLng): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const la1 = toRad(a.lat);
  const la2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.min(1, Math.sqrt(h)));
}

export interface BoundingBox {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

/** Caja que contiene el círculo de `radiusM` alrededor de `center`; para filtrar en SQL antes de haversine. */
export function boundingBox(center: LatLng, radiusM: number): BoundingBox {
  const dLat = (radiusM / EARTH_RADIUS_M) * (180 / Math.PI);
  const cos = Math.cos((center.lat * Math.PI) / 180);
  const dLng = cos === 0 ? 180 : dLat / Math.max(cos, 1e-9);
  return {
    minLat: Math.max(-90, center.lat - dLat),
    maxLat: Math.min(90, center.lat + dLat),
    minLng: Math.max(-180, center.lng - dLng),
    maxLng: Math.min(180, center.lng + dLng),
  };
}

/** Centro aproximado de la Ciudad de Guatemala (Plaza de la Constitución) para valores por defecto. */
export const GUATEMALA_CITY_CENTER: LatLng = { lat: 14.6407, lng: -90.5133 };
