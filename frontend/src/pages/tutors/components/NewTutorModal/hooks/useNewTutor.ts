import { useState } from 'react'
import api from '../../../../../services/api'
import { toastError, toastSuccess } from '../../../../../components/toast/toast'

type TutorData = {
  name: string
  phone: string
  cpf: string
}

type UseNewTutorProps = {
  onSuccess: () => void
}

export function useNewTutor({ onSuccess }: UseNewTutorProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateTutor = async (data: TutorData) => {
    setIsLoading(true)
    try {
      await api.post('/tutors/', data)
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
