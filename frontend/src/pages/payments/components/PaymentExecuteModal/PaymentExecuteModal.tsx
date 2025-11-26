import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'
import { PaymentService, type PaymentRecord } from '../../../../services/payments/paymentService'
import * as S from './PaymentExecuteModal.styles'
import { DateFormat } from '../../../../utils/dateFormat'

type PaymentExecuteModalProps = {
  open: boolean
  payment: PaymentRecord
  onClose: () => void
  onSave: () => void
}

const PAYMENT_METHODS = [
  { id: 1, label: 'Cartão de Crédito' },
  { id: 2, label: 'Cartão de Débito' },
  { id: 3, label: 'Pix' },
  { id: 4, label: 'Dinheiro' }
]

const DEFAULT_PAYMENT_METHOD_LABEL = 'Selecione um meio de pagamento'

export function PaymentExecuteModal(props: PaymentExecuteModalProps) {
  const { open, onClose, onSave } = props
  const [paymentDate, setPaymentDate] = useState('')
  const [paymentMethod, setPaymentMethod] = useState(
    DEFAULT_PAYMENT_METHOD_LABEL
  )
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPaymentMethod(event.target.value as string)
  }

  const isFormIncomplete =
    !paymentDate || paymentMethod === DEFAULT_PAYMENT_METHOD_LABEL

  const handleSave = async () => {
    try {
      if (!isSaving) {
        setIsSaving(true)
        await PaymentService.executePayment(props.payment.estadia_id, {
          meio_pagamento: paymentMethod,
          data_pagamento: paymentDate
        })

        onSave()
        onClose()
      }
    } catch (error) {
      console.error(error)
      setErrorMessage('Erro ao registrar o pagamento. Tente novamente.')
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    const prefillingDate = DateFormat.getTodayDate()

    setPaymentDate(prefillingDate)
    setPaymentMethod(DEFAULT_PAYMENT_METHOD_LABEL)
  }, [open, props.payment])

  if (!open) return null

  return (
    <S.ModalContainer open={open} onClose={onClose}>
      <S.ModalHeader>
        <h2>Registrar pagamento</h2>
        <S.CloseButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </S.CloseButton>
      </S.ModalHeader>

      <S.Content>
        {errorMessage && (
          <S.ErrorToast
            severity="error"
            variant="filled"
            onClose={() => setErrorMessage('')}
          >
            {errorMessage}
          </S.ErrorToast>
        )}

        <S.FieldContainer>
          <S.FieldLabel>Data do pagamento</S.FieldLabel>
          <S.StyledTextField
            type="date"
            value={paymentDate}
            onChange={(e) => {
              setPaymentDate(e.target.value)
            }}
            fullWidth
            slotProps={{
              inputLabel: { shrink: true },
              htmlInput: { min: new Date().toISOString().split('T')[0] }
            }}
          />
        </S.FieldContainer>

        <S.FieldContainer>
          <S.FieldLabel>Meio de pagamento</S.FieldLabel>
          <S.StyledSelect
            select
            value={paymentMethod}
            onChange={handleChange}
            required
            placeholder={DEFAULT_PAYMENT_METHOD_LABEL}
            sx={{
              '& .MuiInputBase-root': {
                height: '42.4px',
                display: 'flex',
                alignItems: 'center'
              }
            }}
          >
            {PAYMENT_METHODS.map((method) => (
              <S.StyledSelectItem key={method.id} value={method.label}>
                {method.label}
              </S.StyledSelectItem>
            ))}
          </S.StyledSelect>
        </S.FieldContainer>
      </S.Content>

      <S.ActionsContainer>
        <S.CancelButton onClick={onClose} aria-label="Cancelar">
          Cancelar
        </S.CancelButton>
        <S.SaveButton
          disabled={isFormIncomplete || isSaving}
          onClick={handleSave}
          aria-label="Salvar"
        >
          {isSaving ? <S.Spinner size={24} /> : 'Salvar'}
        </S.SaveButton>
      </S.ActionsContainer>
    </S.ModalContainer>
  )
}
