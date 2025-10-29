import styled from 'styled-components'
import {
  TextField,
  Button,
  Box,
  Dialog,
  IconButton,
  MenuItem
} from '@mui/material'
import type { BoxProps } from '@mui/material'
import { FaPlus } from 'react-icons/fa'

export const ModalContainer = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 10px;
    padding: 40px 60px 60px;
    width: 100%;
    max-width: 580px;
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
      margin: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.accentLavender};
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #7a6db5;
    }
  }

  .MuiDialogContent-root {
    overflow: auto;
    padding: 0;
    flex: 1;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: #f8f8f8;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.accentLavender}80;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.colors.accentLavender};
    }
  }
`

export const DateDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const ModalHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-shrink: 0;

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
  overflow: auto;
  flex: 1;
  padding-right: 8px;
  margin-right: -8px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f8f8f8;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.accentLavender}80;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.accentLavender};
  }

  &:not(:hover)::-webkit-scrollbar-thumb {
    background: transparent;
  }
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

    &[type='date']::-webkit-calendar-picker-indicator {
      filter: invert(48%) sepia(13%) saturate(3207%) hue-rotate(230deg)
        brightness(95%) contrast(80%);
      cursor: pointer;
    }
  }

  .MuiOutlinedInput-root {
    border-radius: 8px;
    font-family: ${({ theme }) => theme.font};

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.colors.accentLavender};
    }
  }
`

export const CurrencyTextField = styled(StyledTextField)`
  .MuiOutlinedInput-root {
    position: relative;

    &::before {
      content: 'R$';
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: ${({ theme }) => theme.colors.accentLavender};
      font-family: ${({ theme }) => theme.font};
      font-size: ${({ theme }) => theme.fontSize.small};
      font-weight: ${({ theme }) => theme.fontWeight.medium};
      z-index: 1;
    }
  }

  .MuiInputBase-input {
    padding-left: 40px !important;
  }

  &.MuiTextField-root .MuiOutlinedInput-root.Mui-disabled::before {
    color: #666;
  }
`

export const PetSelectionContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const StyledSelect = styled(StyledTextField)`
  flex-grow: 1;

  .MuiInputBase-root {
    height: 42.4px;
    display: flex;
    align-items: center;
  }

  .MuiInputLabel-root {
    top: 50%;
    transform: translate(14px, -50%);

    &.Mui-focused,
    &.MuiFormLabel-filled {
      transform: translate(14px, -9px) scale(0.75);
      background-color: white;
      padding: 0 4px;
    }
  }

  .MuiSelect-select {
    display: flex;
    align-items: center;
  }
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

    &:hover {
      box-shadow: none;
    }
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

export const SecondaryButton = styled(PrimaryButton)``

export const TextButton = styled(BaseButton)`
  &.MuiButton-root {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};

    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
`

export const ActionsContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  margin-top: 32px;
  flex-shrink: 0;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

export const StyledMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    font-family: ${({ theme }) => theme.font};
    font-size: ${({ theme }) => theme.fontSize.small};
  }
`

export const NewPetButton = styled.button`
  background-color: ${({ theme }) => theme.colors.textTertiary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1.2rem 2.4rem;
  font-size: ${({ theme }) => theme.fontSize.p};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.9rem;

  &:hover {
    background-color: rgba(68, 130, 159, 1);
  }
`

export const FieldLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.font};
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const PlusIcon = styled(FaPlus)`
  color: white;
  font-size: 1.2rem;
  flex-shrink: 0;
  transition: transform 0.2s;
`
