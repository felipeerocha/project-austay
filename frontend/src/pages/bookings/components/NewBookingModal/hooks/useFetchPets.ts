import { useState, useEffect } from 'react'
import { PetService } from '../../../../../services/pet/petService'
import type { Pet } from '../../../../pets/types'

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPets = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await PetService.getPets({ skip: 0, limit: 100 })
      setPets(data)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err?.message || 'Não foi possível carregar os pets.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPets()
  }, [])

  return {
    pets,
    isLoading,
    error,
    refetchPets: fetchPets
  }
}
