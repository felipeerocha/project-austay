import { useState, useEffect } from 'react'
import { TutorService } from '../../../services/tutor/tutorService'
import type { Tutor } from '../types'

export function useTutors() {
  const [tutors, setTutors] = useState<Tutor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTutors = async () => {
    try {
      setIsLoading(true)
      setError(null)

      await new Promise((resolve) => setTimeout(resolve, 500))

      const tutorsData = await TutorService.getAllTutors()

      const tutorsWithPets = await Promise.all(
        tutorsData.map(async (tutor: Tutor) => {
          try {
            const pets = await TutorService.getTutorPets(tutor.id)
            return {
              ...tutor,
              pets: pets
            }
          } catch (petsErr) {
            console.warn(`Erro ao buscar pets do tutor ${tutor.id}:`, petsErr)
            return {
              ...tutor,
              pets: []
            }
          }
        })
      )

      setTutors(tutorsWithPets)
    } catch (err) {
      setError('Não foi possível carregar os tutores.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTutors()
  }, [])

  return { tutors, isLoading, error, refetch: fetchTutors }
}
