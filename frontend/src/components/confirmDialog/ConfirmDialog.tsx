import * as S from './ConfirmDialog.styles'
import CloseIcon from '@mui/icons-material/Close'

type ConfirmDialogProps = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: React.ReactNode
  isLoading?: boolean
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  message,
  title,
  isLoading = false
}: ConfirmDialogProps) {
  return (
    <S.ModalContainer open={open} onClose={onClose}>
      <S.ModalHeader>
        <S.Title>{title}</S.Title>

        <S.CloseButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </S.CloseButton>
      </S.ModalHeader>
      <S.Message>{message}</S.Message>
      <S.ActionsContainer>
        <S.TextButton onClick={onClose} disabled={isLoading}>
          Cancelar
        </S.TextButton>
        <S.DangerButton onClick={onConfirm} disabled={isLoading}>
          {isLoading ? 'Excluindo...' : 'Excluir'}
        </S.DangerButton>
      </S.ActionsContainer>
    </S.ModalContainer>
  )
}
