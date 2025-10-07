import { useState } from 'react'
import { useTutors } from './hooks/useTutors'
import * as S from './Tutors.styles'
import { formatPhoneNumber } from '../../utils/phoneNumberFormat'
import { NewTutorModal } from './components/NewTutorModal/NewTutorModal'
import { TutorProfileModal } from './components/TutorProfileModal/TutorProfileModal'
import { PawIcon } from './Tutors.styles'

export function Tutors() {
  const [isNewTutorModalOpen, setIsNewTutorModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [selectedTutorId, setSelectedTutorId] = useState<string | null>(null)

  const { tutors, isLoading, error, refetchTutors } = useTutors()

  const handleViewTutor = (tutorId: string) => {
    setSelectedTutorId(tutorId)
    setIsProfileModalOpen(true)
  }

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false)
    setSelectedTutorId(null)
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <S.LoadingContainer>
          <S.PurpleSpinner size={24} />
        </S.LoadingContainer>
      )
    }

    if (error) {
      return (
        <S.StatusMessage>Ocorreu um erro ao buscar os tutores.</S.StatusMessage>
      )
    }

    if (!tutors || tutors.length === 0) {
      return <S.StatusMessage>Nenhum tutor encontrado.</S.StatusMessage>
    }

    return (
      <>
        <S.TutorListHeader>
          <span>Tutor</span>
          <span>Pets</span>
          <span>Telefone</span>
          <span style={{ textAlign: 'center' }}>Ver mais</span>
        </S.TutorListHeader>
        {tutors.map((tutor) => (
          <S.TutorListRow key={tutor.id}>
            <S.TutorCell>{tutor.name}</S.TutorCell>
            <S.TutorCell>{tutor.pets?.length ?? 0}</S.TutorCell>
            <S.TutorCell>{formatPhoneNumber(tutor.phone)}</S.TutorCell>
            <S.IconCell onClick={() => handleViewTutor(tutor.id)}>
              <PawIcon />
            </S.IconCell>
          </S.TutorListRow>
        ))}
      </>
    )
  }

  return (
    <>
      <S.Container>
        <S.Header>
          <S.Title>
            <PawIcon /> Tutores
          </S.Title>
          <S.NewTutorButton onClick={() => setIsNewTutorModalOpen(true)}>
            Novo tutor +
          </S.NewTutorButton>
        </S.Header>

        <S.TutorListContainer>{renderContent()}</S.TutorListContainer>
      </S.Container>

      <NewTutorModal
        open={isNewTutorModalOpen}
        onClose={() => setIsNewTutorModalOpen(false)}
        onTutorCreated={refetchTutors}
      />

      {selectedTutorId && (
        <TutorProfileModal
          open={isProfileModalOpen}
          tutorId={selectedTutorId}
          onClose={handleCloseProfileModal}
          onDataChanged={refetchTutors}
        />
      )}
    </>
  )
}
