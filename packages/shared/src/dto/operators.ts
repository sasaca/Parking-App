import { z } from 'zod';
import { OperatorPlan, OperatorRole } from '../enums.js';
import { centavosSchema, idSchema, isoDateSchema, nitSchema } from './common.js';

export const operatorAccountSchema = z.object({
  id: idSchema,
  legalName: z.string(),
  tradeName: z.string(),
  nit: z.string(),
  plan: z.nativeEnum(OperatorPlan),
  commissionBps: z.number().int().min(0).max(10_000),
  reservationFeeCentavos: centavosSchema,
  felEnabled: z.boolean(),
  createdAt: isoDateSchema,
});
export type OperatorAccountDto = z.infer<typeof operatorAccountSchema>;

export const createOperatorAccountSchema = z.object({
  legalName: z.string().min(3).max(160),
  tradeName: z.string().min(2).max(120),
  nit: nitSchema,
  taxRegime: z.string().max(60).optional(),
});
export type CreateOperatorAccountDto = z.infer<typeof createOperatorAccountSchema>;

export const operatorUserSchema = z.object({
  id: idSchema,
  userId: idSchema,
  role: z.nativeEnum(OperatorRole),
  name: z.string().nullable(),
  phone: z.string().nullable(),
});
export type OperatorUserDto = z.infer<typeof operatorUserSchema>;

export const inviteOperatorUserSchema = z.object({
  phone: z.string().regex(/^\+?[0-9]{8,15}$/),
  role: z.nativeEnum(OperatorRole),
  name: z.string().max(120).optional(),
});
export type InviteOperatorUserDto = z.infer<typeof inviteOperatorUserSchema>;

export const dailySalesReportSchema = z.object({
  facilityId: idSchema,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  sessions: z.number().int().nonnegative(),
  reservations: z.number().int().nonnegative(),
  grossCentavos: centavosSchema,
  byMethod: z.record(z.string(), centavosSchema),
  byDevice: z.array(z.object({ deviceId: idSchema, deviceName: z.string(), grossCentavos: centavosSchema })),
  noSpaceEvents: z.number().int().nonnegative(),
});
export type DailySalesReportDto = z.infer<typeof dailySalesReportSchema>;
