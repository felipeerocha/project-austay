import { ApiError } from '../../utils/ApiError'
import api from '../api'
import type { CreateTutorRequestDTO } from './dto/CreateTutorRequestDTO'
import type { Tutor } from '../../pages/tutors/types'

async function createTutor(data: CreateTutorRequestDTO) {
  try {
    const response = await api.post('/tutors', data)
    return response.data
  } catch (error: any) {
    throw new ApiError(
      error.response?.data?.detail || 'Erro ao cadastrar tutor'
    )
  }
}

async function getAllTutors(): Promise<Tutor[]> {
  try {
    const response = await api.get('/tutors/')
    return response.data
  } catch (error: any) {
    throw new ApiError(
      error.response?.data?.detail || 'Erro ao carregar tutores'
    )
  }
}

async function getTutorPets(tutorId: string) {
  try {
    const response = await api.get(`/tutors/${tutorId}/pets`)
    return response.data || []
  } catch (error: any) {
    throw new ApiError(
      error.response?.data?.detail || 'Erro ao carregar pets do tutor'
    )
  }
}

async function getTutor(tutorId: string): Promise<Tutor> {
  try {
    const response = await api.get(`/tutors/${tutorId}`)
    return response.data
  } catch (error: any) {
    throw new ApiError(
      error.response?.data?.detail ||
        'Não foi possível carregar os dados do tutor'
    )
  }
}

async function updateTutor(tutorId: string, data: Partial<Tutor>) {
  try {
    const response = await api.put(`/tutors/${tutorId}`, data)
    return response.data
  } catch (error: any) {
    throw new ApiError(
      error.response?.data?.detail || 'Erro ao atualizar o tutor'
    )
  }
}

async function deleteTutor(tutorId: string) {
  try {
    await api.delete(`/tutors/${tutorId}`)
  } catch (error: any) {
    throw new ApiError(
      error.response?.data?.detail || 'Erro ao excluir o tutor'
    )
  }
}

export const TutorService = Object.freeze({
  createTutor,
  getTutor,
  getAllTutors,
  getTutorPets,
  updateTutor,
  deleteTutor
})
