import { useEffect, useState, type MouseEvent } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import * as S from './NewBooking.styles'
import { useNewBooking } from './hooks/useNewBooking'
import { PetSelect } from '../../../home/components/PetSelect/PetSelect'
import { NewPetModal } from '../../../pets/components/NewPetModal/NewPetModal'
import { usePets } from './hooks/useFetchPets'
import { toastError } from '../../../../components/toast/toast'
import { DateFormat } from '../../../../utils/dateFormat'

type NewBookingModalProps = {
  open: boolean
  onClose: () => void
  onBookingCreated: () => void
}

export function NewBookingModal({
  open,
  onClose,
  onBookingCreated
}: NewBookingModalProps) {
  const [selectedPetId, setSelectedPetId] = useState('')
  const [selectedTutorId, setSelectedTutorId] = useState('')
  const [dataEntrada, setDataEntrada] = useState('')
  const [dataSaida, setDataSaida] = useState('')
  const [horaInicio, setHoraInicio] = useState('')
  const [horaFinal, setHoraFinal] = useState('')
  const [valorDiaria, setValorDiaria] = useState('')
  const [valorTotal, setValorTotal] = useState(0)
  const [observacoes, setObservacoes] = useState('')
  const [formaPagamento, setFormaPagamento] = useState('')
  const [daysCount, setDaysCount] = useState(0)

  const [isNewPetModalOpen, setIsNewPetModalOpen] = useState(false)

  const { refetchPets } = usePets()

  const todayDate = DateFormat.getTodayDate()

  const { isLoading, handleCreateBooking } = useNewBooking({
    onSuccess: () => {
      onClose()
      onBookingCreated()
    }
  })

  useEffect(() => {
    calculateValorTotal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataEntrada, dataSaida, valorDiaria])

  const calculateValorTotal = () => {
    if (!dataEntrada || !dataSaida) {
      setDaysCount(0)
      setValorTotal(0)
      return
    }

    const startDate = new Date(dataEntrada)
    const endDate = new Date(dataSaida)

    const timeDiff = endDate.getTime() - startDate.getTime()

    if (timeDiff < 0) {
      setDaysCount(0)
      setValorTotal(0)
      return
    }

    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1

    if (daysDiff <= 0) {
      setDaysCount(0)
      setValorTotal(0)
      return
    }

    setDaysCount(daysDiff)

    const dailyRate = parseFloat(valorDiaria.replace(',', '.')) || 0
    const total = daysDiff * dailyRate
    setValorTotal(total)
  }

  const handlePetChange = (petId: string, tutorId: string) => {
    setSelectedPetId(petId)
    setSelectedTutorId(tutorId)
  }

  const formatCurrencyInput = (value: string) => {
    let cleaned = value.replace(/[^\d,]/g, '')

    cleaned = cleaned.replace('.', ',')

    const parts = cleaned.split(',')
    if (parts.length > 2) {
      cleaned = parts[0] + ',' + parts.slice(1).join('')
    }

    if (parts.length === 2 && parts[1].length > 2) {
      cleaned = parts[0] + ',' + parts[1].substring(0, 2)
    }

    return cleaned
  }

  const handleValorDiariaChange = (value: string) => {
    const formatted = formatCurrencyInput(value)
    setValorDiaria(formatted)
  }

  const handleSave = () => {
    if (
      !selectedPetId ||
      !selectedTutorId ||
      !dataEntrada ||
      !dataSaida ||
      !valorDiaria ||
      !horaInicio
    ) {
      toastError('Preencha todos os campos obrigatórios.')
      return
    }

    const valorDiariaDecimal = parseFloat(valorDiaria.replace(',', '.'))

    const payload = {
      pet_id: selectedPetId,
      tutor_id: selectedTutorId,
      data_entrada: dataEntrada,
      data_saida: dataSaida,
      hora_inicio: horaInicio,
      ...(horaFinal && { hora_final: horaFinal }),
      valor_diaria: valorDiariaDecimal,
      observacoes,
      pago: false
    }

    handleCreateBooking(payload)
  }

  const handleNewPetClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onClose()
    setIsNewPetModalOpen(true)
  }

  useEffect(() => {
    if (open) {
      setSelectedPetId('')
      setSelectedTutorId('')
      const today = DateFormat.getTodayDate()
      setDataEntrada(today)
      setDataSaida(today)
      setHoraInicio('08:00')
      setHoraFinal('18:00')
      setValorDiaria('')
      setValorTotal(0)
      setObservacoes('')
      setFormaPagamento('')
      setDaysCount(0)
    }
  }, [open])

  return (
    <>
      <S.ModalContainer open={open} onClose={onClose}>
        <S.ModalHeader>
          <h2>Agendar</h2>
          <S.CloseButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </S.CloseButton>
        </S.ModalHeader>

        <S.FormContainer component="form" noValidate autoComplete="off">
          <div>
            <S.FieldLabel>Pet</S.FieldLabel>

            <S.PetSelectionContainer>
              <PetSelect
                value={selectedPetId}
                onChange={handlePetChange}
                disabled={isLoading}
              />

              <S.NewPetButton
                onClick={handleNewPetClick}
                disabled={isLoading}
                type="button"
              >
                Novo pet <S.PlusIcon />
              </S.NewPetButton>
            </S.PetSelectionContainer>
          </div>
          <S.DateFieldsRow>
            <S.FieldColumn>
              <S.FieldLabel>Data de Entrada</S.FieldLabel>
              <S.StyledTextField
                type="date"
                value={dataEntrada}
                onChange={(e) => setDataEntrada(e.target.value)}
                fullWidth
                disabled={isLoading}
                slotProps={{
                  inputLabel: {
                    shrink: true
                  },
                  htmlInput: {
                    min: todayDate
                  }
                }}
              />
            </S.FieldColumn>

            <S.FieldColumn>
              <S.FieldLabel>Data de Saída</S.FieldLabel>
              <S.StyledTextField
                type="date"
                value={dataSaida}
                onChange={(e) => setDataSaida(e.target.value)}
                fullWidth
                disabled={isLoading}
                slotProps={{
                  inputLabel: {
                    shrink: true
                  },
                  htmlInput: {
                    min: dataEntrada || todayDate
                  }
                }}
              />
            </S.FieldColumn>

            {daysCount > 0 && (
              <S.DaysBadge>
                {daysCount} {daysCount === 1 ? 'dia' : 'dias'}
              </S.DaysBadge>
            )}
          </S.DateFieldsRow>

          <S.FieldsRow>
            <S.FieldColumn>
              <S.FieldLabel>Hora de entrada</S.FieldLabel>
              <S.StyledTextField
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                fullWidth
                disabled={isLoading}
                slotProps={{
                  htmlInput: {
                    step: 300
                  }
                }}
              />
            </S.FieldColumn>
            <S.FieldColumn>
              <S.FieldLabel>Hora de saída</S.FieldLabel>
              <S.StyledTextField
                type="time"
                value={horaFinal}
                onChange={(e) => setHoraFinal(e.target.value)}
                fullWidth
                disabled={isLoading}
                slotProps={{
                  htmlInput: {
                    step: 300
                  }
                }}
              />
            </S.FieldColumn>
          </S.FieldsRow>

          <div>
            <S.FieldLabel>Forma de pagamento</S.FieldLabel>
            <S.StyledTextField
              select
              value={formaPagamento}
              onChange={(e) => setFormaPagamento(e.target.value)}
              fullWidth
              disabled={isLoading}
            >
              <S.StyledMenuItem value="">
                <em>Selecionar</em>
              </S.StyledMenuItem>
              <S.StyledMenuItem value="pix">Pix</S.StyledMenuItem>
              <S.StyledMenuItem value="cartao">Cartão</S.StyledMenuItem>
              <S.StyledMenuItem value="dinheiro">Dinheiro</S.StyledMenuItem>
              <S.StyledMenuItem value="transferencia">
                Transferência
              </S.StyledMenuItem>
            </S.StyledTextField>
          </div>

          <S.FieldsRow>
            <S.FieldColumn>
              <S.FieldLabel>Valor da diária</S.FieldLabel>
              <S.CurrencyTextField
                value={valorDiaria}
                onChange={(e) => handleValorDiariaChange(e.target.value)}
                fullWidth
                disabled={isLoading}
                placeholder="0,00"
                slotProps={{
                  htmlInput: {
                    min: 0,
                    step: 0.01
                  }
                }}
              />
            </S.FieldColumn>
            <S.FieldColumn>
              <S.FieldLabel>Valor total</S.FieldLabel>
              <S.CurrencyTextField
                value={valorTotal.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
                fullWidth
                disabled
                sx={{
                  '& .MuiInputBase-input': {
                    backgroundColor: '#f5f5f5',
                    color: '#666',
                    fontWeight: 'bold'
                  }
                }}
              />
            </S.FieldColumn>
          </S.FieldsRow>
          <div>
            <S.FieldLabel>Observações</S.FieldLabel>
            <S.StyledTextField
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              fullWidth
              disabled={isLoading}
              multiline
              rows={3}
            />
          </div>
        </S.FormContainer>

        <S.ActionsContainer>
          <S.TextButton onClick={onClose} disabled={isLoading}>
            Cancelar
          </S.TextButton>
          <S.PrimaryButton onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Agendando...' : 'Agendar'}
          </S.PrimaryButton>
        </S.ActionsContainer>
      </S.ModalContainer>
      <NewPetModal
        open={isNewPetModalOpen}
        onClose={() => setIsNewPetModalOpen(false)}
        onPetCreated={() => {
          console.log('Pet created successfully')
          refetchPets()
        }}
      />
    </>
  )
}
