import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import * as S from './NewTutorModal.styles'
import { useNewTutor } from './../NewTutorModal/hooks/useNewTutor'
import { toastError } from '../../../../components/toast/toast'

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

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 2) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    if (digits.length <= 10)
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }

  const formatCpf = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
    if (digits.length <= 9)
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(
      6,
      9
    )}-${digits.slice(9)}`
  }

  useEffect(() => {
    if (open) {
      setName('')
      setPhone('')
      setCpf('')
    }
  }, [open])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
  }

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCpf(e.target.value)
    setCpf(formatted)
  }

  const handleSave = () => {
    if (!name || !phone || !cpf) {
      toastError('Preencha todos os campos.')
      console.error('Preencha todos os campos.')
      return
    }
    handleCreateTutor({
      name,
      phone: phone.replace(/\D/g, ''),
      cpf: cpf.replace(/\D/g, '')
    })
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
          onChange={handlePhoneChange}
          fullWidth
          disabled={isLoading}
          inputProps={{ maxLength: 15, inputMode: 'numeric' }}
        />
        <S.StyledTextField
          label="CPF"
          value={cpf}
          onChange={handleCpfChange}
          fullWidth
          disabled={isLoading}
          inputProps={{ maxLength: 14, inputMode: 'numeric' }}
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
