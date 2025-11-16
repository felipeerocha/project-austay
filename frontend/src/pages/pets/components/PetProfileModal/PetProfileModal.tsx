import { useState, useEffect } from 'react'
import { usePetProfile } from './hooks/usePetProfile'
import { ConfirmDialog } from '../../../../components/confirmDialog/ConfirmDialog'
import * as S from './PetProfileModal.styles'
import { Box, CircularProgress} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

type PetProfileModalProps = {
  open: boolean
  onClose: () => void
  petId: string | null
  onDataChanged: () => void
}

export function PetProfileModal({
  open,
  onClose,
  petId,
  onDataChanged
}: PetProfileModalProps) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isConfirmOpen, setConfirmOpen] = useState(false)

  const [nome, setNome] = useState('')
  const [especie, setEspecie] = useState('')
  const [raca, setRaca] = useState('')
  const [nascimento, setNascimento] = useState('')
  const [sexo, setSexo] = useState<'macho' | 'femea'>('macho')
  const [vacinado, setVacinado] = useState(false)
  const [vermifugado, setVermifugado] = useState(false)

  const {
    pet,
    isLoading,
    isUpdating,
    isDeleting,
    updatePet,
    deletePet
  } = usePetProfile(petId, onClose, onDataChanged)

  useEffect(() => {
    if (pet) {
      setNome(pet.nome)
      setEspecie(pet.especie)
      setRaca(pet.raca)
      setNascimento(pet.nascimento)
      setSexo(pet.sexo)
      setVacinado(pet.vacinado)
      setVermifugado(pet.vermifugado)
    }
  }, [pet])

  useEffect(() => {
    if (!open) {
      setIsEditMode(false)
    }
  }, [open])

  const handleSaveChanges = async () => {
    await updatePet({
      nome,
      especie,
      raca,
      nascimento,
      sexo,
      vacinado,
      vermifugado
    })

    setIsEditMode(false)
    onClose()
  }

  const handleDelete = async () => {
    setConfirmOpen(false)
    await deletePet()
  }

  if (!open) return null

  return (
    <>
      <S.ModalContainer open={open} onClose={onClose}>
        <S.ModalHeader>
          <h2>Perfil do pet</h2>
          <S.CloseButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </S.CloseButton>
        </S.ModalHeader>

        {isLoading ? (
          <Box display="flex" justifyContent="center" my={5}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <S.FormContainer>
              <S.StyledTextField
                label="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                disabled={!isEditMode}
                fullWidth
              />

              <S.StyledTextField
                label="Espécie"
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
                disabled={!isEditMode}
                fullWidth
              />

              <S.StyledTextField
                label="Raça"
                value={raca}
                onChange={(e) => setRaca(e.target.value)}
                disabled={!isEditMode}
                fullWidth
              />

              <S.StyledTextField
                label="Nascimento"
                value={nascimento}
                onChange={(e) => setNascimento(e.target.value)}
                disabled={!isEditMode}
                fullWidth
              />

              <S.StyledTextField
                label="Sexo"
                value={sexo}
                onChange={(e) => setSexo(e.target.value as 'macho' | 'femea')}
                disabled={!isEditMode}
                fullWidth
              />
<div style={{ display: 'flex', gap: '32px' }}>
<S.CheckboxContainer>
  <S.CheckboxLabel>
    <input
      type="checkbox"
      checked={vacinado}
      onChange={(e) => setVacinado(e.target.checked)}
      disabled={!isEditMode}
    />
    Vacinado
  </S.CheckboxLabel>
</S.CheckboxContainer>

<S.CheckboxContainer>
  <S.CheckboxLabel>
    <input
      type="checkbox"
      checked={vermifugado}
      onChange={(e) => setVermifugado(e.target.checked)}
      disabled={!isEditMode}
    />
    Vermifugado
  </S.CheckboxLabel>
</S.CheckboxContainer>
          </div>

            </S.FormContainer>
            

            <S.ActionsContainer>
              <S.DangerButton
                onClick={() => setConfirmOpen(true)}
                disabled={isUpdating || isDeleting}
              >
                Excluir pet
              </S.DangerButton>

              {!isEditMode ? (
                <S.EditButton onClick={() => setIsEditMode(true)}>
                  Editar pet
                </S.EditButton>
              ) : (
                <S.PrimaryButton
                  onClick={handleSaveChanges}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Salvar'
                  )}
                </S.PrimaryButton>
              )}
            </S.ActionsContainer>
          </>
        )}
      </S.ModalContainer>

      <ConfirmDialog
        open={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Confirmar Exclusão"
        message={
          <>
            Tem certeza que deseja excluir este pet?
            <br />
            Ele será removido permanentemente.
          </>
        }
        isLoading={isDeleting}
      />
    </>
  )
}
