import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import * as S from './NewTutorModal.styles'
import { useNewTutor } from './../NewTutorModal/hooks/useNewTutor'

type NewTutorModalProps = {
  open: boolean
  onClose: () => void
  onTutorCreated: () => void
}

export function NewTutorModal({
  open,
  onClose,
  onTutorCreated
}: NewTutorModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [cpf, setCpf] = useState('')

  const { isLoading, handleCreateTutor } = useNewTutor({
    onSuccess: () => {
      onClose()
      onTutorCreated()
    }
  })

  useEffect(() => {
    if (open) {
      setName('')
      setPhone('')
      setCpf('')
    }
  }, [open])

  const handleSave = () => {
    if (!name || !phone || !cpf) {
      console.error('Preencha todos os campos.')
      return
    }
    handleCreateTutor({ name, phone, cpf })
  }

  return (
    <S.ModalContainer open={open} onClose={onClose}>
      <S.ModalHeader>
        <h2>Novo tutor</h2>
        <S.CloseButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </S.CloseButton>
      </S.ModalHeader>

      <S.FormContainer component="form" noValidate autoComplete="off">
        <S.StyledTextField
          label="Nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          disabled={isLoading}
        />
        <S.StyledTextField
          label="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          disabled={isLoading}
        />
        <S.StyledTextField
          label="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          fullWidth
          disabled={isLoading}
        />
      </S.FormContainer>

      <S.ActionsContainer>
        <S.TextButton onClick={onClose} disabled={isLoading}>
          Cancelar
        </S.TextButton>
        <S.PrimaryButton onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
        </S.PrimaryButton>
      </S.ActionsContainer>
    </S.ModalContainer>
  )
}
