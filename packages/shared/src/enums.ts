/**
 * Enumeraciones de dominio. Deben mantenerse sincronizadas con `apps/api/prisma/schema.prisma`.
 * Se modelan como objetos `as const` para que sirvan tanto en runtime (zod, UI) como en tipos.
 */

export const VehicleType = { AUTO: 'AUTO', MOTO: 'MOTO', PICKUP: 'PICKUP' } as const;
export type VehicleType = (typeof VehicleType)[keyof typeof VehicleType];

export const OperatorRole = { OWNER: 'OWNER', ADMIN: 'ADMIN', GUARD: 'GUARD' } as const;
export type OperatorRole = (typeof OperatorRole)[keyof typeof OperatorRole];

export const PlatformRole = { USER: 'USER', PLATFORM_ADMIN: 'PLATFORM_ADMIN' } as const;
export type PlatformRole = (typeof PlatformRole)[keyof typeof PlatformRole];

export const OperatorPlan = { FREE: 'FREE', PRO: 'PRO', ENTERPRISE: 'ENTERPRISE' } as const;
export type OperatorPlan = (typeof OperatorPlan)[keyof typeof OperatorPlan];

export const FacilityStatus = { DRAFT: 'DRAFT', ACTIVE: 'ACTIVE', PAUSED: 'PAUSED' } as const;
export type FacilityStatus = (typeof FacilityStatus)[keyof typeof FacilityStatus];

/** Nivel de integración con hardware del parqueo (ver docs/02-arquitectura-tecnica.md §6). */
export const HardwareLevel = {
  L0_GARITA: 'L0_GARITA',
  L1_QR_FIJO: 'L1_QR_FIJO',
  L2_LPR: 'L2_LPR',
  L3_PARCS: 'L3_PARCS',
} as const;
export type HardwareLevel = (typeof HardwareLevel)[keyof typeof HardwareLevel];

export const RateRuleType = {
  HOURLY: 'HOURLY',
  FLAT_WINDOW: 'FLAT_WINDOW',
  DAILY: 'DAILY',
  OVERNIGHT: 'OVERNIGHT',
  EVENT: 'EVENT',
} as const;
export type RateRuleType = (typeof RateRuleType)[keyof typeof RateRuleType];

export const ReservationStatus = {
  QUOTED: 'QUOTED',
  PENDING_PAYMENT: 'PENDING_PAYMENT',
  CONFIRMED: 'CONFIRMED',
  CHECKED_IN: 'CHECKED_IN',
  COMPLETED: 'COMPLETED',
  EXPIRED: 'EXPIRED',
  CANCELLED: 'CANCELLED',
  NO_SHOW: 'NO_SHOW',
  REFUNDED_NO_SPACE: 'REFUNDED_NO_SPACE',
} as const;
export type ReservationStatus = (typeof ReservationStatus)[keyof typeof ReservationStatus];

/** Transiciones válidas de la máquina de estados de la reserva. */
export const RESERVATION_TRANSITIONS: Readonly<Record<ReservationStatus, readonly ReservationStatus[]>> = {
  QUOTED: ['PENDING_PAYMENT', 'EXPIRED'],
  PENDING_PAYMENT: ['CONFIRMED', 'EXPIRED', 'CANCELLED'],
  CONFIRMED: ['CHECKED_IN', 'CANCELLED', 'NO_SHOW', 'REFUNDED_NO_SPACE'],
  CHECKED_IN: ['COMPLETED', 'REFUNDED_NO_SPACE'],
  COMPLETED: [],
  EXPIRED: [],
  CANCELLED: [],
  NO_SHOW: [],
  REFUNDED_NO_SPACE: [],
};

export function canTransition(from: ReservationStatus, to: ReservationStatus): boolean {
  return RESERVATION_TRANSITIONS[from].includes(to);
}

export const SessionStatus = { OPEN: 'OPEN', CLOSED: 'CLOSED', VOIDED: 'VOIDED' } as const;
export type SessionStatus = (typeof SessionStatus)[keyof typeof SessionStatus];

export const SessionSource = {
  RESERVATION: 'RESERVATION',
  DRIVE_UP: 'DRIVE_UP',
  LPR: 'LPR',
  WEB_CHECKOUT: 'WEB_CHECKOUT',
} as const;
export type SessionSource = (typeof SessionSource)[keyof typeof SessionSource];

export const GateEventType = {
  CHECK_IN: 'CHECK_IN',
  CHECK_OUT: 'CHECK_OUT',
  DENIED: 'DENIED',
  NO_SPACE: 'NO_SPACE',
} as const;
export type GateEventType = (typeof GateEventType)[keyof typeof GateEventType];

export const GateMethod = { QR: 'QR', CODE: 'CODE', PLATE: 'PLATE', LPR: 'LPR', MANUAL: 'MANUAL' } as const;
export type GateMethod = (typeof GateMethod)[keyof typeof GateMethod];

export const PaymentStatus = {
  PENDING: 'PENDING',
  AUTHORIZED: 'AUTHORIZED',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
  PARTIALLY_REFUNDED: 'PARTIALLY_REFUNDED',
} as const;
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const PaymentMethodType = {
  CARD: 'CARD',
  BANK_QR: 'BANK_QR',
  BANK_TRANSFER: 'BANK_TRANSFER',
  CASH: 'CASH',
} as const;
export type PaymentMethodType = (typeof PaymentMethodType)[keyof typeof PaymentMethodType];

export const RefundReason = {
  CANCELLATION: 'CANCELLATION',
  NO_SPACE: 'NO_SPACE',
  SUPPORT: 'SUPPORT',
  OTHER: 'OTHER',
} as const;
export type RefundReason = (typeof RefundReason)[keyof typeof RefundReason];

export const InvoiceIssuer = { OPERATOR: 'OPERATOR', PLATFORM: 'PLATFORM' } as const;
export type InvoiceIssuer = (typeof InvoiceIssuer)[keyof typeof InvoiceIssuer];

export const InvoiceStatus = { PENDING: 'PENDING', ISSUED: 'ISSUED', FAILED: 'FAILED', VOIDED: 'VOIDED' } as const;
export type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus];

export const LedgerAccount = {
  OPERATOR_PAYABLE: 'OPERATOR_PAYABLE',
  PLATFORM_REVENUE: 'PLATFORM_REVENUE',
  GATEWAY_FEES: 'GATEWAY_FEES',
  TAX_IVA: 'TAX_IVA',
  CUSTOMER_RECEIVABLE: 'CUSTOMER_RECEIVABLE',
  CASH_AT_FACILITY: 'CASH_AT_FACILITY',
} as const;
export type LedgerAccount = (typeof LedgerAccount)[keyof typeof LedgerAccount];

export const PayoutStatus = { DRAFT: 'DRAFT', PENDING: 'PENDING', PAID: 'PAID', FAILED: 'FAILED' } as const;
export type PayoutStatus = (typeof PayoutStatus)[keyof typeof PayoutStatus];

export const ChargeGroupStatus = {
  OPEN: 'OPEN',
  CHARGING: 'CHARGING',
  CHARGED: 'CHARGED',
  FAILED: 'FAILED',
} as const;
export type ChargeGroupStatus = (typeof ChargeGroupStatus)[keyof typeof ChargeGroupStatus];

export const NotificationChannel = { WHATSAPP: 'WHATSAPP', PUSH: 'PUSH', SMS: 'SMS', EMAIL: 'EMAIL' } as const;
export type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel];
