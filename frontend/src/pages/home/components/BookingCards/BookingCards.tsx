import * as S from './BookingCards.styles'
import type { Booking } from '../../../bookings/types'

interface BookingCardsProps {
  title: string
  bookings: Booking[]
  emptyMessage: string
  type: 'current' | 'upcoming'
  onBookingClick?: (bookingId: string) => void
}

export function BookingCards({
  title,
  bookings,
  emptyMessage,
  type,
  onBookingClick
}: BookingCardsProps) {
  const formatDateToPortuguese = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleDateString('pt-BR', { month: 'long' })

    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1)

    return `${day} de ${capitalizedMonth}`
  }

  const getDateRangeText = (entrada: string, saida: string) => {
    const entradaFormatted = formatDateToPortuguese(entrada)
    const saidaFormatted = formatDateToPortuguese(saida)

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

  const handleCardClick = (bookingId: string) => {
    if (onBookingClick) {
      onBookingClick(bookingId)
    }
  }

  return (
    <S.BookingSection>
      <S.SectionTitle>{title}</S.SectionTitle>
      <S.CardsContainer>
        {bookings.length === 0 ? (
          <S.EmptyMessage>{emptyMessage}</S.EmptyMessage>
        ) : (
          bookings.map((booking) => (
            <S.BookingCard
              key={booking.id}
              onClick={() => handleCardClick(booking.id)}
            >
              <S.CardContent>
                <S.PetAvatar>
                  {booking.pet_avatar ? (
                    <img src={booking.pet_avatar} alt={booking.pet_name} />
                  ) : (
                    <S.DefaultAvatar>
                      {booking.pet_name.charAt(0).toUpperCase()}
                    </S.DefaultAvatar>
                  )}
                </S.PetAvatar>

                <S.BookingInfo>
                  <S.PetName>{booking.pet_name}</S.PetName>
                  <S.TutorName>Tutor: {booking.tutor_name}</S.TutorName>
                </S.BookingInfo>

                <S.ArrowIcon type={type} />
              </S.CardContent>

              <S.DateWrapper>
                <S.DateTag type={type}>
                  {getDateRangeText(booking.data_entrada, booking.data_saida)}
                </S.DateTag>
              </S.DateWrapper>
            </S.BookingCard>
          ))
        )}
      </S.CardsContainer>
    </S.BookingSection>
  )
}
