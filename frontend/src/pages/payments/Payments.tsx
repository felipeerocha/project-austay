import { useCallback, useEffect, useState } from 'react'
import { RxCaretSort } from 'react-icons/rx'
import { PaymentService, type PaymentRecord } from '../../services/payments/paymentService'
import { MoneyFormat } from '../../utils/moneyFormat'
import { PawIcon } from '../tutors/Tutors.styles'
import { PaymentDetailsModal } from './components/PaymentDetailsModal/PaymentDetailsModal'
import * as S from './Payments.styles'
import { PaymentExecuteModal } from './components/PaymentExecuteModal/PaymentExecuteModal'
import { DateFormat } from '../../utils/dateFormat'

export function Payments() {
  const [payments, setPayments] = useState<PaymentRecord[]>([])
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isExecuteOpen, setIsExecuteOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
  }, [fetchPayments])

  const openDetails = useCallback((payment: Payment) => {
    setSelectedPayment(payment)
    setIsDetailsOpen(true)
  }, [])

  const openExecuteFromDetails = useCallback(() => {
    setIsDetailsOpen(false)
    setIsExecuteOpen(true)
  }, [])

  const handleExecuteSave = useCallback(() => {
    fetchPayments()
  }, [fetchPayments])

  const LoadingView = () => (
    <S.LoadingContainer>
      <S.PurpleSpinner size={24} />
    </S.LoadingContainer>
  )

  const EmptyView = () => (
    <S.EmptyPaymentsContainer>
      {' '}
      Nenhum pagamento registrado.{' '}
    </S.EmptyPaymentsContainer>
  )

  const ErrorView = ({ message }: { message: string }) => (
    <S.EmptyPaymentsContainer>
      <p>{message}</p>
      <S.ReloadButton onClick={fetchPayments}>Recarregar</S.ReloadButton>
    </S.EmptyPaymentsContainer>
  )

  const PaymentsHeader = () => (
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
  )

  const PaymentRow = ({ payment }: { payment: PaymentRecord }) => (
    <S.PaymentsListRow key={payment.id}>
      <S.PaymentCell>{payment.tutor.name}</S.PaymentCell>
      <S.PaymentCell>{payment.pet.nome}</S.PaymentCell>
      <S.PaymentCell>
        {payment.data_pagamento
          ? DateFormat.formatDayAndMonth(payment.data_pagamento)
          : '-'}
      </S.PaymentCell>
      <S.PaymentCell>
        {typeof payment.valor === 'number'
          ? MoneyFormat.formatCurrency(payment.valor)
          : '-'}
      </S.PaymentCell>
      <S.BadgeCell>
        <S.StatusBadge status={payment.status === 'pago' ? 'paid' : 'pending'}>
          {payment.status}
        </S.StatusBadge>
      </S.BadgeCell>
      <S.IconCell onClick={() => openDetails(payment)}>
        <PawIcon />
      </S.IconCell>
    </S.PaymentsListRow>
  )

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
            <LoadingView />
          ) : payments.length === 0 ? (
            <EmptyView />
          ) : error ? (
            <ErrorView message={error} />
          ) : (
            <>
              <PaymentsHeader />
              {payments.map((p) => (
                <PaymentRow key={p.id} payment={p} />
              ))}
            </>
          )}
        </S.PaymentsListContainer>
      </S.Container>

      {selectedPayment && (
        <PaymentDetailsModal
          open={isDetailsOpen}
          payment={selectedPayment}
          onClose={() => setIsDetailsOpen(false)}
          onPressEdit={openExecuteFromDetails}
        />
      )}

      {selectedPayment && (
        <PaymentExecuteModal
          open={isExecuteOpen}
          payment={selectedPayment}
          onClose={() => setIsExecuteOpen(false)}
          onSave={handleExecuteSave}
        />
      )}
    </>
  )
}
