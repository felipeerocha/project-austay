import CloseIcon from '@mui/icons-material/Close'
import type { GetBookingsDTO } from '../../../../services/payments/dto/GetBookingsDTO'
import type { GetPaymentsDTO } from '../../../../services/payments/dto/GetPaymentsDTO'
import * as S from './PaymentDetailsModal.styles'
import { MoneyFormat } from '../../../../utils/moneyFormat'
import { DateFormat } from '../../../../utils/dateFormat'

type PaymentDetailsModalProps = {
  open: boolean
  payment: GetBookingsDTO & GetPaymentsDTO
  onClose: () => void
  onPressEdit: () => void
}

export function PaymentDetailsModal(props: PaymentDetailsModalProps) {
  const { open, onClose, onPressEdit } = props

  if (!open) return null

  return (
    <>
      <S.ModalContainer open={open} onClose={onClose}>
        <S.ModalHeader>
          <h2>Descrição pagamento</h2>
          <S.CloseButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </S.CloseButton>
        </S.ModalHeader>
        <S.Content>
          <S.FieldContainer>
            <S.FieldLabel>Tutor</S.FieldLabel>
            <S.FieldValue>{props.payment.tutor.name}</S.FieldValue>
          </S.FieldContainer>
          <S.FieldContainer>
            <S.FieldLabel>Pet</S.FieldLabel>
            <S.FieldValue>{props.payment.pet.nome}</S.FieldValue>
          </S.FieldContainer>
          <S.FieldContainer>
            <S.FieldLabel>Estadia</S.FieldLabel>
            <S.FieldValue>
              {DateFormat.formatDayAndMonth(props.payment.data_entrada)} -{' '}
              {DateFormat.formatDayAndMonth(props.payment.data_saida)}
            </S.FieldValue>
          </S.FieldContainer>
          <S.FieldContainer>
            <S.FieldLabel>Valor</S.FieldLabel>
            <S.FieldValue>
              {MoneyFormat.formatCurrency(props.payment.valor)}
            </S.FieldValue>
          </S.FieldContainer>
          <S.FieldContainer>
            <S.FieldLabel>Status</S.FieldLabel>
            <S.FieldValue>{props.payment.status}</S.FieldValue>
          </S.FieldContainer>
          <S.FieldContainer>
            <S.FieldLabel>Data do pagamento</S.FieldLabel>
            <S.FieldValue>
              {props.payment.data_pagamento
                ? DateFormat.formatDayAndMonth(props.payment.data_pagamento)
                : '-'}
            </S.FieldValue>
          </S.FieldContainer>
        </S.Content>
        {props.payment.status === 'pendente' && (
          <S.ActionsContainer onClick={onPressEdit}>
            <S.EditButton>Registrar pagamento</S.EditButton>
          </S.ActionsContainer>
        )}
      </S.ModalContainer>
    </>
  )
}
