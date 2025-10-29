import { useState } from 'react'
import api from '../../../../../services/api'
import { toastError, toastSuccess } from '../../../../../components/toast/toast'
import type { BookingData } from '../../../../home/types'

type UseNewBookingProps = {
  onSuccess: () => void
}

export function useNewBooking({ onSuccess }: UseNewBookingProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateBooking = async (data: BookingData) => {
    setIsLoading(true)
    try {
      await api.post('/estadias/', data)
      toastSuccess('Estadia criada com sucesso!')
      onSuccess()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail || 'Não foi possível criar a estadia.'
      toastError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    handleCreateBooking
  }
}
