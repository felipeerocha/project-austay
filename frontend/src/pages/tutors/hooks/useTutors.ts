import { useCallback, useEffect, useState } from 'react'
import { TutorService } from '../../../services/tutor/tutorService'
import type { Tutor } from '../types'

export function useTutors() {
  const [tutors, setTutors] = useState<Tutor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTutors = useCallback(async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const data = await TutorService.getAllTutors()
      setTutors(data)
      setError(null)
    } catch (err) {
      setError('Não foi possível carregar os tutores.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTutors()
  }, [fetchTutors])

  return { tutors, isLoading, error, refetchTutors: fetchTutors }
}
