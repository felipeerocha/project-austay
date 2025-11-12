import { useCallback, useEffect, useState } from 'react'
import { RxCaretSort } from 'react-icons/rx'
import type { GetBookingsDTO } from '../../services/payments/dto/GetBookingsDTO'
import type { GetPaymentsDTO } from '../../services/payments/dto/GetPaymentsDTO'
import { PaymentService } from '../../services/payments/paymentService'
import { MoneyFormat } from '../../utils/moneyFormat'
import { PawIcon } from '../tutors/Tutors.styles'
import { PaymentDetailsModal } from './components/PaymentDetailsModal/PaymentDetailsModal'
import * as S from './Payments.styles'
import { PaymentExecuteModal } from './components/PaymentExecuteModal/PaymentExecuteModal'
import { DateFormat } from '../../utils/dateFormat'

export function Payments() {
  const [payments, setPayments] = useState<(GetBookingsDTO & GetPaymentsDTO)[]>(
    []
  )
  const [selectedPayment, setSelectedPayment] = useState<
    (GetBookingsDTO & GetPaymentsDTO) | null
  >(null)
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false)
  const [isOpenExecuteModal, setIsOpenExecuteModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleOpenDetailsModal = (payment: GetBookingsDTO & GetPaymentsDTO) => {
    setSelectedPayment(payment)
    setIsOpenDetailsModal(true)
  }

  const handleOpenExecuteModal = () => {
    setIsOpenDetailsModal(false)
    setIsOpenExecuteModal(true)
  }

  const handleExecutePaymentSave = () => {
    fetchPayments()
  }

  const fetchPayments = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await PaymentService.getPayments()
      setPayments(response)
    } catch (err) {
      console.error(err)
      setError('Não foi possível carregar os pagamentos. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPayments()
  }, [])

  return (
    <>
      <S.Container>
        <S.Header>
          <S.Title>
            <PawIcon /> Pagamentos
          </S.Title>
        </S.Header>

        <S.PaymentsListContainer>
          {isLoading ? (
            <S.LoadingContainer>
              <S.PurpleSpinner size={24} />
            </S.LoadingContainer>
          ) : payments.length === 0 ? (
            <S.EmptyPaymentsContainer>
              Nenhum pagamento registrado.
            </S.EmptyPaymentsContainer>
          ) : error ? (
            <S.EmptyPaymentsContainer>
              <p>{error}</p>
              <S.ReloadButton onClick={fetchPayments}>
                Recarregar
              </S.ReloadButton>
            </S.EmptyPaymentsContainer>
          ) : (
            <>
              <S.PaymentsListHeader>
                <S.SortableHeader>
                  TUTOR
                  <RxCaretSort />
                </S.SortableHeader>
                <S.SortableHeader>
                  PET <RxCaretSort />
                </S.SortableHeader>
                <S.SortableHeader>
                  DATA <RxCaretSort />
                </S.SortableHeader>
                <S.SortableHeader>
                  VALOR <RxCaretSort />
                </S.SortableHeader>
                <S.NonSortableHeader>STATUS</S.NonSortableHeader>
                <S.NonSortableHeader>VER MAIS</S.NonSortableHeader>
              </S.PaymentsListHeader>
              {payments.map((payment) => (
                <S.PaymentsListRow key={payment.id}>
                  <S.PaymentCell>{payment.tutor.name}</S.PaymentCell>
                  <S.PaymentCell>{payment.pet.nome}</S.PaymentCell>
                  <S.PaymentCell>
                    {payment.data_pagamento
                      ? DateFormat.formatDayAndMonth(payment.data_pagamento)
                      : '-'}
                  </S.PaymentCell>
                  <S.PaymentCell>
                    {payment.valor > 0
                      ? MoneyFormat.formatCurrency(payment.valor)
                      : '-'}
                  </S.PaymentCell>
                  <S.BadgeCell>
                    <S.StatusBadge
                      status={payment.status === 'pago' ? 'paid' : 'pending'}
                    >
                      {payment.status}
                    </S.StatusBadge>
                  </S.BadgeCell>
                  <S.IconCell onClick={() => handleOpenDetailsModal(payment)}>
                    <PawIcon />
                  </S.IconCell>
                </S.PaymentsListRow>
              ))}
            </>
          )}
        </S.PaymentsListContainer>
      </S.Container>
      {selectedPayment && (
        <PaymentDetailsModal
          open={isOpenDetailsModal}
          payment={selectedPayment!}
          onClose={() => setIsOpenDetailsModal(false)}
          onPressEdit={handleOpenExecuteModal}
        />
      )}
      {selectedPayment && (
        <PaymentExecuteModal
          open={isOpenExecuteModal}
          payment={selectedPayment!}
          onClose={() => setIsOpenExecuteModal(false)}
          onSave={handleExecutePaymentSave}
        />
      )}
    </>
  )
}
