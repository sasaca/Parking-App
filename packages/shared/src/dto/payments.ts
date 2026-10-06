import { z } from 'zod';
import { InvoiceIssuer, InvoiceStatus, PaymentMethodType, PaymentStatus, PayoutStatus, RefundReason } from '../enums.js';
import { centavosSchema, idSchema, isoDateSchema } from './common.js';

export const paymentSchema = z.object({
  id: idSchema,
  reservationId: idSchema.nullable(),
  sessionId: idSchema.nullable(),
  chargeGroupId: idSchema.nullable(),
  provider: z.string(),
  amountCentavos: centavosSchema,
  currency: z.literal('GTQ'),
  status: z.nativeEnum(PaymentStatus),
  method: z.nativeEnum(PaymentMethodType),
  capturedAt: isoDateSchema.nullable(),
  failureCode: z.string().nullable(),
  createdAt: isoDateSchema,
});
export type PaymentDto = z.infer<typeof paymentSchema>;

export const refundRequestSchema = z.object({
  amountCentavos: centavosSchema.optional(),
  reason: z.nativeEnum(RefundReason),
  note: z.string().max(240).optional(),
});
export type RefundRequestDto = z.infer<typeof refundRequestSchema>;

export const invoiceSchema = z.object({
  id: idSchema,
  paymentId: idSchema,
  issuer: z.nativeEnum(InvoiceIssuer),
  status: z.nativeEnum(InvoiceStatus),
  felUuid: z.string().nullable(),
  serie: z.string().nullable(),
  numero: z.string().nullable(),
  receiverNit: z.string(),
  amountCentavos: centavosSchema,
  ivaCentavos: centavosSchema,
  pdfUrl: z.string().url().nullable(),
  createdAt: isoDateSchema,
});
export type InvoiceDto = z.infer<typeof invoiceSchema>;

export const payoutSchema = z.object({
  id: idSchema,
  operatorId: idSchema,
  periodStart: isoDateSchema,
  periodEnd: isoDateSchema,
  grossCentavos: centavosSchema,
  commissionCentavos: centavosSchema,
  gatewayFeesCentavos: centavosSchema,
  netCentavos: centavosSchema,
  status: z.nativeEnum(PayoutStatus),
  statementUrl: z.string().url().nullable(),
  paidAt: isoDateSchema.nullable(),
});
export type PayoutDto = z.infer<typeof payoutSchema>;

/** Checkout web sin app: pagar una sesión abierta o crear una reserva desde el navegador. */
export const webCheckoutSchema = z.object({
  facilitySlug: z.string(),
  plate: z.string().min(5).max(12),
  phone: z.string().regex(/^\+?[0-9]{8,15}$/),
  mode: z.enum(['PAY_SESSION', 'RESERVE']),
  startsAt: isoDateSchema.optional(),
  endsAt: isoDateSchema.optional(),
  /** Token de tarjeta del SDK de la pasarela, o método alterno. */
  cardToken: z.string().optional(),
  method: z.nativeEnum(PaymentMethodType).default('CARD'),
  nit: z.string().optional(),
  idempotencyKey: z.string().min(8).max(64),
});
export type WebCheckoutDto = z.infer<typeof webCheckoutSchema>;
