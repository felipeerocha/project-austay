import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  MenuItem,
  TextField
} from '@mui/material'
import styled from 'styled-components'

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

export const Content = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 8px;
  padding-right: 8px;
`

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const FieldLabel = styled.span`
  font-family: ${({ theme }) => theme.font};
  font-size: ${({ theme }) => theme.fontSize.p};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`

export const FieldValue = styled.span`
  font-family: ${({ theme }) => theme.font};
  font-size: ${({ theme }) => theme.fontSize.p};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  text-transform: capitalize;
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

export const StyledSelectItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    font-family: ${({ theme }) => theme.font};
    font-size: ${({ theme }) => theme.fontSize.small};
  }
`

export const ActionsContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 40px;
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
    &:disabled {
      background-color: ${({ theme }) =>
        theme.colors.backgroundMedium} !important;
      color: ${({ theme }) => theme.colors.textSecondary} !important;
    }
  }
`

export const CancelButton = styled(BaseButton)`
  &.MuiButton-root {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};

    &:hover {
      color: ${({ theme }) => theme.colors.textPrimary};
    }
  }
`

export const SaveButton = styled(BaseButton)`
  &.MuiButton-root {
    background-color: ${({ theme }) => theme.colors.accentLavender};
    color: ${({ theme }) => theme.colors.accentWhite};

    &:hover {
      background-color: ${({ theme }) => theme.colors.accentLavenderDuo};
    }
  }
`

export const Spinner = styled(CircularProgress)`
  .MuiCircularProgress-circle {
    stroke: ${({ theme }) => theme.colors.accentWhite};
  }
`

export const ErrorToast = styled(Alert)`
  border-radius: 8px;
  margin-bottom: 4px;
  & .MuiAlert-icon {
    align-self: center;
  }
  &.MuiAlert-root {
    font-family: ${({ theme }) => theme.font};
    font-size: ${({ theme }) => theme.fontSize.small};
  }
`
