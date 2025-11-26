import { useState, useEffect } from 'react'
import api from '../../../services/api'

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
  valor_total: number | null
  observacoes: string
  pago: boolean
  pet: Pet
  tutor: Tutor
}

interface PendingPaymentBooking {
  id: string
  pet_name: string
  tutor_name: string
  data_entrada: string
  data_saida: string
  valor_diaria: number
  valor_total: number
  status: 'pending'
}

export function usePendingPayments() {
  const [pendingPayments, setPendingPayments] = useState<
    PendingPaymentBooking[]
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPendingPayments()
  }, [])

  const fetchPendingPayments = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await api.get<BookingResponse[]>('/estadias/', {
        params: {
          skip: 0,
          limit: 100
        }
      })

      const pending = response.data
        .filter((booking: any) => !booking.pago)
        .map((booking: any): PendingPaymentBooking => {
          const startDate = new Date(booking.data_entrada)
          const endDate = new Date(booking.data_saida)
          const timeDiff = endDate.getTime() - startDate.getTime()
          const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
          const valorTotal =
            typeof booking.valor_total === 'number'
              ? booking.valor_total
              : daysDiff * booking.valor_diaria

          return {
            id: booking.id,
            pet_name: booking.pet.nome,
            tutor_name: booking.tutor.name,
            data_entrada: booking.data_entrada,
            data_saida: booking.data_saida,
            valor_diaria: booking.valor_diaria,
            valor_total: valorTotal,
            status: 'pending'
          }
        })

      setPendingPayments(pending)
    } catch (err: any) {
      console.error('Error fetching pending payments:', err)
      setError('Erro ao carregar os pagamentos pendentes')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    pendingPayments,
    isLoading,
    error,
    refetchPendingPayments: fetchPendingPayments
  }
}
