export const PaymentErrorsCode = {
  REQUIRED_PAYMENT_METHOD: '400',
} as const

export type PaymentErrorsCode = typeof PaymentErrorsCode[keyof typeof PaymentErrorsCode]
