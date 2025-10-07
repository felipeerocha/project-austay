import { useState, useEffect, useCallback } from 'react'
import api from '../../../services/api'
import type { Tutor } from '../types'

export function useTutors() {
  const [tutors, setTutors] = useState<Tutor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTutors = useCallback(async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const response = await api.get<Tutor[]>('/tutors/')
      setTutors(response.data)
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
