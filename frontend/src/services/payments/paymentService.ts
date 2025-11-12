import { ApiError } from '../../utils/ApiError'
import api from '../api'
import type { ExecutePaymentRequestDTO } from './dto/ExecutePaymentRequestDTO'
import type { GetBookingsDTO } from './dto/GetBookingsDTO'
import type { GetPaymentsDTO } from './dto/GetPaymentsDTO'

async function getPayments(): Promise<(GetBookingsDTO & GetPaymentsDTO)[]> {
  try {
    const [bookings, payments] = await Promise.all([
      getBookingsList(),
      getPaymentsList()
    ])

    const merged = bookings.map((booking) => {
      const payment = payments.find((p) => p.estadia_id === booking.id)!

      return {
        ...booking,
        ...payment,
        status:
          payment.status === 'true' || booking.pago === true
            ? 'pago'
            : 'pendente'
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

async function executePayment(
  paymentId: string,
  paymentData: ExecutePaymentRequestDTO
) {
  try {
    await api.put(`/pagamentos/${paymentId}`, paymentData)
  } catch (error: any) {
    throw new ApiError('Não foi possível executar o pagamento')
  }
}

export const PaymentService = Object.freeze({
  getPayments,
  executePayment
})
