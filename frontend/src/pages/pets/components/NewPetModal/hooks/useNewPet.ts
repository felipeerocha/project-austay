import { useState } from 'react'
import { PetService } from '../../../../../services/pet/petService'
import { toastError, toastSuccess } from '../../../../../components/toast/toast'
import type { CreatePetRequestDTO } from '../../../../../services/pet/dto/CreatePetRequestDTO'

type UseNewPetProps = {
  onSuccess: () => void
}

export function useNewPet({ onSuccess }: UseNewPetProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCreatePet = async (data: CreatePetRequestDTO) => {
    setIsLoading(true)
    try {
      await PetService.createPet(data)
      toastSuccess('Pet criado com sucesso!')
      onSuccess()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err?.message || 'Não foi possível criar o pet.'
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
