import { useCallback, useEffect, useMemo, useState } from 'react'
import { CircularProgress } from '@mui/material'
import { FaPlus } from 'react-icons/fa'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { FiEdit2, FiSearch, FiTrash2 } from 'react-icons/fi'
import * as S from './Bookings.styles'
import { PawIcon } from '../tutors/Tutors.styles'
import { NewBookingModal } from './components/NewBookingModal/NewBookingModal'
import type { Booking } from './types'
import { stayService } from '../../services/stayService'
import { StayManagerModal } from '../../components/modal'

type EventColor = {
  background: string
  border: string
}

type CalendarEvent = {
  id: string
  label: string
  petName: string
  tutorName: string
  startDate: Date
  endDate: Date
  color: EventColor
}

type Week = {
  days: Date[]
  start: Date
  end: Date
}

type WeekSegment = {
  segmentId: string
  id: string
  label: string
  petName: string
  tutorName: string
  startCol: number
  span: number
  lane: number
  color: EventColor
  isTruncatedStart: boolean
  isTruncatedEnd: boolean
}

type StayFilter = 'all' | 'active' | 'upcoming' | 'finished'

const stayFilterOptions: Array<{ value: StayFilter; label: string }> = [
  { value: 'all', label: 'Todas' },
  { value: 'active', label: 'Em andamento' },
  { value: 'upcoming', label: 'Agendadas' },
  { value: 'finished', label: 'Finalizadas' }
]

const statusLabels: Record<Exclude<StayFilter, 'all'>, string> = {
  active: 'Em andamento',
  upcoming: 'Agendada',
  finished: 'Finalizada'
}

const weekdayLabels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

const colorPalette = [
  '#8669D9',
  '#54B3CE',
  '#7BC16C',
  '#D080CC',
  '#F0C35A',
  '#55A8F5',
  '#F27F7F',
  '#70C0A3',
  '#B795F4',
  '#FFA27D'
]

const adjustColor = (hex: string, amount: number) => {
  const sanitized = hex.replace('#', '')
  const hasAlpha = sanitized.length === 8
  const base = hasAlpha ? sanitized.slice(0, 6) : sanitized
  const alpha = hasAlpha ? sanitized.slice(6) : ''
  const numeric = parseInt(base, 16)
  const r = Math.min(255, Math.max(0, (numeric >> 16) + amount))
  const g = Math.min(255, Math.max(0, ((numeric >> 8) & 0xff) + amount))
  const b = Math.min(255, Math.max(0, (numeric & 0xff) + amount))
  const updated =
    '#' +
    ((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16)
      .slice(1)
      .toUpperCase()
  return updated + alpha
}

const parseDate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const addMonths = (date: Date, amount: number) => {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

const addDays = (date: Date, amount: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + amount)
  return result
}

const getStartOfWeek = (date: Date) => {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const day = result.getDay()
  const diff = day === 0 ? -6 : 1 - day
  result.setDate(result.getDate() + diff)
  return result
}

const getEndOfWeek = (date: Date) => {
  const result = getStartOfWeek(date)
  result.setDate(result.getDate() + 6)
  return result
}

const differenceInCalendarDays = (a: Date, b: Date) => {
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
  return Math.round((utcA - utcB) / 86_400_000)
}

const isSameDay = (a: Date, b: Date) => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

const formatMonthLabel = (date: Date) => {
  const name = monthNames[date.getMonth()]
  return `${name} de ${date.getFullYear()}`
}

const buildEventColor = (index: number) => {
  const color = colorPalette[index % colorPalette.length]
  const border = adjustColor(color, -25)
  return { background: color, border }
}

const formatDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

const getStayStatus = (booking: Booking): Exclude<StayFilter, 'all'> => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = parseDate(booking.data_entrada)
  const end = parseDate(booking.data_saida)

  if (today < start) return 'upcoming'
  if (today > end) return 'finished'
  return 'active'
}

const formatShortDateLabel = (date: Date) =>
  date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit'
  })

const formatRangeLabel = (booking: Booking) => {
  const entrada = formatShortDateLabel(parseDate(booking.data_entrada))
  const saida = formatShortDateLabel(parseDate(booking.data_saida))
  return `${entrada} • ${saida}`
}

const formatTimeRange = (booking: Booking) => {
  const start = booking.hora_inicio ? booking.hora_inicio.slice(0, 5) : '--'
  const end = booking.hora_final ? booking.hora_final.slice(0, 5) : '--'
  return `${start} às ${end}`
}

const ensureValorTotal = (
  entrada: string,
  saida: string | null,
  valorDiaria: number
) => {
  if (!saida) {
    return valorDiaria
  }

  const start = parseDate(entrada)
  const end = parseDate(saida)
  const days = Math.max(1, differenceInCalendarDays(end, start) + 1)
  return days * valorDiaria
}

