import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'
import type { GetBookingsDTO } from '../../../../services/payments/dto/GetBookingsDTO'
import type { GetPaymentsDTO } from '../../../../services/payments/dto/GetPaymentsDTO'
import { PaymentService } from '../../../../services/payments/paymentService'
import * as S from './PaymentExecuteModal.styles'

type PaymentExecuteModalProps = {
  open: boolean
  payment: GetBookingsDTO & GetPaymentsDTO
  onClose: () => void
  onSave: () => void
}

const paymentMethods = [
  { id: 1, label: 'Cartão de Crédito' },
  { id: 2, label: 'Cartão de Débito' },
  { id: 3, label: 'Pix' },
  { id: 4, label: 'Dinheiro' }
]

const toInputDate = (d?: string) => {
  if (!d) return ''
  return /^\d{4}-\d{2}-\d{2}/.test(d)
    ? d.slice(0, 10)
    : new Date(d).toISOString().slice(0, 10)
}

export function PaymentExecuteModal(props: PaymentExecuteModalProps) {
  const { open, onClose, onSave } = props
  const [paymentDate, setPaymentDate] = useState('')
  const [paymentMethod, setPaymentMethod] = useState(
    'Selecione um meio de pagamento'
  )
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPaymentMethod(event.target.value as string)
  }

  const isFormIncomplete =
    !paymentDate || paymentMethod === 'Selecione um meio de pagamento'

  const handleSave = async () => {
    try {
      if (!isSaving) {
        setIsSaving(true)
        await PaymentService.executePayment(props.payment.id, {
          status: true,
          meio_pagamento: paymentMethod,
          data_pagamento: toInputDate(paymentDate)
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
    const initialDate = toInputDate(new Date().toISOString())

    setPaymentDate(initialDate)
    setPaymentMethod('Selecione um meio de pagamento')
  }, [open, props.payment])

  if (!open) return null

  return (
    <>
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
              onChange={(e) => setPaymentDate(e.target.value)}
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true
                },
                htmlInput: {
                  min: new Date().toISOString().split('T')[0]
                }
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
              placeholder="Selecione um meio de pagamento"
              sx={{
                '& .MuiInputBase-root': {
                  height: '42.4px',
                  display: 'flex',
                  alignItems: 'center'
                }
              }}
            >
              {paymentMethods.map((method) => (
                <S.StyledSelectItem key={method.id} value={method.label}>
                  {method.label}
                </S.StyledSelectItem>
              ))}
            </S.StyledSelect>
          </S.FieldContainer>
        </S.Content>
        <S.ActionsContainer>
          <S.CancelButton onClick={onClose}>Cancelar</S.CancelButton>
          <S.SaveButton disabled={isFormIncomplete} onClick={handleSave}>
            {isSaving ? <S.Spinner size={24} /> : 'Salvar'}
          </S.SaveButton>
        </S.ActionsContainer>
      </S.ModalContainer>
    </>
  )
}
