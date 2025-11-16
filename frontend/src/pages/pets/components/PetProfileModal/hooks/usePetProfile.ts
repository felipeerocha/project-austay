import { useState, useEffect, useCallback } from 'react'
import api from '../../../../../services/api'
import { toastError, toastSuccess } from '../../../../../components/toast/toast'
import type { Pet } from '../../../types'

export function usePetProfile(
  petId: string | null,
  onClose: () => void,
  onDataChanged: () => void
) {
  const [pet, setPet] = useState<Pet | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchPet = useCallback(async () => {
    if (!petId) return
    setIsLoading(true)
    try {
      const response = await api.get(`/pets/${petId}`)
      setPet(response.data)
    } catch (error) {
      toastError('Não foi possível carregar os dados do pet.')
      onClose()
    } finally {
      setIsLoading(false)
    }
  }, [petId, onClose])

  useEffect(() => {
    fetchPet()
  }, [fetchPet])

  const updatePet = async (data: Partial<Pet>) => {
    if (!petId) return
    setIsUpdating(true)
    try {
      await api.put(`/pets/${petId}`, data)
      toastSuccess('Pet atualizado com sucesso!')
      onDataChanged()
    } catch (error) {
      toastError('Erro ao atualizar o pet.')
    } finally {
      setIsUpdating(false)
    }
  }

  const deletePet = async () => {
    if (!petId) return
    setIsDeleting(true)
    try {
      await api.delete(`/pets/${petId}`)
      toastSuccess('Pet excluído com sucesso!')
      onDataChanged()
      onClose()
    } catch (error) {
      toastError('Erro ao excluir o pet.')
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    pet,
    isLoading,
    isUpdating,
    isDeleting,
    updatePet,
    deletePet,
    refetch: fetchPet
  }
}
