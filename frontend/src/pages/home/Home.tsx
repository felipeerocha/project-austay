/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePendingPayments } from './hooks/useFetchPendingPayment'
import { useBookings } from './components/BookingCards/hooks/useFetchBookings'
import * as S from './Home.styles'
import { NewBookingModal } from '../bookings/components/NewBookingModal/NewBookingModal'
import { PawIcon } from '../tutors/Tutors.styles'
import { RxCaretSort } from 'react-icons/rx'
import { BookingCards } from './components/BookingCards/BookingCards'
import { useState } from 'react'

type SortField = 'tutor' | 'pet' | 'date' | 'value'
type SortDirection = 'asc' | 'desc'

export function Home() {
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false)
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const {
    currentBookings,
    upcomingBookings,
    isLoading: bookingsLoading,
    error: bookingsError,
    refetchBookings
  } = useBookings()

  const {
    pendingPayments,
    isLoading: paymentsLoading,
    error: paymentsError,
    refetchPendingPayments
  } = usePendingPayments()

  const handleToPayments = () => {
    window.location.href = '/payments'
  }

  const handleBookingCreated = () => {
    refetchBookings()
    refetchPendingPayments()
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleDateString('pt-BR', { month: 'long' })
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1)
    return `${day} de ${capitalizedMonth}`
  }

  const getDateRangeText = (entrada: string, saida: string) => {
    const entradaFormatted = formatDate(entrada)
    const saidaFormatted = formatDate(saida)

    const entradaDate = new Date(entrada)
    const saidaDate = new Date(saida)

    if (
      entradaDate.getMonth() === saidaDate.getMonth() &&
      entradaDate.getFullYear() === saidaDate.getFullYear()
    ) {
      const month = entradaDate.toLocaleDateString('pt-BR', { month: 'long' })
      const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1)
      return `${entradaDate.getDate()} a ${saidaDate.getDate()} de ${capitalizedMonth}`
    } else {
      return `${entradaFormatted} - ${saidaFormatted}`
    }
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getSortedPayments = () => {
    if (!pendingPayments) return []

    return [...pendingPayments].sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sortField) {
        case 'tutor':
          aValue = a.tutor_name.toLowerCase()
          bValue = b.tutor_name.toLowerCase()
          break
        case 'pet':
          aValue = a.pet_name.toLowerCase()
          bValue = b.pet_name.toLowerCase()
          break
        case 'date':
          aValue = new Date(a.data_entrada).getTime()
          bValue = new Date(b.data_entrada).getTime()
          break
        case 'value':
          aValue = a.valor_total
          bValue = b.valor_total
          break
        default:
          return 0
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }

  const renderPendingPaymentsList = () => {
    if (paymentsLoading) {
      return (
        <S.LoadingContainer>
          <S.PurpleSpinner size={24} />
        </S.LoadingContainer>
      )
    }

    if (paymentsError) {
      return (
        <S.StatusMessage>
          Ocorreu um erro ao buscar os pagamentos pendentes.
        </S.StatusMessage>
      )
    }

    if (!pendingPayments || pendingPayments.length === 0) {
      return (
        <S.StatusMessage>Nenhum pagamento pendente encontrado.</S.StatusMessage>
      )
    }

    const sortedPayments = getSortedPayments()

    return (
      <>
        <S.PaymentsListHeader>
          <S.SortableHeader onClick={() => handleSort('tutor')}>
            TUTOR
            <RxCaretSort />
          </S.SortableHeader>
          <S.SortableHeader onClick={() => handleSort('pet')}>
            PET <RxCaretSort />
          </S.SortableHeader>
          <S.SortableHeader onClick={() => handleSort('date')}>
            DATA <RxCaretSort />
          </S.SortableHeader>
          <S.SortableHeader onClick={() => handleSort('value')}>
            VALOR <RxCaretSort />
          </S.SortableHeader>
          <S.NonSortableHeader>STATUS</S.NonSortableHeader>
        </S.PaymentsListHeader>
        {sortedPayments.map((payment) => (
          <S.PaymentsListRow key={payment.id}>
            <S.PaymentCell>{payment.tutor_name}</S.PaymentCell>
            <S.PaymentCell>{payment.pet_name}</S.PaymentCell>
            <S.PaymentCell>
              {getDateRangeText(payment.data_entrada, payment.data_saida)}
            </S.PaymentCell>
            <S.PaymentCell>{formatCurrency(payment.valor_total)}</S.PaymentCell>
            <S.PaymentCell>
              <S.StatusBadge status={payment.status}>Pendente</S.StatusBadge>
            </S.PaymentCell>
          </S.PaymentsListRow>
        ))}
      </>
    )
  }

  return (
    <>
      <S.Container>
        <S.Header>
          <S.Title>
            <PawIcon /> Resumo do seu hotel
          </S.Title>
          <S.NewBookingButton onClick={() => setIsNewBookingModalOpen(true)}>
            Agendar <S.PlusIcon />
          </S.NewBookingButton>
        </S.Header>

        <div style={{ marginBottom: '3rem' }}>
          {bookingsLoading ? (
            <S.LoadingContainer>
              <S.PurpleSpinner size={24} />
            </S.LoadingContainer>
          ) : bookingsError ? (
            <S.StatusMessage>{bookingsError}</S.StatusMessage>
          ) : (
            <>
              <BookingCards
                title="Estadias Atuais"
                bookings={currentBookings}
                emptyMessage="Nenhuma estadia em andamento no momento"
                type="current"
              />

              <BookingCards
                title="Próximas Estadias"
                bookings={upcomingBookings}
                emptyMessage="Nenhuma estadia agendada para o futuro"
                type="upcoming"
              />
            </>
          )}
        </div>
      </S.Container>

      <S.Container>
        <S.Header>
          <S.Title>
            <PawIcon /> Pagamentos pendentes
          </S.Title>
          <S.NewBookingButton onClick={handleToPayments}>
            Ver pagamentos <S.ArrowIcon />
          </S.NewBookingButton>
        </S.Header>

        <S.PaymentsListContainer>
          {renderPendingPaymentsList()}
        </S.PaymentsListContainer>
      </S.Container>

      <NewBookingModal
        open={isNewBookingModalOpen}
        onClose={() => setIsNewBookingModalOpen(false)}
        onBookingCreated={handleBookingCreated}
      />
    </>
  )
}
