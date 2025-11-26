import styled, { css } from 'styled-components'

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(4, 4, 5, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1300;
  padding: 2rem;
`

export const ModalContent = styled.div`
  width: min(620px, 100%);
  max-height: 90vh;
  background: ${({ theme }) => theme.colors.accentWhite};
  border-radius: 28px;
  box-shadow: 0 32px 60px rgba(17, 24, 39, 0.35);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: ${({ theme }) => theme.font};
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const ModalHeader = styled.header`
  padding: 2.4rem 2.8rem 1.6rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 1px solid rgba(134, 105, 217, 0.15);
`

export const HeaderTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

export const ModalTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.h4};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const ModalSubtitle = styled.span`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
    transform: scale(1.05);
  }
`

export const Tabs = styled.div`
  padding: 1.6rem 2.8rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`

export const TabButton = styled.button<{ $active: boolean }>`
  border: none;
  border-radius: 14px;
  padding: 1.2rem;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
  background: ${({ theme }) => theme.colors.backgroundMedium};
  color: ${({ theme }) => theme.colors.textSecondary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  text-align: center;

  ${({ $active, theme }) =>
    $active &&
    css`
      background: ${theme.colors.accentLavender};
      color: ${theme.colors.accentWhite};
      box-shadow: 0 10px 20px rgba(134, 105, 217, 0.35);
    `}

  &:hover {
    transform: translateY(-1px);
  }
`

export const ModalBody = styled.div`
  padding: 2.4rem 2.8rem 3rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  font-size: ${({ theme }) => theme.fontSize.p};
  line-height: 1.5;
`

export const SectionCard = styled.section`
  background: ${({ theme }) => theme.colors.backgroundMedium};
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(134, 105, 217, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

export const SectionTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.h5};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.2rem;
`

export const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`

export const SummaryLabel = styled.span`
  font-size: 1.2rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 0.05em;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`

export const SummaryValue = styled.span`
  font-size: ${({ theme }) => theme.fontSize.p};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.6rem;
`

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`

export const Input = styled.input`
  border: none;
  border-radius: 14px;
  padding: 1.2rem 1.4rem;
  font-size: ${({ theme }) => theme.fontSize.p};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.accentWhite};
  box-shadow: inset 0 0 0 1px rgba(134, 105, 217, 0.15);
  transition: box-shadow 0.2s ease;
  font-family: ${({ theme }) => theme.font};

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.accentLavender};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const TextArea = styled.textarea`
  border: none;
  border-radius: 14px;
  padding: 1.2rem 1.4rem;
  font-size: ${({ theme }) => theme.fontSize.p};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: ${({ theme }) => theme.colors.accentWhite};
  min-height: 100px;
  resize: none;
  box-shadow: inset 0 0 0 1px rgba(134, 105, 217, 0.15);
  transition: box-shadow 0.2s ease;
  font-family: ${({ theme }) => theme.font};

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.accentLavender};
  }
`

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ToggleLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.p};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.font};
`

export const Toggle = styled.label`
  position: relative;
  width: 52px;
  height: 28px;
  display: inline-block;
`

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${({ theme }) => theme.colors.accentGreen};
  }

  &:checked + span::before {
    transform: translateX(24px);
  }
`

export const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.textSecondary};
  transition: 0.2s;
  border-radius: 999px;

  &::before {
    position: absolute;
    content: '';
    height: 22px;
    width: 22px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.2s;
    border-radius: 50%;
  }
`

export const ActionsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
`

const baseButton = css`
  border: none;
  border-radius: 14px;
  padding: 1.2rem 2.4rem;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }
`

export const GhostButton = styled.button`
  ${baseButton};
  background: rgba(134, 105, 217, 0.1);
  color: ${({ theme }) => theme.colors.textTertiary};
`

export const PrimaryButton = styled.button`
  ${baseButton};
  background: ${({ theme }) => theme.colors.accentLavender};
  color: ${({ theme }) => theme.colors.accentWhite};
  box-shadow: 0 10px 20px rgba(134, 105, 217, 0.35);
`

export const DeleteCard = styled.section`
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid rgba(200, 35, 51, 0.3);
  background: rgba(200, 35, 51, 0.06);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`

export const DeleteTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.h5};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.accentRed};
`

export const DeleteText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.p};
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.4;
  font-family: ${({ theme }) => theme.font};
`

export const DeleteActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

export const DangerButton = styled.button`
  ${baseButton};
  background: ${({ theme }) => theme.colors.accentRed};
  color: ${({ theme }) => theme.colors.accentWhite};
  box-shadow: 0 10px 20px rgba(200, 35, 51, 0.35);
`

export const OutlineButton = styled.button`
  ${baseButton};
  background: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  box-shadow: inset 0 0 0 1px rgba(28, 28, 30, 0.2);
`

export const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  font-size: ${({ theme }) => theme.fontSize.p};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.font};
`