const formatCurrencyValue = (value?: number) => {
  if (typeof value !== 'number') return '—'
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

const formatPaymentLabel = (paid?: boolean) => (paid ? 'Pago' : 'Pendente')

export function Bookings() {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<StayFilter>('all')
  const [isManagerModalOpen, setIsManagerModalOpen] = useState(false)
  const [selectedStayId, setSelectedStayId] = useState<string | null>(null)
  const [stayModalMode, setStayModalMode] = useState<'edit' | 'delete'>('edit')
  const [activeView, setActiveView] = useState<'calendar' | 'list'>('calendar')

  const fetchBookings = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await stayService.list({ limit: 300 })

      const mapped: Booking[] = response.map((item) => ({
        id: item.id,
        pet_name: item.pet.nome,
        tutor_name: item.tutor.name,
        data_entrada: item.data_entrada,
        data_saida: item.data_saida ?? item.data_entrada,
        hora_inicio: item.hora_inicio,
        hora_final: item.hora_final,
        valor_diaria: item.valor_diaria,
        valor_total:
          typeof item.valor_total === 'number'
            ? item.valor_total
            : ensureValorTotal(item.data_entrada, item.data_saida, item.valor_diaria),
        observacoes: item.observacoes,
        pago: item.pago
      }))

      setBookings(mapped)
    } catch (err) {
      console.error(err)
      setError('Não foi possível carregar os agendamentos.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, -1))
  }

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1))
  }

  const handleBookingCreated = () => {
    fetchBookings()
  }

  const handleOpenStayManager = (stayId: string, mode: 'edit' | 'delete' = 'edit') => {
    setSelectedStayId(stayId)
    setStayModalMode(mode)
    setIsManagerModalOpen(true)
  }

  const handleCloseStayManager = () => {
    setIsManagerModalOpen(false)
    setSelectedStayId(null)
  }

  const handleStayManagerSuccess = () => {
    fetchBookings()
  }

  const weeks = useMemo<Week[]>(() => {
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const lastDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    )
    const start = getStartOfWeek(firstDay)
    const end = getEndOfWeek(lastDay)
    const result: Week[] = []
    let cursor = new Date(start)

    while (cursor <= end) {
      const days: Date[] = []
      for (let i = 0; i < 7; i += 1) {
        days.push(new Date(cursor))
        cursor = addDays(cursor, 1)
      }
      result.push({
        days,
        start: days[0],
        end: days[6]
      })
    }

    return result
  }, [currentMonth])

  const filteredBookings = useMemo(() => {
    const normalized = searchTerm ? normalizeText(searchTerm) : ''

    return bookings.filter((booking) => {
      if (normalized) {
        const haystack = normalizeText(`${booking.pet_name} ${booking.tutor_name}`)
        if (!haystack.includes(normalized)) {
          return false
        }
      }

      if (statusFilter !== 'all' && getStayStatus(booking) !== statusFilter) {
        return false
      }

      return true
    })
  }, [bookings, searchTerm, statusFilter])

  const checkinsByDay = useMemo(() => {
    const map = new Map<string, number>()
    bookings.forEach((booking) => {
      const current = map.get(booking.data_entrada) ?? 0
      map.set(booking.data_entrada, current + 1)
    })
    return map
  }, [bookings])

  const events = useMemo<CalendarEvent[]>(() => {
    const colorAssignments = new Map<string, number>()
    let colorIndex = 0

    return bookings.map((booking) => {
      if (!colorAssignments.has(booking.pet_name)) {
        colorAssignments.set(booking.pet_name, colorIndex)
        colorIndex += 1
      }

      const assignmentIndex = colorAssignments.get(booking.pet_name) ?? 0
      const color = buildEventColor(assignmentIndex)

      return {
        id: booking.id,
        label: `Estadia ${booking.pet_name}`,
        petName: booking.pet_name,
        tutorName: booking.tutor_name,
        startDate: parseDate(booking.data_entrada),
        endDate: parseDate(booking.data_saida),
        color
      }
    })
  }, [bookings])

  const weekLayouts = useMemo(() => {
    return weeks.map<{
      segments: WeekSegment[]
      laneCount: number
    }>((week) => {
      const segments: WeekSegment[] = []

      events.forEach((event) => {
        if (event.endDate < week.start || event.startDate > week.end) {
          return
        }

        const effectiveStart =
          event.startDate > week.start ? event.startDate : week.start
        const effectiveEnd = event.endDate < week.end ? event.endDate : week.end
        const startCol = differenceInCalendarDays(effectiveStart, week.start)
        const span =
          differenceInCalendarDays(effectiveEnd, effectiveStart) + 1
        const segment: WeekSegment = {
          segmentId: `${event.id}-${week.start.toISOString()}-${startCol}`,
          id: event.id,
          label: event.label,
          petName: event.petName,
          tutorName: event.tutorName,
          startCol,
          span,
          lane: 0,
          color: event.color,
          isTruncatedStart: event.startDate < week.start,
          isTruncatedEnd: event.endDate > week.end
        }

        segments.push(segment)
      })

      const sorted = segments.sort((a, b) => {
        if (a.startCol === b.startCol) {
          return b.span - a.span
        }
        return a.startCol - b.startCol
      })

      const laneEnds: number[] = []
      const arranged = sorted.map((segment) => {
        const endCol = segment.startCol + segment.span - 1
        let laneIndex = laneEnds.findIndex((laneEnd) => laneEnd < segment.startCol)

        if (laneIndex === -1) {
          laneIndex = laneEnds.length
          laneEnds.push(endCol)
        } else {
          laneEnds[laneIndex] = endCol
        }

        return {
          ...segment,
          lane: laneIndex
        }
      })

      return {
        segments: arranged,
        laneCount: laneEnds.length
      }
    })
  }, [weeks, events])

  const today = useMemo(() => new Date(), [])

  return (
    <>
      <S.Container>
        <S.Header>
          <S.Title>
            <PawIcon />
            Agendamentos
          </S.Title>
          <S.ScheduleButton onClick={() => setIsModalOpen(true)}>
            Agendar
            <FaPlus />
          </S.ScheduleButton>
        </S.Header>

        <S.ViewTabs role="tablist" aria-label="Alternar entre calendário e lista">
          <S.ViewTabButton
            type="button"
            role="tab"
            aria-selected={activeView === 'calendar'}
            aria-controls="calendar-view"
            $active={activeView === 'calendar'}
            onClick={() => setActiveView('calendar')}
          >
            Calendário
          </S.ViewTabButton>
          <S.ViewTabButton
            type="button"
            role="tab"
            aria-selected={activeView === 'list'}
            aria-controls="list-view"
            $active={activeView === 'list'}
            onClick={() => setActiveView('list')}
          >
            Estadias
          </S.ViewTabButton>
        </S.ViewTabs>

        {activeView === 'calendar' ? (
          <S.CalendarCard id="calendar-view">
            <S.CalendarHeader>
              <S.MonthButton
                type="button"
                onClick={handlePrevMonth}
                aria-label="Mês anterior"
              >
                <MdKeyboardArrowLeft />
              </S.MonthButton>
              <S.MonthLabel>{formatMonthLabel(currentMonth)}</S.MonthLabel>
              <S.MonthButton
                type="button"
                onClick={handleNextMonth}
                aria-label="Próximo mês"
              >
                <MdKeyboardArrowRight />
              </S.MonthButton>
            </S.CalendarHeader>

            <S.DayNamesRow>
              {weekdayLabels.map((label) => (
                <S.DayName key={label}>{label}</S.DayName>
              ))}
            </S.DayNamesRow>

            <S.WeeksContainer>
              {weeks.map((week, index) => {
                const layout = weekLayouts[index]
                const segments = layout?.segments ?? []
                const laneCount = layout?.laneCount ?? 0

                return (
                  <S.WeekRow key={week.start.toISOString()} $laneCount={laneCount}>
                    {week.days.map((day) => {
                      const key = formatDateKey(day)
                      const dayCheckins = checkinsByDay.get(key) ?? 0

                      return (
                        <S.DayCell
                          key={day.toISOString()}
                          $isCurrentMonth={day.getMonth() === currentMonth.getMonth()}
                          $isToday={isSameDay(day, today)}
                        >
                          <S.DayNumber
                            $isCurrentMonth={day.getMonth() === currentMonth.getMonth()}
                          >
                            {day.getDate()}
                          </S.DayNumber>
                          {dayCheckins >= 2 && (
                            <S.DayBadge>{`${dayCheckins} check-ins`}</S.DayBadge>
                          )}
                        </S.DayCell>
                      )
                    })}

                    {segments.length > 0 && (
                      <S.EventsLayer $laneCount={laneCount}>
                        {segments.map((segment) => (
                          <S.EventPill
                            key={segment.segmentId}
                            $background={segment.color.background}
                            $border={segment.color.border}
                            $isTruncatedStart={segment.isTruncatedStart}
                            $isTruncatedEnd={segment.isTruncatedEnd}
                            style={{
                              gridColumn: `${segment.startCol + 1} / span ${segment.span}`,
                              gridRow: `${segment.lane + 1}`
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={`Editar ${segment.label}`}
                            onClick={() => handleOpenStayManager(segment.id, 'edit')}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault()
                                handleOpenStayManager(segment.id, 'edit')
                              }
                            }}
                          >
                            {segment.label}
                          </S.EventPill>
                        ))}
                      </S.EventsLayer>
                    )}
                  </S.WeekRow>
                )
              })}
            </S.WeeksContainer>

            {isLoading && (
              <S.EmptyState>
                <CircularProgress size={24} sx={{ color: '#8669D9' }} />
                Carregando agendamentos...
              </S.EmptyState>
            )}

            {!isLoading && error && <S.EmptyState>{error}</S.EmptyState>}

            {!isLoading && !error && bookings.length === 0 && (
              <S.EmptyState>Sem agendamentos para este período.</S.EmptyState>
            )}
          </S.CalendarCard>
        ) : (
          <S.StayListCard id="list-view">
            <S.ListHeader>
              <S.ListTitle>
                <h2>Listagem de estadias</h2>
                <span>{filteredBookings.length} {filteredBookings.length === 1 ? 'item' : 'itens'}</span>
              </S.ListTitle>
              <S.SearchWrapper>
                <S.SearchIcon>
                  <FiSearch />
                </S.SearchIcon>
                <S.SearchInput
                  placeholder="Buscar por pet ou tutor"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </S.SearchWrapper>
              <S.FilterGroup>
                {stayFilterOptions.map((option) => (
                  <S.FilterChip
                    key={option.value}
                    $active={statusFilter === option.value}
                    type="button"
                    onClick={() => setStatusFilter(option.value)}
                  >
                    {option.label}
                  </S.FilterChip>
                ))}
              </S.FilterGroup>
            </S.ListHeader>

            {error ? (
              <S.ListEmptyState>{error}</S.ListEmptyState>
            ) : filteredBookings.length === 0 ? (
              <S.ListEmptyState>
                Nenhuma estadia encontrada com os filtros atuais.
              </S.ListEmptyState>
            ) : (
              <S.StayList>
                {filteredBookings.map((booking) => {
                  const status = getStayStatus(booking)
                  return (
                    <S.StayRow key={booking.id}>
                      <S.StayRowHeader>
                        <S.StayInfo>
                          <S.StayPet>{booking.pet_name}</S.StayPet>
                          <S.StayTutor>{booking.tutor_name}</S.StayTutor>
                        </S.StayInfo>
                        <S.StayIndicators>
                          <S.StatusBadge $status={status}>{statusLabels[status]}</S.StatusBadge>
                        </S.StayIndicators>
                      </S.StayRowHeader>

                      <S.StayMeta>
                        <S.MetaItem>
                          <S.MetaLabel>Período</S.MetaLabel>
                          <S.MetaValue>{formatRangeLabel(booking)}</S.MetaValue>
                        </S.MetaItem>
                        <S.MetaItem>
                          <S.MetaLabel>Horários</S.MetaLabel>
                          <S.MetaValue>{formatTimeRange(booking)}</S.MetaValue>
                        </S.MetaItem>
                        <S.MetaItem>
                          <S.MetaLabel>Valor diária</S.MetaLabel>
                          <S.MetaValue>{formatCurrencyValue(booking.valor_diaria)}</S.MetaValue>
                        </S.MetaItem>
                        <S.MetaItem>
                          <S.MetaLabel>Valor total</S.MetaLabel>
                          <S.MetaValue>{formatCurrencyValue(booking.valor_total)}</S.MetaValue>
                        </S.MetaItem>
                        <S.MetaItem>
                          <S.MetaLabel>Pagamento</S.MetaLabel>
                          <S.MetaValue>{formatPaymentLabel(booking.pago)}</S.MetaValue>
                        </S.MetaItem>
                        {booking.observacoes && (
                          <S.MetaItem>
                            <S.MetaLabel>Observações</S.MetaLabel>
                            <S.MetaValue>{booking.observacoes}</S.MetaValue>
                          </S.MetaItem>
                        )}
                      </S.StayMeta>

                      <S.StayActions>
                        <S.StayActionButton
                          type="button"
                          onClick={() => handleOpenStayManager(booking.id, 'edit')}
                        >
                          <FiEdit2 /> Editar
                        </S.StayActionButton>
                        <S.StayActionButton
                          $variant="danger"
                          type="button"
                          onClick={() => handleOpenStayManager(booking.id, 'delete')}
                        >
                          <FiTrash2 /> Excluir
                        </S.StayActionButton>
                      </S.StayActions>
                    </S.StayRow>
                  )
                })}
              </S.StayList>
            )}
          </S.StayListCard>
        )}
      </S.Container>

      <StayManagerModal
        open={isManagerModalOpen}
        stayId={selectedStayId}
        onClose={handleCloseStayManager}
        initialMode={stayModalMode}
        onUpdateSuccess={handleStayManagerSuccess}
        onDeleteSuccess={handleStayManagerSuccess}
      />

      <NewBookingModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookingCreated={handleBookingCreated}
      />
    </>
  )
}
