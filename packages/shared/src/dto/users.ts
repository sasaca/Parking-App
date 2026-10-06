import { z } from 'zod';
import { PlatformRole } from '../enums.js';
import { idSchema, isoDateSchema, nitSchema, phoneSchema, plateSchema, vehicleTypeSchema } from './common.js';

export const userProfileSchema = z.object({
  id: idSchema,
  phone: phoneSchema.nullable(),
  email: z.string().email().nullable(),
  name: z.string().min(1).max(120).nullable(),
  nit: z.string().nullable(),
  locale: z.string().default('es-GT'),
  platformRole: z.nativeEnum(PlatformRole),
  createdAt: isoDateSchema,
});
export type UserProfileDto = z.infer<typeof userProfileSchema>;

export const updateUserProfileSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  email: z.string().email().optional(),
  nit: nitSchema.optional(),
});
export type UpdateUserProfileDto = z.infer<typeof updateUserProfileSchema>;

export const vehicleSchema = z.object({
  id: idSchema,
  plate: plateSchema,
  type: vehicleTypeSchema,
  color: z.string().max(40).nullable(),
  isDefault: z.boolean(),
});
export type VehicleDto = z.infer<typeof vehicleSchema>;

export const createVehicleSchema = z.object({
  plate: plateSchema,
  type: vehicleTypeSchema,
  color: z.string().max(40).optional(),
  isDefault: z.boolean().optional(),
});
export type CreateVehicleDto = z.infer<typeof createVehicleSchema>;

export const paymentMethodSchema = z.object({
  id: idSchema,
  provider: z.string(),
  brand: z.string().nullable(),
  last4: z.string().length(4).nullable(),
  expMonth: z.number().int().min(1).max(12).nullable(),
  expYear: z.number().int().nullable(),
  isDefault: z.boolean(),
});
export type PaymentMethodDto = z.infer<typeof paymentMethodSchema>;

/** El token lo produce el SDK/campos alojados de la pasarela en el cliente; el PAN nunca pasa por la API. */
export const createPaymentMethodSchema = z.object({
  provider: z.string(),
  token: z.string().min(8),
  isDefault: z.boolean().optional(),
});
export type CreatePaymentMethodDto = z.infer<typeof createPaymentMethodSchema>;
