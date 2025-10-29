import { ApiError } from '../../utils/ApiError'
import api from '../api'
import type { Pet } from '../../pages/pets/types'
import type { CreatePetRequestDTO } from './dto/CreatePetRequestDTO'

async function createPet(data: CreatePetRequestDTO) {
  try {
    const response = await api.post('/pets/', data)
    return response.data
  } catch (error: any) {
    throw new ApiError(
      error.response?.data?.detail || 'Não foi possível criar o pet'
    )
  }
}

async function getPets(params?: Record<string, unknown>) {
  try {
    const response = await api.get<Pet[]>('/pets/', { params })
    return response.data
  } catch (error: any) {
    throw new ApiError(
      error.response?.data?.detail || 'Não foi possível carregar os pets'
    )
  }
}

async function getPet(petId: string) {
  try {
    const response = await api.get<Pet>(`/pets/${petId}`)
    return response.data
  } catch (error: any) {
    throw new ApiError(
      error.response?.data?.detail || 'Não foi possível carregar o pet'
    )
  }
}

async function updatePet(petId: string, data: Partial<Pet>) {
  try {
    const response = await api.put(`/pets/${petId}`, data)
    return response.data
  } catch (error: any) {
    throw new ApiError(
      error.response?.data?.detail || 'Não foi possível atualizar o pet'
    )
  }
}

async function deletePet(petId: string) {
  try {
    await api.delete(`/pets/${petId}`)
  } catch (error: any) {
    throw new ApiError(
      error.response?.data?.detail || 'Não foi possível excluir o pet'
    )
  }
}

export const PetService = Object.freeze({
  createPet,
  getPets,
  getPet,
  updatePet,
  deletePet
})
