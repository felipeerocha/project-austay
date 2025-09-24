import { useState } from 'react'
import { useState } from 'react'
import { useTutors } from './hooks'
import { PiPawPrintFill } from 'react-icons/pi'
import * as S from './Tutors.styles'
import { formatPhoneNumber } from '../../utils/phoneNumberFormat'
import { PetModal, AddTutorModal } from '../../components/modal'
import type { Tutor } from './types'

export function Tutors() {
  const { tutors, isLoading, error, refetch } = useTutors()
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddTutorModalOpen, setIsAddTutorModalOpen] = useState(false)

  const handleViewPets = (tutor: Tutor) => {
    setSelectedTutor(tutor)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTutor(null)
  }

  const handleAddTutor = () => {
    setIsAddTutorModalOpen(true)
  }

  const handleCloseAddTutorModal = () => {
    setIsAddTutorModalOpen(false)
  }

  const handleTutorCreated = () => {
    refetch()
  }

  const renderContent = () => {
    if (isLoading) {
      return <S.StatusMessage>Carregando tutores...</S.StatusMessage>
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
          <span style={{ textAlign: 'center' }}>Visualizar</span>
        </S.TutorListHeader>
        {tutors.map((tutor) => (
          <S.TutorListRow key={tutor.id}>
            <S.TutorCell>{tutor.name}</S.TutorCell>
            <S.TutorCell>{tutor.pets.length}</S.TutorCell>

            <S.TutorCell>{formatPhoneNumber(tutor.phone)}</S.TutorCell>

            <S.IconCell>
              <S.ViewButton onClick={() => handleViewPets(tutor)}>
                <PiPawPrintFill />
              </S.ViewButton>
            </S.IconCell>
          </S.TutorListRow>
        ))}
      </>
    )
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          <PiPawPrintFill /> Tutores
        </S.Title>
        <S.NewTutorButton onClick={handleAddTutor}>Novo tutor +</S.NewTutorButton>
      </S.Header>

      <S.TutorListContainer>{renderContent()}</S.TutorListContainer>
      
      <PetModal 
        tutor={selectedTutor}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      
      <AddTutorModal 
        isOpen={isAddTutorModalOpen}
        onClose={handleCloseAddTutorModal}
        onSuccess={handleTutorCreated}
      />
    </S.Container>
  )
}
