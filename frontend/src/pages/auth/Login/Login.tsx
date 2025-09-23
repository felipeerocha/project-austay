import { useState, useEffect } from 'react'
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import * as S from './Login.styles'
import { ForgotPasswordModal } from '../forgotPassword/ForgotPasswordModal'
import { useLoginForm } from './hooks/useLoginForm'

import loginVideo from '../../../assets/login-video.mp4'
import logo from '../../../assets/logo-branca.svg' 

export function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    localStorage.removeItem('authToken')
  }, [])

  const { loading, register, handleSubmit, handleLogin, errors } = useLoginForm()

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <>
      <S.PageContainer>
        <S.VideoSide>
          <S.Logo src={logo} alt="Pethouse Logo" />
          <S.LoginVideo autoPlay muted loop playsInline>
            <source src={loginVideo} type="video/mp4" />
            Seu navegador não suporta vídeos.
          </S.LoginVideo>
        </S.VideoSide>

        <S.FormSide>
          <S.LoginCard>
            <S.Title>Login</S.Title>
            <S.Subtitle>
              Por favor, insira suas credenciais.
            </S.Subtitle>
            <S.Form onSubmit={handleSubmit(handleLogin)}>
              <S.StyledTextField
                label="E-mail"
                placeholder="seu@email.com"
                fullWidth
                disabled={loading}
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <S.StyledTextField
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                placeholder="*********"
                fullWidth
                disabled={loading}
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <S.ForgotPasswordLink onClick={() => setIsModalOpen(true)}>
                Esqueceu a senha?
              </S.ForgotPasswordLink>
              <S.SubmitButton type="submit" fullWidth disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </S.SubmitButton>
            </S.Form>
          </S.LoginCard>
        </S.FormSide>
      </S.PageContainer>

      <ForgotPasswordModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}