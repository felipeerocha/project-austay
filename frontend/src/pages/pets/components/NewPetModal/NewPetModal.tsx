import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import * as S from './NewPetModal.styles'
import { useNewPet } from './hooks/useNewPet'
import { TutorSelect } from '../../../home/components/TutorSelect/TutorSelect'
import { NewTutorModal } from '../../../tutors/components/NewTutorModal/NewTutorModal'
import { useTutors } from '../../../tutors/hooks/useTutors'

type NewPetModalProps = {
  open: boolean
  onClose: () => void
  onPetCreated: () => void
}

export function NewPetModal({ open, onClose, onPetCreated }: NewPetModalProps) {
  const [selectedTutorId, setSelectedTutorId] = useState('')
  const [petName, setPetName] = useState('')
  const [especie, setEspecie] = useState('')
  const [raca, setRaca] = useState('')
  const [sexo, setSexo] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [vermifugado, setVermifugado] = useState(false)
  const [vacinado, setVacinado] = useState(false)
  const [isNewTutorModalOpen, setIsNewTutorModalOpen] = useState(false)
  const { refetchTutors } = useTutors()

  const { isLoading, handleCreatePet } = useNewPet({
    onSuccess: () => {
      onClose()
      onPetCreated()
    }
  })

  const handleTutorChange = (tutorId: string) => {
    setSelectedTutorId(tutorId)
  }

  const handleNewTutorClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onClose()
    setIsNewTutorModalOpen(true)
  }

  const handleSave = () => {
    if (!selectedTutorId || !petName || !especie || !sexo || !dataNascimento) {
      console.error('Preencha todos os campos obrigatórios.')
      console.log('Dados faltando:', {
        selectedTutorId,
        petName,
        especie,
        sexo,
        dataNascimento
      })
      return
    }

    const payload = {
      nome: petName,
      especie: especie,
      raca: raca || 'SRD',
      nascimento: dataNascimento,
      sexo: sexo,
      vermifugado: vermifugado,
      vacinado: vacinado,
      tutor_ids: [selectedTutorId]
    }

    handleCreatePet(payload)
  }

  useEffect(() => {
    if (open) {
      setSelectedTutorId('')
      setPetName('')
      setEspecie('')
      setRaca('')
      setSexo('')
      setDataNascimento('')
      setVermifugado(false)
      setVacinado(false)
    }
  }, [open])

  return (
    <>
      <S.ModalContainer open={open} onClose={onClose}>
        <S.ModalHeader>
          <h2>Novo Pet</h2>
          <S.CloseButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </S.CloseButton>
        </S.ModalHeader>

        <S.FormContainer component="form" noValidate autoComplete="off">
          <div>
            <S.FieldLabel>Tutor</S.FieldLabel>

            <S.TutorSelectionContainer
              style={{ display: 'flex', gap: 18, alignItems: 'center' }}
            >
              <TutorSelect
                value={selectedTutorId}
                onChange={handleTutorChange}
                disabled={isLoading}
              />

              <S.NewTutorButton
                onClick={handleNewTutorClick}
                disabled={isLoading}
                type="button"
              >
                Novo tutor <S.PlusIcon />
              </S.NewTutorButton>
            </S.TutorSelectionContainer>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <S.FieldLabel>Nome do Pet</S.FieldLabel>
              <S.StyledTextField
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                fullWidth
                disabled={isLoading}
                placeholder="Digite o nome do pet"
              />
            </div>
            <div style={{ flex: 1 }}>
              <S.FieldLabel>Espécie</S.FieldLabel>
              <S.StyledSelect
                select
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
                fullWidth
                disabled={isLoading}
              >
                <S.StyledMenuItem value="" disabled>
                  Selecione a espécie
                </S.StyledMenuItem>
                <S.StyledMenuItem value="cachorro">Cachorro</S.StyledMenuItem>
                <S.StyledMenuItem value="gato">Gato</S.StyledMenuItem>
              </S.StyledSelect>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <S.FieldLabel>Raça</S.FieldLabel>
              <S.StyledTextField
                value={raca}
                onChange={(e) => setRaca(e.target.value)}
                fullWidth
                disabled={isLoading}
                placeholder="Ex: Labrador, Siames"
              />
            </div>
            <div style={{ flex: 1 }}>
              <S.FieldLabel>Sexo</S.FieldLabel>
              <S.StyledSelect
                select
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                fullWidth
                disabled={isLoading}
              >
                <S.StyledMenuItem value="" disabled>
                  Selecione o sexo
                </S.StyledMenuItem>
                <S.StyledMenuItem value="macho">Macho</S.StyledMenuItem>
                <S.StyledMenuItem value="femea">Fêmea</S.StyledMenuItem>
              </S.StyledSelect>
            </div>
          </div>

          <div>
            <S.FieldLabel>Data de Nascimento *</S.FieldLabel>
            <S.StyledTextField
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              fullWidth
              disabled={isLoading}
              slotProps={{
                inputLabel: {
                  shrink: true
                },
                htmlInput: {
                  max: new Date().toISOString().split('T')[0]
                }
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '32px' }}>
            <S.CheckboxContainer>
              <S.CheckboxLabel>
                <input
                  type="checkbox"
                  checked={vermifugado}
                  onChange={(e) => setVermifugado(e.target.checked)}
                  disabled={isLoading}
                />
                <span>Vermifugado</span>
              </S.CheckboxLabel>
            </S.CheckboxContainer>

            <S.CheckboxContainer>
              <S.CheckboxLabel>
                <input
                  type="checkbox"
                  checked={vacinado}
                  onChange={(e) => setVacinado(e.target.checked)}
                  disabled={isLoading}
                />
                <span>Vacinado</span>
              </S.CheckboxLabel>
            </S.CheckboxContainer>
          </div>
        </S.FormContainer>

        <S.ActionsContainer>
          <S.TextButton onClick={onClose} disabled={isLoading}>
            Cancelar
          </S.TextButton>
          <S.PrimaryButton onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar Pet'}
          </S.PrimaryButton>
        </S.ActionsContainer>
      </S.ModalContainer>
      <NewTutorModal
        open={isNewTutorModalOpen}
        onClose={() => setIsNewTutorModalOpen(false)}
        onTutorCreated={refetchTutors}
      />
    </>
  )
}
