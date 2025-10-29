import { useState } from 'react'
import { toastError, toastSuccess } from '../../../../../components/toast/toast'
import type { CreateTutorRequestDTO } from '../../../../../services/tutor/dto/CreateTutorRequestDTO'
import { TutorService } from '../../../../../services/tutor/tutorService'

type TutorData = CreateTutorRequestDTO

type UseNewTutorProps = {
  onSuccess: () => void
}

export function useNewTutor({ onSuccess }: UseNewTutorProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateTutor = async (data: TutorData) => {
    setIsLoading(true)
    try {
      await TutorService.createTutor(data)
      toastSuccess('Tutor cadastrado com sucesso!')
      onSuccess()
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail || 'Não foi possível cadastrar o tutor.'
      toastError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    handleCreateTutor
  }
}
