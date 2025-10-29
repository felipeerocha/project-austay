import { ApiError } from '../../utils/ApiError'
import api from '../api'
import type { ForgotPasswordRequestDTO } from './dto/ForgotPasswordRequestDTO'
import type { ForgotPasswordResponseDTO } from './dto/ForgotPasswordResponseDTO'
import type { ResetPasswordRequestDTO } from './dto/ResetPasswordRequestDTO'
import type { ResetPasswordResponseDTO } from './dto/ResetPasswordResponseDTO'
import type { SignInResponseDTO } from './dto/SignInResponseDTO'
import type { SignInRequestDTO } from './dto/SignInResquestDTO'
import type { VerifyCodeRequestDTO } from './dto/VerifyCodeRequestDTO'
import type { VerifyCodeResponseDTO } from './dto/VerifyCodeResponseDTO'

async function signIn(data: SignInRequestDTO): Promise<SignInResponseDTO> {
  try {
    const response = await api.post('/auth/token', data)
    return response.data
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.detail || 'E-mail ou senha inválidos.'
    throw new ApiError(errorMessage)
  }
}

async function forgotPassword(
  data: ForgotPasswordRequestDTO
): Promise<ForgotPasswordResponseDTO> {
  try {
    const response = await api.post('/auth/forgot-password', data)
    return {
      user_id: response.data.user_id,
      successMessage: response.data.msg || 'Código enviado com sucesso!'
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.detail || 'E-mail não encontrado.'
    throw new ApiError(errorMessage)
  }
}

async function verifyCode(
  data: VerifyCodeRequestDTO
): Promise<VerifyCodeResponseDTO> {
  try {
    const response = await api.post('/auth/verify-token', {
      user_id: data.user_id,
      token: data.code
    })
    return {
      successMessage: response.data.detail || 'Código verificado com sucesso!'
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.detail || 'Código inválido ou expirado.'
    throw new ApiError(errorMessage)
  }
}

async function resetPassword(
  data: ResetPasswordRequestDTO
): Promise<ResetPasswordResponseDTO> {
  try {
    const response = await api.post('/auth/reset-password', data)
    return {
      successMessage: response.data.detail || 'Senha redefinida com sucesso!'
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.detail || 'Não foi possível redefinir a senha.'
    throw new ApiError(errorMessage)
  }
}

export const AuthService = Object.freeze({
  signIn,
  forgotPassword,
  verifyCode,
  resetPassword
})
