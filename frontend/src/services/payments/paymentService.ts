import { ApiError } from '../../utils/ApiError'
import api from '../api'
import type { GetBookingsDTO } from './dto/GetBookingsDTO'
import type { GetPaymentsDTO } from './dto/GetPaymentsDTO'

async function getPayments(): Promise<(GetBookingsDTO & GetPaymentsDTO)[]> {
  try {
    const [bookings, payments] = await Promise.all([
      getBookingsList(),
      getPaymentsList()
    ])

    const merged = bookings.map((booking) => {
      const payment = payments.find((p) => p.estadia_id === booking.id)

      return {
        ...booking,
        ...(payment ?? {
          data_pagamento: '-',
          valor: 0,
          status: booking.pago ? 'pago' : 'pendente',
          estadia_id: booking.id,
          id: ''
        })
      }
    })

    return merged
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

export const PaymentService = Object.freeze({
  getPayments
})
