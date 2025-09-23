import styled from 'styled-components'
import { TextField, Button } from '@mui/material'
import waveMask from '../../../assets/onda.svg'

export const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

export const VideoSide = styled.div`
  position: relative;

  -webkit-mask-image: url(${waveMask});
  mask-image: url(${waveMask});
  -webkit-mask-size: cover;
  mask-size: cover;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
`

export const LoginVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const Logo = styled.img`
  position: absolute;
  bottom: 40px;
  left: 40px;
  width: 350px;
  z-index: 10;

`

export const FormSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: white;
`

export const LoginCard = styled.div`
  width: 100%;
  max-width: 400px;
  text-align: left;
`

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.font};
  font-size: 3.5rem;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.accentLavender};
  margin: 0 0 1rem 0;
`

export const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.font};
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 3rem;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
`

export const StyledTextField = styled(TextField)`
  .MuiInputLabel-root {
    font-family: ${({ theme }) => theme.font};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.fontSize.small};
    &[data-shrink='true'] {
      transform: translate(14px, -9px) scale(0.75);
      background-color: white;
      padding: 0 4px;
    }
  }
  .MuiInputBase-input {
    font-size: ${({ theme }) => theme.fontSize.small};
    font-family: ${({ theme }) => theme.font};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
  .MuiOutlinedInput-root {
    border-radius: 8px;
    font-family: ${({ theme }) => theme.font};
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.colors.accentLavender};
    }
  }
  .MuiFormHelperText-root {
    font-size: 1.2rem;
    margin-left: 0;
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  }
  .MuiInputAdornment-root .MuiIconButton-root {
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-right: -4px;
    svg {
      font-size: 2rem;
    }
  }
`

export const ForgotPasswordLink = styled.a`
  font-family: ${({ theme }) => theme.font};
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: 1.4rem;
  text-align: right;
  cursor: pointer;
  text-decoration: none;
  margin-top: 0.1rem;
  margin-bottom: 1rem;
  &:hover {
    text-decoration: underline;
  }
`

export const SubmitButton = styled(Button)`
  &.MuiButton-root {
    background-color: ${({ theme }) => theme.colors.accentLavender};
    color: ${({ theme }) => theme.colors.accentWhite};
    font-family: ${({ theme }) => theme.font};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    text-transform: none;
    padding: 12px;
    border-radius: 8px;
    font-size: 1.6rem;
    margin-bottom: 1rem;
    &:hover {
      background-color: #7a6db5;
    }
  }
`
