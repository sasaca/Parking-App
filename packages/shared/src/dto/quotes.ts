import { z } from 'zod';
import { centavosSchema, idSchema, isoDateSchema, moneyLineSchema, vehicleTypeSchema } from './common.js';

export const quoteRequestSchema = z
  .object({
    facilityId: idSchema,
    vehicleType: vehicleTypeSchema.default('AUTO'),
    startsAt: isoDateSchema,
    endsAt: isoDateSchema,
  })
  .refine((q) => new Date(q.endsAt).getTime() > new Date(q.startsAt).getTime(), {
    message: 'endsAt debe ser posterior a startsAt',
    path: ['endsAt'],
  });
export type QuoteRequestDto = z.infer<typeof quoteRequestSchema>;

/** Resultado del motor de tarifas (packages/pricing) tal como lo expone la API. Montos incluyen IVA. */
export const quoteSchema = z.object({
  facilityId: idSchema,
  vehicleType: vehicleTypeSchema,
  startsAt: isoDateSchema,
  endsAt: isoDateSchema,
  parkingCentavos: centavosSchema,
  feeCentavos: centavosSchema,
  totalCentavos: centavosSchema,
  /** IVA contenido en el total (desglose informativo). */
  ivaCentavos: centavosSchema,
  lines: z.array(moneyLineSchema),
  appliedRuleIds: z.array(z.string()),
  eventId: idSchema.nullable(),
  isAvailable: z.boolean(),
  /** Firma opaca que la API puede usar para aceptar una reserva con el precio cotizado durante unos minutos. */
  quoteToken: z.string().optional(),
  expiresAt: isoDateSchema.optional(),
});
export type QuoteDto = z.infer<typeof quoteSchema>;
