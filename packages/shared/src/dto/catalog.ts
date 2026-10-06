import { z } from 'zod';
import { FacilityStatus, HardwareLevel, RateRuleType } from '../enums.js';
import { centavosSchema, idSchema, isoDateSchema, latSchema, lngSchema, vehicleTypeSchema } from './common.js';

/** Horario semanal: 0 = domingo … 6 = sábado. "HH:MM" local Guatemala. null = cerrado ese día. */
export const dayHoursSchema = z
  .object({ open: z.string().regex(/^\d{2}:\d{2}$/), close: z.string().regex(/^\d{2}:\d{2}$/) })
  .nullable();
export const weeklyHoursSchema = z.object({
  is24h: z.boolean().default(false),
  days: z.tuple([dayHoursSchema, dayHoursSchema, dayHoursSchema, dayHoursSchema, dayHoursSchema, dayHoursSchema, dayHoursSchema]).optional(),
});
export type WeeklyHours = z.infer<typeof weeklyHoursSchema>;

export const amenitySchema = z.enum(['TECHADO', 'SEGURIDAD_24H', 'CAMARAS', 'ILUMINADO', 'MOTOS', 'ACCESIBLE', 'LAVADO', 'CARGA_EV']);
export type Amenity = z.infer<typeof amenitySchema>;

export const facilitySummarySchema = z.object({
  id: idSchema,
  slug: z.string(),
  name: z.string(),
  lat: latSchema,
  lng: lngSchema,
  address: z.string(),
  zone: z.string().nullable(),
  city: z.string(),
  photos: z.array(z.string().url()),
  amenities: z.array(amenitySchema),
  hardwareLevel: z.nativeEnum(HardwareLevel),
  status: z.nativeEnum(FacilityStatus),
  distanceMeters: z.number().nonnegative().optional(),
  /** Precio total cotizado para el rango buscado, si se pidió. */
  quoteTotalCentavos: centavosSchema.optional(),
  isAvailable: z.boolean().optional(),
});
export type FacilitySummaryDto = z.infer<typeof facilitySummarySchema>;

export const facilityDetailSchema = facilitySummarySchema.extend({
  description: z.string().nullable(),
  accessInstructions: z.string().nullable(),
  hours: weeklyHoursSchema,
  totalCapacity: z.number().int().nonnegative(),
  reservableCapacity: z.number().int().nonnegative(),
  supportPhone: z.string().nullable(),
  operatorTradeName: z.string(),
  ratePlanSummary: z.string().nullable(),
});
export type FacilityDetailDto = z.infer<typeof facilityDetailSchema>;

export const searchFacilitiesQuerySchema = z.object({
  lat: z.coerce.number().pipe(latSchema),
  lng: z.coerce.number().pipe(lngSchema),
  radiusM: z.coerce.number().int().min(100).max(20_000).default(1500),
  startsAt: isoDateSchema.optional(),
  endsAt: isoDateSchema.optional(),
  vehicleType: vehicleTypeSchema.default('AUTO'),
  amenities: z.string().optional(), // CSV
  limit: z.coerce.number().int().min(1).max(50).default(20),
});
export type SearchFacilitiesQuery = z.infer<typeof searchFacilitiesQuerySchema>;

export const upsertFacilitySchema = z.object({
  name: z.string().min(3).max(120),
  slug: z.string().regex(/^[a-z0-9-]{3,60}$/).optional(),
  description: z.string().max(2000).optional(),
  lat: latSchema,
  lng: lngSchema,
  address: z.string().min(5).max(240),
  zone: z.string().max(40).optional(),
  city: z.string().max(80).default('Guatemala'),
  photos: z.array(z.string().url()).max(12).default([]),
  accessInstructions: z.string().max(2000).optional(),
  hours: weeklyHoursSchema,
  totalCapacity: z.number().int().positive(),
  reservableCapacity: z.number().int().nonnegative(),
  amenities: z.array(amenitySchema).default([]),
  hardwareLevel: z.nativeEnum(HardwareLevel).default('L0_GARITA'),
  supportPhone: z.string().optional(),
});
export type UpsertFacilityDto = z.infer<typeof upsertFacilitySchema>;

