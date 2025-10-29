/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import api from '../../../../../services/api'

interface Pet {
  id: string
  nome: string
}

interface Tutor {
  id: string
  name: string
}

interface BookingResponse {
  id: string
  data_entrada: string
  data_saida: string
  hora_inicio: string
  hora_final: string
  valor_diaria: number
  observacoes: string
  pago: boolean
  pet: Pet
  tutor: Tutor
}

interface Booking {
  id: string
  pet_name: string
  tutor_name: string
  data_entrada: string
  data_saida: string
  pet_avatar?: string
}

export function useBookings() {
  const [currentBookings, setCurrentBookings] = useState<Booking[]>([])
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await api.get<BookingResponse[]>('/estadias/', {
        params: {
          skip: 0,
          limit: 100
        }
      })

      const allBookings: Booking[] = response.data.map((booking: any) => ({
        id: booking.id,
        pet_name: booking.pet.nome,
        tutor_name: booking.tutor.name,
        data_entrada: booking.data_entrada,
        data_saida: booking.data_saida
      }))

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const current = allBookings.filter((booking) => {
        const checkIn = new Date(booking.data_entrada)
        const checkOut = new Date(booking.data_saida)
        checkIn.setHours(0, 0, 0, 0)
        checkOut.setHours(0, 0, 0, 0)

        return checkIn <= today && checkOut >= today
      })

      const upcoming = allBookings.filter((booking) => {
        const checkIn = new Date(booking.data_entrada)
        checkIn.setHours(0, 0, 0, 0)
        return checkIn > today
      })

      setCurrentBookings(current)
      setUpcomingBookings(upcoming)
    } catch (err: any) {
      console.error('Error fetching bookings:', err)
      setError('Erro ao carregar as estadias')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    currentBookings,
    upcomingBookings,
    isLoading,
    error,
    refetchBookings: fetchBookings
  }
}
