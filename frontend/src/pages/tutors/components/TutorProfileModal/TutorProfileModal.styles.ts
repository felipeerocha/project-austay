import styled from 'styled-components'
import {
  TextField,
  Button,
  Box,
  Dialog,
  IconButton,
  type BoxProps
} from '@mui/material'

export const ModalContainer = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 10px;
    padding: 30px;
    width: 100%;
    max-width: 550px;
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

export const FormContainer = styled(Box)<
  BoxProps & React.ComponentProps<'form'>
>`
  display: flex;
  flex-direction: column;
  gap: 24px;
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
`

const BaseButton = styled(Button)`
  &.MuiButton-root {
    font-family: ${({ theme }) => theme.font};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    font-size: 1.4rem;
    text-transform: none;
    border-radius: 8px;
    box-shadow: none;
    padding: 10px 24px;

    &:hover {
      box-shadow: none;
    }
  }
`

// --- Novos Estilos ---

export const PetsSection = styled(Box)`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-family: ${({ theme }) => theme.font};
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    color: ${({ theme }) => theme.colors.accentBlue};
  }
`

export const PetsList = styled(Box)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  max-height: 150px;
  overflow-y: auto;
  padding: 8px;
`

export const PetItem = styled(Box)`
  padding: 12px 16px;
  font-family: ${({ theme }) => theme.font};
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.textPrimary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`
export const ActionsContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  margin-top: 32px;
`

export const DangerButton = styled(BaseButton)`
  &.MuiButton-root {
    background-color: ${({ theme }) => theme.colors.accentRed};
        color: ${({ theme }) => theme.colors.accentWhite};


    &:hover {
      background-color: ${({ theme }) => theme.colors.accentRedDuo};
    }
  }
`

export const EditButton = styled(BaseButton)`
  &.MuiButton-root {
    background-color: ${({ theme }) => theme.colors.accentBlue};
    color: ${({ theme }) => theme.colors.accentWhite};

    &:hover {
      background-color: ${({ theme }) => theme.colors.accentGreenDuo};
    }
  }
`

export const PrimaryButton = styled(EditButton)``
