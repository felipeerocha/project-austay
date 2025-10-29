import { useState } from 'react'
import api from '../../../../../services/api'
import { toastError, toastSuccess } from '../../../../../components/toast/toast'

type PetData = {
  nome: string
  especie: string
  raca: string
  nascimento: string
  sexo: string
  vermifugado: boolean
  vacinado: boolean
  tutor_ids: string[]
}

type UseNewPetProps = {
  onSuccess: () => void
}

export function useNewPet({ onSuccess }: UseNewPetProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCreatePet = async (data: PetData) => {
    setIsLoading(true)
    try {
      await api.post('/pets/', data)
      toastSuccess('Pet criado com sucesso!')
      onSuccess()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail || 'Não foi possível criar o pet.'
      toastError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    handleCreatePet
  }
}
