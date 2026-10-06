import { z } from 'zod';
import { VehicleType } from '../enums.js';

export const idSchema = z.string().min(8).max(64);
export const isoDateSchema = z.string().datetime({ offset: true });
export const centavosSchema = z.number().int().nonnegative();
export const vehicleTypeSchema = z.nativeEnum(VehicleType);
export const plateSchema = z
  .string()
  .min(5)
  .max(12)
  .transform((s) => s.toUpperCase().replace(/[\s\-.]/g, ''));
export const latSchema = z.number().min(-90).max(90);
export const lngSchema = z.number().min(-180).max(180);
export const phoneSchema = z.string().regex(/^\+?[0-9]{8,15}$/, 'Teléfono inválido');
export const nitSchema = z
  .string()
  .transform((s) => s.toUpperCase().replace(/[\s-]/g, ''))
  .pipe(z.string().regex(/^(CF|[0-9]{4,12}[0-9K])$/, 'NIT inválido'));

export const paginationQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

export const pageSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({ items: z.array(item), nextCursor: z.string().nullable() });

/** Error estándar de la API. `code` es estable para que las apps traduzcan mensajes. */
export const apiErrorSchema = z.object({
  statusCode: z.number().int(),
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
});
export type ApiError = z.infer<typeof apiErrorSchema>;

export const moneyLineSchema = z.object({
  key: z.string(),
  label: z.string(),
  amountCentavos: z.number().int(),
});
export type MoneyLineDto = z.infer<typeof moneyLineSchema>;
