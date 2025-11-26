import api from './api'
import type { Stay, UpdateStayPayload } from '../types/stay'

type ListParams = {
  skip?: number
  limit?: number
}

const DEFAULT_LIMIT = 200

async function list(params: ListParams = {}) {
  const response = await api.get<Stay[]>('/estadias/', {
    params: {
      skip: params.skip ?? 0,
      limit: params.limit ?? DEFAULT_LIMIT
    }
  })

  return response.data
}

async function getOne(id: string) {
  const response = await api.get<Stay>(`/estadias/${id}`)
  return response.data
}

async function update(id: string, payload: UpdateStayPayload) {
  const response = await api.put<Stay>(`/estadias/${id}`, payload)
  return response.data
}

async function remove(id: string) {
  await api.delete(`/estadias/${id}`)
}

export const stayService = {
  list,
  getOne,
  update,
  remove
}

