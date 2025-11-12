import CloseIcon from '@mui/icons-material/Close'
import type { GetBookingsDTO } from '../../../../services/payments/dto/GetBookingsDTO'
import type { GetPaymentsDTO } from '../../../../services/payments/dto/GetPaymentsDTO'
import * as S from './PaymentDetailsModal.styles'
import { MoneyFormat } from '../../../../utils/moneyFormat'
import { DateFormat } from '../../../../utils/dateFormat'
import React from 'react'

type PaymentDetailsModalProps = {
  open: boolean
  payment: GetBookingsDTO & GetPaymentsDTO
  onClose: () => void
  onPressEdit: () => void
}

export function PaymentDetailsModal({
  open,
  payment,
  onClose,
  onPressEdit
}: PaymentDetailsModalProps) {
  if (!open) return null

  const Field: React.FC<{ label: string; children: React.ReactNode }> = ({
    label,
    children
  }) => (
    <S.FieldContainer>
      <S.FieldLabel>{label}</S.FieldLabel>
      <S.FieldValue>{children}</S.FieldValue>
    </S.FieldContainer>
  )

  const tutorName = payment?.tutor?.name ?? '-'
  const petName = payment?.pet?.nome ?? '-'
  const entrada = payment?.data_entrada
    ? DateFormat.formatDayAndMonth(payment.data_entrada)
    : '-'
  const saida = payment?.data_saida
    ? DateFormat.formatDayAndMonth(payment.data_saida)
    : '-'
  const valor =
    typeof payment?.valor !== 'undefined'
      ? MoneyFormat.formatCurrency(payment.valor)
      : '-'
  const status = payment?.status ?? '-'
  const dataPagamento = payment?.data_pagamento
    ? DateFormat.formatDayAndMonth(payment.data_pagamento)
    : '-'

  const isPending = status === 'pendente'

  return (
    <S.ModalContainer open={open} onClose={onClose}>
      <S.ModalHeader>
        <h2>Descrição pagamento</h2>
        <S.CloseButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </S.CloseButton>
      </S.ModalHeader>

      <S.Content>
        <Field label="Tutor">{tutorName}</Field>
        <Field label="Pet">{petName}</Field>
        <Field label="Estadia">
          {entrada} - {saida}
        </Field>
        <Field label="Valor">{valor}</Field>
        <Field label="Status">{status}</Field>
        <Field label="Data do pagamento">{dataPagamento}</Field>
      </S.Content>

      {isPending && (
        <S.ActionsContainer onClick={onPressEdit}>
          <S.EditButton>Registrar pagamento</S.EditButton>
        </S.ActionsContainer>
      )}
    </S.ModalContainer>
  )
}
