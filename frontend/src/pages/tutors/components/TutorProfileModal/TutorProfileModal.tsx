import { useState, useEffect } from 'react'
import { useTutorProfile } from './hooks/useTutorProfile'
import { ConfirmDialog } from '../../../../components/confirmDialog/ConfirmDialog'
import * as S from './TutorProfileModal.styles'
import { PiPawPrintFill } from 'react-icons/pi'
import { Box, CircularProgress } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

type TutorProfileModalProps = {
  open: boolean
  onClose: () => void
  tutorId: string | null
  onDataChanged: () => void
}

export function TutorProfileModal({
  open,
  onClose,
  tutorId,
  onDataChanged
}: TutorProfileModalProps) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isConfirmOpen, setConfirmOpen] = useState(false)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [cpf, setCpf] = useState('')

  const { tutor, isLoading, isUpdating, isDeleting, updateTutor, deleteTutor } =
    useTutorProfile(tutorId, onClose, onDataChanged)

  useEffect(() => {
    if (tutor) {
      setName(tutor.name)
      setPhone(tutor.phone)
      setCpf(tutor.cpf)
    }
  }, [tutor])

  useEffect(() => {
    if (!open) {
      setIsEditMode(false)
    }
  }, [open])

  const handleSaveChanges = async () => {
    await updateTutor({ name, phone, cpf })
    setIsEditMode(false)
    onClose()
  }

  const handleDelete = async () => {
    setConfirmOpen(false)
    await deleteTutor()
  }

  if (!open) return null

  return (
    <>
      <S.ModalContainer open={open} onClose={onClose}>
        <S.ModalHeader>
          <h2>Perfil do tutor</h2>
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
                label="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditMode || isUpdating}
                fullWidth
              />
              <S.StyledTextField
                label="Telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={!isEditMode || isUpdating}
                fullWidth
              />
              <S.StyledTextField
                label="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                disabled={!isEditMode || isUpdating}
                fullWidth
              />
            </S.FormContainer>

            <S.PetsSection>
              <h3>
                <PiPawPrintFill /> Pets
              </h3>
              <S.PetsList>
                {tutor?.pets && tutor.pets.length > 0 ? (
                  tutor.pets.map((pet) => (
                    <S.PetItem key={pet.id}>{pet.nome}</S.PetItem>
                  ))
                ) : (
                  <S.PetItem>Nenhum pet encontrado.</S.PetItem>
                )}
              </S.PetsList>
            </S.PetsSection>

            <S.ActionsContainer>
              <S.DangerButton
                onClick={() => setConfirmOpen(true)}
                disabled={isUpdating || isDeleting}
              >
                Excluir tutor
              </S.DangerButton>

                            {!isEditMode ? (
                <S.EditButton onClick={() => setIsEditMode(true)}>
                  Editar tutor
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
            Tem certeza que deseja excluir este tutor?
            <br />
            Todos os pets vinculados a ele serão desvinculados.
          </>
        }
        isLoading={isDeleting}
      />
    </>
  )
}
