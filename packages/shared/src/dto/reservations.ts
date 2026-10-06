import { z } from 'zod';
import { ReservationStatus } from '../enums.js';
import { centavosSchema, idSchema, isoDateSchema, moneyLineSchema, plateSchema, vehicleTypeSchema } from './common.js';

export const createReservationSchema = z
  .object({
    facilityId: idSchema,
    vehicleId: idSchema.optional(),
    /** Alternativa a vehicleId para checkout web sin cuenta completa. */
    plate: plateSchema.optional(),
    vehicleType: vehicleTypeSchema.default('AUTO'),
    startsAt: isoDateSchema,
    endsAt: isoDateSchema,
    /** Método de pago guardado (tarjeta tokenizada). Si se omite, se devuelve una intención de pago por QR/transferencia. */
    paymentMethodId: idSchema.optional(),
    quoteToken: z.string().optional(),
    /** Clave de idempotencia generada por el cliente (UUID). */
    idempotencyKey: z.string().min(8).max(64),
  })
  .refine((r) => r.vehicleId || r.plate, { message: 'vehicleId o plate es requerido', path: ['vehicleId'] });
export type CreateReservationDto = z.infer<typeof createReservationSchema>;

export const reservationSchema = z.object({
  id: idSchema,
  status: z.nativeEnum(ReservationStatus),
  facilityId: idSchema,
  facilityName: z.string(),
  facilitySlug: z.string(),
  plate: plateSchema,
  vehicleType: vehicleTypeSchema,
  startsAt: isoDateSchema,
  endsAt: isoDateSchema,
  parkingCentavos: centavosSchema,
  feeCentavos: centavosSchema,
  ivaCentavos: centavosSchema,
  totalCentavos: centavosSchema,
  lines: z.array(moneyLineSchema),
  /** Código de respaldo de 6 dígitos; solo se devuelve al dueño de la reserva. */
  code6: z.string().regex(/^\d{6}$/).optional(),
  /** Instrucciones de pago cuando el método no es tarjeta (QR bancario / transferencia). */
  paymentInstructions: z
    .object({
      method: z.enum(['BANK_QR', 'BANK_TRANSFER']),
      qrPayload: z.string().optional(),
      reference: z.string(),
      expiresAt: isoDateSchema,
    })
    .optional(),
  checkedInAt: isoDateSchema.nullable(),
  completedAt: isoDateSchema.nullable(),
  cancelledAt: isoDateSchema.nullable(),
  createdAt: isoDateSchema,
});
export type ReservationDto = z.infer<typeof reservationSchema>;

/** QR actual del pase (rota cada 60 s). */
export const reservationPassSchema = z.object({
  reservationId: idSchema,
  qr: z.string(),
  code6: z.string(),
  plate: plateSchema,
  validFrom: isoDateSchema,
  validUntil: isoDateSchema,
  refreshAfterSeconds: z.number().int().positive(),
});
export type ReservationPassDto = z.infer<typeof reservationPassSchema>;

export const extendReservationSchema = z.object({
  newEndsAt: isoDateSchema,
  idempotencyKey: z.string().min(8).max(64),
});
export type ExtendReservationDto = z.infer<typeof extendReservationSchema>;

export const cancelReservationSchema = z.object({
  reason: z.string().max(240).optional(),
});
export type CancelReservationDto = z.infer<typeof cancelReservationSchema>;
