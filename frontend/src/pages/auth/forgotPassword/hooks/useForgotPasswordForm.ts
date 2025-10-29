import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toastError, toastSuccess } from '../../../../components/toast/toast'
import { AuthService } from '../../../../services/auth/authService'

const forgotPasswordSchema = z
  .object({
    email: z.string().min(1, 'Obrigatório'),
    otp: z.string().length(6, 'O código deve ter 6 dígitos'),
    newPassword: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(1, 'A confirmação é obrigatória')
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword']
  })

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export function useForgotPasswordForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [otpDigits, setOtpDigits] = useState(new Array(6).fill(''))

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur'
  })

  const resetStates = () => {
    form.reset()
    setStep(1)
    setLoading(false)
    setUserId(null)
    setOtpDigits(new Array(6).fill(''))
  }

  const handleClose = () => {
    onClose()
    resetStates()
  }

  const handleSendEmail = async () => {
    const isValid = await form.trigger('email')
    if (!isValid) return

    setLoading(true)
    const email = form.getValues('email')
    try {
      const { user_id, successMessage } = await AuthService.forgotPassword({
        email
      })
      setUserId(user_id)
      toastSuccess(successMessage)
      setStep(2)
    } catch (err: any) {
      toastError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    const isValid = await form.trigger('otp')
    if (!isValid) return
    if (!userId) {
      toastError(
        'Ocorreu um erro. Por favor, tente o primeiro passo novamente.'
      )
      return
    }

    setLoading(true)
    const code = form.getValues('otp')
    try {
      const { successMessage } = await AuthService.verifyCode({
        user_id: userId,
        code
      })
      toastSuccess(successMessage)
      setStep(3)
    } catch (err: any) {
      toastError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async () => {
    const isValid = await form.trigger(['newPassword', 'confirmPassword'])
    if (!isValid) return
    if (!userId) {
      toastError(
        'Ocorreu um erro. Por favor, tente o primeiro passo novamente.'
      )
      return
    }

    setLoading(true)
    const { otp, newPassword } = form.getValues()
    try {
      const { successMessage } = await AuthService.resetPassword({
        user_id: userId,
        token: otp,
        new_password: newPassword
      })
      toastSuccess(successMessage)
      setTimeout(handleClose)
    } catch (err: any) {
      toastError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOtpDigits = [...otpDigits]
    newOtpDigits[index] = e.target.value
    setOtpDigits(newOtpDigits)
    const combinedOtp = newOtpDigits.join('')
    form.setValue('otp', combinedOtp, { shouldValidate: true })

    if (e.target.nextSibling && e.target.value) {
      ;(e.target.nextSibling as HTMLInputElement).focus()
    }
  }

  return {
    step,
    loading,
    form,
    otpDigits,
    handleClose,
    handleSendEmail,
    handleVerifyCode,
    handleResetPassword,
    handleOtpChange
  }
}
