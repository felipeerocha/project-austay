import { useState, useEffect, useCallback } from 'react'
import { toastError, toastSuccess } from '../../../../../components/toast/toast'
import { TutorService } from '../../../../../services/tutor/tutorService'
import type { Tutor } from '../../../types'

export function useTutorProfile(
  tutorId: string | null,
  onClose: () => void,
  onDataChanged: () => void
) {
  const [tutor, setTutor] = useState<Tutor | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchTutor = useCallback(async () => {
    if (!tutorId) return
    setIsLoading(true)
    try {
      const data = await TutorService.getTutor(tutorId)
      setTutor(data)
    } catch (error) {
      toastError('Não foi possível carregar os dados do tutor.')
      onClose()
    } finally {
      setIsLoading(false)
    }
  }, [tutorId, onClose])

  useEffect(() => {
    fetchTutor()
  }, [fetchTutor])

  const updateTutor = async (data: Partial<Tutor>) => {
    if (!tutorId) return
    setIsUpdating(true)
    try {
      await TutorService.updateTutor(tutorId, data)
      toastSuccess('Tutor atualizado com sucesso!')
      onDataChanged()
    } catch (error) {
      toastError('Erro ao atualizar o tutor.')
    } finally {
      setIsUpdating(false)
    }
  }

  const deleteTutor = async () => {
    if (!tutorId) return
    setIsDeleting(true)
    try {
      await TutorService.deleteTutor(tutorId)
      toastSuccess('Tutor excluído com sucesso!')
      onDataChanged()
      onClose()
    } catch (error) {
      toastError('Erro ao excluir o tutor.')
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    tutor,
    isLoading,
    isUpdating,
    isDeleting,
    updateTutor,
    deleteTutor,
    refetch: fetchTutor
  }
}
