import { useCallback, useEffect, useState } from 'react'
import { RxCaretSort } from 'react-icons/rx'
import type { GetBookingsDTO } from '../../services/payments/dto/GetBookingsDTO'
import type { GetPaymentsDTO } from '../../services/payments/dto/GetPaymentsDTO'
import { PawIcon } from '../tutors/Tutors.styles'
import * as S from './Payments.styles'
import { PaymentService } from '../../services/payments/paymentService'
import { MoneyFormat } from '../../utils/moneyFormat'

export function Payments() {
  const [payments, setPayments] = useState<(GetBookingsDTO & GetPaymentsDTO)[]>(
    []
  )
  const [isLoading, setIsLoading] = useState(true)

  const fetchPayments = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await PaymentService.getPayments()
      console.log(response)
      setPayments(response)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPayments()
  }, [])

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          <PawIcon /> Pagamentos pendentes
        </S.Title>
      </S.Header>

      <S.PaymentsListContainer>
        {isLoading ? (
          <S.LoadingContainer>
            <S.PurpleSpinner size={24} />
          </S.LoadingContainer>
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
              <S.IconHeader>VER MAIS</S.IconHeader>
            </S.PaymentsListHeader>
            {payments.map((payment) => (
              <S.PaymentsListRow key={payment.id}>
                <S.PaymentCell>{payment.tutor.name}</S.PaymentCell>
                <S.PaymentCell>{payment.pet.nome}</S.PaymentCell>
                <S.PaymentCell>{payment.data_pagamento}</S.PaymentCell>
                <S.PaymentCell>
                  {payment.valor > 0
                    ? MoneyFormat.formatCurrency(payment.valor)
                    : '-'}
                </S.PaymentCell>
                <S.PaymentCell>
                  <S.StatusBadge status="paid">{payment.status}</S.StatusBadge>
                </S.PaymentCell>
                <S.IconCell>
                  <PawIcon />
                </S.IconCell>
              </S.PaymentsListRow>
            ))}
          </>
        )}
      </S.PaymentsListContainer>
    </S.Container>
  )
}
