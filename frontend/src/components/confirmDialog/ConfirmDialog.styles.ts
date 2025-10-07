// src/pages/Tutors/components/ConfirmDialog/ConfirmDialog.styles.ts

import styled from 'styled-components';
import { Box, Dialog, Button, IconButton } from '@mui/material';

// --- Contêiner Principal ---

export const ModalContainer = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 10px;
    padding: 30px;
    width: 100%;
    max-width: 450px;
  }
`;

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

// --- Elementos de Texto ---

export const Title = styled('h2')`
  margin: 0 0 8px 0;
  font-family: ${({ theme }) => theme.font};
  font-size: ${({ theme }) => theme.fontSize.h4};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Message = styled('p')`
  margin: 0 0 24px 0;
  font-family: ${({ theme }) => theme.font};
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.5;
`;

// --- Contêiner das Ações ---

export const ActionsContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  margin-top: 32px;
`

// --- Estilos dos Botões ---

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
`;

export const TextButton = styled(BaseButton)`
  &.MuiButton-root {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: ${({ theme }) => theme.fontWeight.regular};

    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
  }
`;

export const DangerButton = styled(BaseButton)`
  &.MuiButton-root {
    background-color: #dc3545; // Cor vermelha padrão
    color: #fff;

    &:hover {
      background-color: #c82333;
    }

    // Adapte para as cores do seu tema se preferir
    /* background-color: ${({ theme }) => theme.colors.accentBlue};
    color: ${({ theme }) => theme.colors.accentWhite}; */
  }
`;