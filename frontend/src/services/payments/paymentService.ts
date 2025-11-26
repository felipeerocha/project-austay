import { ApiError } from '../../utils/ApiError'
import api from '../api'
import type { ExecutePaymentRequestDTO } from './dto/ExecutePaymentRequestDTO'
import type { GetBookingsDTO } from './dto/GetBookingsDTO'
import type { GetPaymentsDTO } from './dto/GetPaymentsDTO'

export type PaymentRecord = GetBookingsDTO & {
  estadia_id: string
  payment_id: string | null
  valor: number
  status: 'pago' | 'pendente'
  isPaid: boolean
  data_pagamento: string | null
  meio_pagamento: string | null
}

async function getPayments(): Promise<PaymentRecord[]> {
  try {
    const [bookings, payments] = await Promise.all([
      getBookingsList(),
      getPaymentsList()
    ])

    return bookings.map((booking) => {
      const bookingTotal =
        typeof booking.valor_total === 'number'
          ? booking.valor_total
          : calculateFallbackTotal(booking.data_entrada, booking.data_saida, booking.valor_diaria)
      const payment = payments.find((p) => p.estadia_id === booking.id)
      const isPaid = Boolean(payment?.status ?? booking.pago)
      const amount =
        typeof payment?.valor === 'number'
          ? payment?.valor
          : bookingTotal

      return {
        ...booking,
        estadia_id: booking.id,
        payment_id: payment?.id ?? null,
        valor: amount,
        status: isPaid ? 'pago' : 'pendente',
        isPaid,
        data_pagamento: payment?.data_pagamento ?? null,
        meio_pagamento: payment?.meio_pagamento ?? null
      }
    })
  } catch (error: any) {
    throw new ApiError('Não foi possível recuperar os pagamentos')
  }
}

async function getBookingsList(): Promise<GetBookingsDTO[]> {
  try {
    const response = await api.get('/estadias/')
    return response.data
  } catch (error: any) {
    throw new ApiError('Não foi possível recuperar os pagamentos')
  }
}

async function getPaymentsList(): Promise<GetPaymentsDTO[]> {
  try {
    const response = await api.get('/pagamentos/')
    return response.data
  } catch (error: any) {
    throw new ApiError('Não foi possível recuperar os pagamentos')
  }
}

async function executePayment(estadiaId: string, paymentData: ExecutePaymentRequestDTO) {
  try {
    await api.post('/pagamentos/', {
      estadia_id: estadiaId,
      ...paymentData
    })
  } catch (error: any) {
    throw new ApiError('Não foi possível executar o pagamento')
  }
}

export const PaymentService = Object.freeze({
  getPayments,
  executePayment
})

function calculateFallbackTotal(
  entrada: string,
  saida: string | null,
  valorDiaria: number
) {
  if (!saida) return valorDiaria
  const start = new Date(entrada)
  const end = new Date(saida)
  const diff =
    Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
  return Math.max(1, diff) * valorDiaria
}
