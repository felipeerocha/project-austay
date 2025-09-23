import styled from 'styled-components'
import { Box, TextField, Button, Dialog, IconButton } from '@mui/material'

export const ModalContainer = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 10px;
    padding: 50px;
    width: 100%;
    max-width: 600px;
  }
`

export const ModalHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h2 {
    margin: 0;
    font-family: ${({ theme }) => theme.font};
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`

export const CloseButton = styled(IconButton)`
  padding: 4px;
`

export const ModalWrapper = styled(Box)`
  text-align: center;
`

export const Illustration = styled.img`
  width: 200px;
  margin: 0rem 0 2rem 0;
`

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.font};
  font-size: ${({ theme }) => theme.fontSize.h3};
  color: ${({ theme }) => theme.colors.accentLavender};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};

  margin: 0 0 1rem 0;
`

export const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.font};
  font-size: ${({ theme }) => theme.fontSize.p};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 2rem 3rem 3rem 4.5rem;
  max-width: 500px;
  line-height: 1.5;
  text-align: left;
`

export const StyledTextField = styled(TextField).attrs(() => ({}))`
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
    font-size: ${({ theme }) => theme.fontSize.small}; /* ou px direto */
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
`

export const OtpContainer = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`

export const OtpInput = styled.input`
  width: 40px;
  height: 48px;
  text-align: center;
  font-size: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accentLavender};
  }
`

export const ActionsContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  margin-top: 32px;
`

const BaseButton = styled(Button)`
  &.MuiButton-root {
    font-family: ${({ theme }) => theme.font};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-size: 1.4rem;
    text-transform: none;
    border-radius: 8px;
    box-shadow: none;
    padding: 10px 24px;
  }
`

export const PrimaryButton = styled(BaseButton)`
  &.MuiButton-root {
    background-color: ${({ theme }) => theme.colors.accentLavender};
    color: ${({ theme }) => theme.colors.accentWhite};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    &:hover {
      background-color: #7a6db5;
    }
  }
`

export const TextButton = styled(BaseButton)`
  &.MuiButton-root {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
`
export const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 1.4rem;
  margin-top: 0.5rem;
`;
