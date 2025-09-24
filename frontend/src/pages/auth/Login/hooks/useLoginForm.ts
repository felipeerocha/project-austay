import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import api from '../../../../services/api'
import { toastError, toastSuccess } from '../../../../components/toast/toast'

const loginSchema = z.object({
  email: z.string().min(1, 'Obrigatório'),
  password: z.string().min(1, 'Obrigatório')
})

type LoginFormData = z.infer<typeof loginSchema>

export function useLoginForm() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const handleLogin = async (data: LoginFormData) => {
    setLoading(true)
    try {
      const response = await api.post('/auth/token', {
        email: data.email,
        password: data.password
      })

      localStorage.setItem('authToken', response.data.access_token)
      toastSuccess('Login realizado com sucesso!')
      navigate('/home')
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail || 'E-mail ou senha inválidos.'
      toastError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    register,
    handleSubmit,
    handleLogin,
    errors
  }
}
