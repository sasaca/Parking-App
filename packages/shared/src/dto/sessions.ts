import { z } from 'zod';
import { GateEventType, GateMethod, PaymentMethodType, SessionSource, SessionStatus } from '../enums.js';
import { centavosSchema, idSchema, isoDateSchema, moneyLineSchema, plateSchema, vehicleTypeSchema } from './common.js';

/** Resultado de validar un QR o código en la garita. */
export const gateValidationSchema = z.object({
  ok: z.boolean(),
  /** Motivo en español listo para mostrar al guardia. */
  message: z.string(),
  reservationId: idSchema.optional(),
  sessionId: idSchema.optional(),
  plate: plateSchema.optional(),
  vehicleType: vehicleTypeSchema.optional(),
  validUntil: isoDateSchema.optional(),
  /** Si ya hizo check-in, la validación es de salida. */
  direction: z.enum(['IN', 'OUT']).optional(),
  amountDueCentavos: centavosSchema.optional(),
});
export type GateValidationDto = z.infer<typeof gateValidationSchema>;

export const gateScanSchema = z.object({
  /** Contenido del QR (con prefijo PKGT1:) o código de 6 dígitos o placa. */
  payload: z.string().min(4).max(2048),
  method: z.nativeEnum(GateMethod),
  /** Marca de tiempo del dispositivo (para eventos offline sincronizados después). */
  deviceTs: isoDateSchema,
  offline: z.boolean().default(false),
  /** Idempotencia por evento de garita. */
  eventId: z.string().min(8).max(64),
});
export type GateScanDto = z.infer<typeof gateScanSchema>;

export const openDriveUpSessionSchema = z.object({
  plate: plateSchema,
  vehicleType: vehicleTypeSchema.default('AUTO'),
  deviceTs: isoDateSchema,
  offline: z.boolean().default(false),
  eventId: z.string().min(8).max(64),
  photoUrl: z.string().url().optional(),
});
export type OpenDriveUpSessionDto = z.infer<typeof openDriveUpSessionSchema>;

export const closeSessionSchema = z.object({
  deviceTs: isoDateSchema,
  offline: z.boolean().default(false),
  eventId: z.string().min(8).max(64),
  /** Cómo se cobró en garita cuando el conductor no paga con la app. */
  paidWith: z.nativeEnum(PaymentMethodType).optional(),
  /** Monto efectivamente cobrado en garita en centavos (debe coincidir con amountDue salvo ajuste autorizado). */
  paidCentavos: centavosSchema.optional(),
});
export type CloseSessionDto = z.infer<typeof closeSessionSchema>;

export const markNoSpaceSchema = z.object({
  reservationId: idSchema,
  deviceTs: isoDateSchema,
  eventId: z.string().min(8).max(64),
  note: z.string().max(240).optional(),
});
export type MarkNoSpaceDto = z.infer<typeof markNoSpaceSchema>;

export const parkingSessionSchema = z.object({
  id: idSchema,
  facilityId: idSchema,
  reservationId: idSchema.nullable(),
  plate: plateSchema,
  vehicleType: vehicleTypeSchema,
  source: z.nativeEnum(SessionSource),
  status: z.nativeEnum(SessionStatus),
  enteredAt: isoDateSchema,
  exitedAt: isoDateSchema.nullable(),
  amountCentavos: centavosSchema.nullable(),
  overstayCentavos: centavosSchema.nullable(),
  lines: z.array(moneyLineSchema).optional(),
});
export type ParkingSessionDto = z.infer<typeof parkingSessionSchema>;

export const gateEventSchema = z.object({
  id: idSchema,
  type: z.nativeEnum(GateEventType),
  method: z.nativeEnum(GateMethod),
  offline: z.boolean(),
  deviceTs: isoDateSchema,
  serverTs: isoDateSchema,
  sessionId: idSchema.nullable(),
});
export type GateEventDto = z.infer<typeof gateEventSchema>;

/** Lista que la garita descarga cada 2 minutos para validar sin conexión. */
export const todaysReservationsSchema = z.object({
  facilityId: idSchema,
  generatedAt: isoDateSchema,
  /** Clave pública PEM para verificar firmas de los QR. */
  passPublicKeyPem: z.string(),
  reservations: z.array(
    z.object({
      id: idSchema,
      code6: z.string(),
      plate: plateSchema,
      vehicleType: vehicleTypeSchema,
      startsAt: isoDateSchema,
      endsAt: isoDateSchema,
      status: z.string(),
    }),
  ),
});
export type TodaysReservationsDto = z.infer<typeof todaysReservationsSchema>;