/** Parámetros por tipo de regla. Los montos son centavos e incluyen IVA. */
export const rateRuleParamsSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(RateRuleType.HOURLY),
    pricePerHourCentavos: centavosSchema,
    /** Fracción mínima a cobrar en minutos (p. ej. 30 = se cobra media hora como mínimo). */
    minimumMinutes: z.number().int().positive().default(60),
  }),
  z.object({
    type: z.literal(RateRuleType.FLAT_WINDOW),
    /** Tarifa plana hasta N minutos (p. ej. Q15 hasta 240 min) y luego por hora adicional. */
    upToMinutes: z.number().int().positive(),
    priceCentavos: centavosSchema,
    thenPerHourCentavos: centavosSchema.optional(),
  }),
  z.object({
    type: z.literal(RateRuleType.DAILY),
    priceCentavos: centavosSchema,
  }),
  z.object({
    type: z.literal(RateRuleType.OVERNIGHT),
    /** Ventana nocturna local "HH:MM"–"HH:MM" (puede cruzar medianoche). */
    from: z.string().regex(/^\d{2}:\d{2}$/),
    to: z.string().regex(/^\d{2}:\d{2}$/),
    priceCentavos: centavosSchema,
  }),
  z.object({
    type: z.literal(RateRuleType.EVENT),
    eventId: idSchema,
    priceCentavos: centavosSchema,
  }),
]);
export type RateRuleParams = z.infer<typeof rateRuleParamsSchema>;

export const rateRuleSchema = z.object({
  id: idSchema,
  priority: z.number().int(),
  vehicleTypes: z.array(vehicleTypeSchema).min(1),
  params: rateRuleParamsSchema,
});
export type RateRuleDto = z.infer<typeof rateRuleSchema>;

export const ratePlanSchema = z.object({
  id: idSchema,
  facilityId: idSchema,
  name: z.string(),
  isDefault: z.boolean(),
  graceMinutes: z.number().int().nonnegative(),
  roundingMinutes: z.number().int().positive(),
  dailyMaxCentavos: centavosSchema.nullable(),
  active: z.boolean(),
  rules: z.array(rateRuleSchema),
});
export type RatePlanDto = z.infer<typeof ratePlanSchema>;

export const upsertRatePlanSchema = z.object({
  name: z.string().min(2).max(80),
  isDefault: z.boolean().default(true),
  graceMinutes: z.number().int().min(0).max(60).default(10),
  roundingMinutes: z.number().int().min(1).max(60).default(30),
  dailyMaxCentavos: centavosSchema.optional(),
  rules: z
    .array(
      z.object({
        priority: z.number().int().default(0),
        vehicleTypes: z.array(vehicleTypeSchema).min(1),
        params: rateRuleParamsSchema,
      }),
    )
    .min(1),
});
export type UpsertRatePlanDto = z.infer<typeof upsertRatePlanSchema>;

export const eventSchema = z.object({
  id: idSchema,
  facilityId: idSchema,
  name: z.string(),
  startsAt: isoDateSchema,
  endsAt: isoDateSchema,
  priceCentavos: centavosSchema,
  extraReservableCapacity: z.number().int().nonnegative(),
  active: z.boolean(),
});
export type EventDto = z.infer<typeof eventSchema>;

export const upsertEventSchema = z.object({
  name: z.string().min(2).max(120),
  startsAt: isoDateSchema,
  endsAt: isoDateSchema,
  priceCentavos: centavosSchema,
  extraReservableCapacity: z.number().int().nonnegative().default(0),
  active: z.boolean().default(true),
});
export type UpsertEventDto = z.infer<typeof upsertEventSchema>;
