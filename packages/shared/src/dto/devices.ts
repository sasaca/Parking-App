import { z } from 'zod';
import { idSchema, isoDateSchema } from './common.js';

export const createDeviceSchema = z.object({
  facilityId: idSchema,
  name: z.string().min(2).max(60),
});
export type CreateDeviceDto = z.infer<typeof createDeviceSchema>;

export const deviceSchema = z.object({
  id: idSchema,
  facilityId: idSchema,
  name: z.string(),
  platform: z.string().nullable(),
  /** Código de 8 caracteres que el guardia escribe en la app de garita. Solo visible hasta enrolar. */
  enrollmentCode: z.string().length(8).optional(),
  enrolledAt: isoDateSchema.nullable(),
  lastSyncAt: isoDateSchema.nullable(),
  revokedAt: isoDateSchema.nullable(),
});
export type DeviceDto = z.infer<typeof deviceSchema>;

export const enrollDeviceSchema = z.object({
  enrollmentCode: z.string().length(8),
  platform: z.enum(['android', 'ios', 'web']),
  model: z.string().max(80).optional(),
});
export type EnrollDeviceDto = z.infer<typeof enrollDeviceSchema>;

/** La garita se autentica con este token de dispositivo (Bearer dev-token). */
export const deviceSessionSchema = z.object({
  deviceId: idSchema,
  facilityId: idSchema,
  facilityName: z.string(),
  deviceToken: z.string(),
  passPublicKeyPem: z.string(),
});
export type DeviceSessionDto = z.infer<typeof deviceSessionSchema>;
