import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { toastError, toastSuccess } from '../../../../components/toast/toast'
import { AuthService } from '../../../../services/auth/authService'
import { AuthStorage } from '../../../../storage/authStorage'

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
      const {access_token} = await AuthService.signIn(data)
      AuthStorage.saveToken(access_token)
      toastSuccess('Login realizado com sucesso!')
      navigate('/home')
    } catch (err: any) {
      toastError(err.message)
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
