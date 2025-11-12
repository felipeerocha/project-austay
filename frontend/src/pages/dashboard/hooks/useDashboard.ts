import { useState, useEffect } from 'react'
import api from '../../../services/api'
import type { DashboardData, PetHospedado, MoreDaysData, MovimentacoesPorData } from '../types'

export function useDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboard = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await api.get<DashboardData>('/dashboard/')
      setDashboardData(response.data)
    } catch (err: any) {
      console.error('Error fetching dashboard:', err)
      setError('Erro ao carregar dados do dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboard()

    const interval = setInterval(() => {
      fetchDashboard()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return {
    dashboardData,
    isLoading,
    error,
    refetchDashboard: fetchDashboard
  }
}

export function usePetsHospedados() {
  const [petsHospedados, setPetsHospedados] = useState<PetHospedado[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPetsHospedados = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await api.get<PetHospedado[]>('/dashboard/pets-hospedados')
      setPetsHospedados(response.data)
    } catch (err: any) {
      console.error('Error fetching pets hospedados:', err)
      setError('Erro ao carregar pets hospedados')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPetsHospedados()

    const interval = setInterval(() => {
      fetchPetsHospedados()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return {
    petsHospedados,
    isLoading,
    error,
    refetchPetsHospedados: fetchPetsHospedados
  }
}

export function useMoreDays() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMoreDays = async (startDay: number, numDays: number) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await api.get<MoreDaysData>('/dashboard/more-days', {
        params: {
          start_day: startDay,
          num_days: numDays
        }
      })

      return response.data.checkins_checkouts
    } catch (err: any) {
      console.error('Error fetching more days:', err)
      setError('Erro ao carregar mais dias')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    fetchMoreDays,
    isLoading,
    error
  }
}

export function useMovimentacoesPorData() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMovimentacoes = async (data: string) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await api.get<MovimentacoesPorData>(
        `/dashboard/movimentacoes/${data}`
      )

      return response.data
    } catch (err: any) {
      console.error('Error fetching movimentacoes:', err)
      setError('Erro ao carregar movimentações')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    fetchMovimentacoes,
    isLoading,
    error
  }
}
