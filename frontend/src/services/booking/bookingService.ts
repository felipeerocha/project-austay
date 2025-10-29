import type { CreateBookingRequestDTO } from './dto/CreateBookingRequestDTO'
import { ApiError } from '../../utils/ApiError'
import api from '../api'

type Params = Record<string, unknown>

async function createBooking(data: CreateBookingRequestDTO) {
  try {
    const response = await api.post('/estadias/', data)
    return response.data
  } catch (error: any) {
    throw new ApiError(
      error.response?.data?.detail || 'Não foi possível criar a estadia'
    )
  }
}

async function getBookings(params?: Params) {
  try {
    const response = await api.get('/estadias/', { params })
    return response.data
  } catch (error: any) {
    throw new ApiError(
      error.response?.data?.detail || 'Erro ao carregar as estadias'
    )
  }
}

async function getBooking(bookingId: string) {
  try {
    const response = await api.get(`/estadias/${bookingId}`)
    return response.data
  } catch (error: any) {
    throw new ApiError(
      error.response?.data?.detail || 'Erro ao carregar a estadia'
    )
  }
}

export const BookingService = Object.freeze({
  createBooking,
  getBookings,
  getBooking
})
