/**
 * Pase de acceso (QR) y código de respaldo.
 * El QR contiene un JWT compacto firmado con ES256 por la plataforma. La app de garita verifica
 * la firma y la ventana de validez sin conexión; en línea además consulta el estado de la reserva.
 */

export const PASS_JWT_ALG = 'ES256' as const;
export const PASS_VERSION = 1 as const;
/** El QR se regenera cada 60 s; se tolera un desfase de reloj de ±120 s en la garita. */
export const PASS_ROTATION_SECONDS = 60;
export const PASS_CLOCK_SKEW_SECONDS = 120;

export interface PassClaims {
  /** Versión del formato. */
  v: typeof PASS_VERSION;
  /** reservationId o parkingSessionId. */
  sub: string;
  /** Tipo de sujeto. */
  typ: 'reservation' | 'session';
  /** facilityId. */
  fac: string;
  /** Placa normalizada. */
  plate: string;
  /** not-before y expiración (segundos Unix). */
  nbf: number;
  exp: number;
  /** issued-at (segundos Unix). */
  iat: number;
}

/** Prefijo del contenido del QR para distinguirlo de otros QR (p. ej. QR fijo del rótulo). */
export const PASS_QR_PREFIX = 'PKGT1:';
/** QR fijo del rótulo del parqueo (drive-up / checkout web): URL pública del parqueo. */
export function facilityQrUrl(webPublicUrl: string, facilitySlug: string): string {
  return `${webPublicUrl.replace(/\/$/, '')}/p/${encodeURIComponent(facilitySlug)}`;
}

export const CODE6_LENGTH = 6;
const CODE6_RE = /^\d{6}$/;

export function isValidCode6(code: string): boolean {
  return CODE6_RE.test(code);
}

/**
 * Genera un código de 6 dígitos usando el generador aleatorio provisto (criptográfico en servidor).
 * `randomInt` debe devolver un entero uniforme en [0, max).
 */
export function generateCode6(randomInt: (max: number) => number): string {
  return randomInt(1_000_000).toString().padStart(CODE6_LENGTH, '0');
}

export function formatCode6(code: string): string {
  return isValidCode6(code) ? `${code.slice(0, 3)} ${code.slice(3)}` : code;
}
