import { useState } from 'react'
import { BookingService } from '../../../../../services/booking/bookingService'
import { toastError, toastSuccess } from '../../../../../components/toast/toast'
import type { CreateBookingRequestDTO } from '../../../../../services/booking/dto/CreateBookingRequestDTO'

type UseNewBookingProps = {
  onSuccess: () => void
}

export function useNewBooking({ onSuccess }: UseNewBookingProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateBooking = async (data: CreateBookingRequestDTO) => {
    setIsLoading(true)
    try {
      await BookingService.createBooking(data)
      toastSuccess('Estadia criada com sucesso!')
      onSuccess()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage =
        err?.message ||
        err.response?.data?.detail ||
        'Não foi possível criar a estadia.'
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
