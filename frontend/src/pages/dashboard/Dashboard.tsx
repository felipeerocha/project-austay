import { useState, useEffect } from 'react'
import { useDashboard, usePetsHospedados, useMoreDays, useMovimentacoesPorData } from './hooks/useDashboard'
import * as S from './Dashboard.styles'
import { PiPawPrintFill } from 'react-icons/pi'
import { IoMdTrendingUp } from 'react-icons/io'
import { FaHome } from 'react-icons/fa'
import { TbCalendarCheck } from 'react-icons/tb'
import type { CheckInOutSummary, MovimentacoesPorData } from './types'
import { MovimentacoesModal } from './components/MovimentacoesModal'

export function Dashboard() {
  const { dashboardData, isLoading, error } = useDashboard()
  const { petsHospedados, isLoading: petsLoading } = usePetsHospedados()
  const { fetchMoreDays, isLoading: moreDaysLoading } = useMoreDays()
  const { fetchMovimentacoes, isLoading: movimentacoesLoading } = useMovimentacoesPorData()
  const [moreDays, setMoreDays] = useState<CheckInOutSummary[]>([])
  const [currentDaysCount, setCurrentDaysCount] = useState(7)
  const [modalOpen, setModalOpen] = useState(false)
  const [movimentacoesData, setMovimentacoesData] = useState<MovimentacoesPorData | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short'
    })
  }

  const formatDateFull = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const getDayName = (dateString: string) => {
    const date = new Date(dateString)
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    return dayNames[date.getDay()]
  }

  const handleLoadMoreDays = async () => {
    try {
      const newDays = await fetchMoreDays(currentDaysCount + 1, 7)
      setMoreDays([...moreDays, ...newDays])
      setCurrentDaysCount(currentDaysCount + 7)
    } catch (err) {
      console.error('Error loading more days:', err)
    }
  }

  const handleDayClick = async (date: string) => {
    const day = allDays.find(d => d.date === date)
    if (day && (day.check_ins > 0 || day.check_outs > 0)) {
      setModalOpen(true)
      try {
        const data = await fetchMovimentacoes(date)
        setMovimentacoesData(data)
      } catch (err) {
        console.error('Error loading movimentacoes:', err)
      }
    }
  }

  useEffect(() => {
    if (!modalOpen) {
      setMovimentacoesData(null)
    }
  }, [modalOpen])

  const allDays = dashboardData
    ? [...dashboardData.checkins_checkouts_proximos_dias, ...moreDays]
    : []

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  if (isLoading) {
    return (
      <S.Container>
        <S.LoadingContainer>
          <S.PurpleSpinner size={24} />
        </S.LoadingContainer>
      </S.Container>
    )
  }

  if (error) {
    return (
      <S.Container>
        <S.StatusMessage>{error}</S.StatusMessage>
      </S.Container>
    )
  }

  if (!dashboardData) {
    return (
      <S.Container>
        <S.StatusMessage>Nenhum dado disponível</S.StatusMessage>
      </S.Container>
    )
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          <PiPawPrintFill /> Dashboard Operacional
        </S.Title>
      </S.Header>

      <S.MetricsGrid>
        <S.MetricCard>
          <S.MetricIcon>
            <FaHome />
          </S.MetricIcon>
          <S.MetricContent>
            <S.MetricLabel>Pets Hospedados</S.MetricLabel>
            <S.MetricValue>{dashboardData.total_pets_hospedados}</S.MetricValue>
            <S.MetricSubtext>
              de {dashboardData.capacidade_maxima} vagas
            </S.MetricSubtext>
          </S.MetricContent>
        </S.MetricCard>

        <S.MetricCard>
          <S.MetricIcon>
            <IoMdTrendingUp />
          </S.MetricIcon>
          <S.MetricContent>
            <S.MetricLabel>Taxa de Ocupação</S.MetricLabel>
            <S.MetricValue>{dashboardData.taxa_ocupacao}%</S.MetricValue>
            <S.ProgressBar>
              <S.ProgressFill width={dashboardData.taxa_ocupacao} />
            </S.ProgressBar>
          </S.MetricContent>
        </S.MetricCard>

        <S.MetricCard>
          <S.MetricIcon>
            <TbCalendarCheck />
          </S.MetricIcon>
          <S.MetricContent>
            <S.MetricLabel>Check-ins Hoje</S.MetricLabel>
            <S.MetricValue>
              {dashboardData.checkins_checkouts_hoje.check_ins}
            </S.MetricValue>
            <S.MetricSubtext>
              {dashboardData.checkins_checkouts_hoje.check_outs} check-outs
            </S.MetricSubtext>
          </S.MetricContent>
        </S.MetricCard>
      </S.MetricsGrid>

      <S.PetsListContainer>
        <S.SectionTitle>Pets Atualmente Hospedados</S.SectionTitle>
        {petsLoading ? (
          <S.LoadingContainer>
            <S.PurpleSpinner size={24} />
          </S.LoadingContainer>
        ) : petsHospedados.length === 0 ? (
          <S.EmptyPetsMessage>Nenhum pet hospedado no momento</S.EmptyPetsMessage>
        ) : (
          <>
            <S.PetsListHeader>
              <S.PetsListHeaderCell>Pet</S.PetsListHeaderCell>
              <S.PetsListHeaderCell>Tutor</S.PetsListHeaderCell>
              <S.PetsListHeaderCell>Entrada</S.PetsListHeaderCell>
              <S.PetsListHeaderCell>Saída Prevista</S.PetsListHeaderCell>
              <S.PetsListHeaderCell>Diária</S.PetsListHeaderCell>
              <S.PetsListHeaderCell>Status</S.PetsListHeaderCell>
            </S.PetsListHeader>
            {petsHospedados.map((pet) => (
              <S.PetsListRow key={pet.estadia_id}>
                <S.PetsListCell>{pet.pet_nome}</S.PetsListCell>
                <S.PetsListCell>{pet.tutor_nome}</S.PetsListCell>
                <S.PetsListCell>{formatDateFull(pet.data_entrada)}</S.PetsListCell>
                <S.PetsListCell>
                  {pet.data_saida ? formatDateFull(pet.data_saida) : '-'}
                </S.PetsListCell>
                <S.PetsListCell>{formatCurrency(pet.valor_diaria)}</S.PetsListCell>
                <S.PetsListCell>
                  <S.PaymentBadge paid={pet.pago}>
                    {pet.pago ? 'Pago' : 'Pendente'}
                  </S.PaymentBadge>
                </S.PetsListCell>
              </S.PetsListRow>
            ))}
          </>
        )}
      </S.PetsListContainer>

      <S.Section>
        <S.SectionTitle>Movimentações dos Próximos Dias</S.SectionTitle>
        <S.TimelineContainer>
          {allDays.map((day, index) => {
            const hasMovements = day.check_ins > 0 || day.check_outs > 0
            return (
              <S.TimelineItem
                key={index}
                hasMovements={hasMovements}
                onClick={() => hasMovements && handleDayClick(day.date)}
              >
                <S.DayInfo>
                  <S.DayName style={{ color: hasMovements ? '#8669D9' : undefined, fontWeight: hasMovements ? '600' : undefined }}>
                    {getDayName(day.date)}
                  </S.DayName>
                  <S.DayDate style={{ color: hasMovements ? '#8669D9' : undefined }}>
                    {formatDate(day.date)}
                  </S.DayDate>
                </S.DayInfo>
                <S.MovementsInfo>
                  <S.MovementItem type="checkin">
                    <S.MovementIcon type="checkin">↓</S.MovementIcon>
                    <S.MovementText style={{ color: hasMovements ? '#8669D9' : undefined, fontWeight: hasMovements ? '600' : undefined }}>
                      {day.check_ins} check-in{day.check_ins !== 1 ? 's' : ''}
                    </S.MovementText>
                  </S.MovementItem>
                  <S.MovementItem type="checkout">
                    <S.MovementIcon type="checkout">↑</S.MovementIcon>
                    <S.MovementText style={{ color: hasMovements ? '#8669D9' : undefined, fontWeight: hasMovements ? '600' : undefined }}>
                      {day.check_outs} check-out{day.check_outs !== 1 ? 's' : ''}
                    </S.MovementText>
                  </S.MovementItem>
                </S.MovementsInfo>
              </S.TimelineItem>
            )
          })}
        </S.TimelineContainer>
        <S.LoadMoreButton
          onClick={handleLoadMoreDays}
          disabled={moreDaysLoading}
        >
          {moreDaysLoading ? 'Carregando...' : 'Carregar mais 7 dias'}
        </S.LoadMoreButton>
      </S.Section>

      <MovimentacoesModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={movimentacoesData}
        isLoading={movimentacoesLoading}
      />
    </S.Container>
  )
}

