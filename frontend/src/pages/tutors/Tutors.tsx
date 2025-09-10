import { useState } from 'react'
import { useTutors } from './hooks'
import { PiPawPrintFill } from 'react-icons/pi'
import * as S from './Tutors.styles'
import { formatPhoneNumber } from '../../utils/phoneNumberFormat'
import { NewTutorModal } from './components/NewTutorModal'

export function Tutors() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { tutors, isLoading, error } = useTutors()

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
            <S.TutorCell>—</S.TutorCell>
            <S.TutorCell>{formatPhoneNumber(tutor.phone)}</S.TutorCell>
            <S.IconCell>
              <PiPawPrintFill />
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
            <PiPawPrintFill /> Tutores
          </S.Title>
          <S.NewTutorButton onClick={() => setIsModalOpen(true)}>
            Novo tutor +
          </S.NewTutorButton>
        </S.Header>

        <S.TutorListContainer>{renderContent()}</S.TutorListContainer>
      </S.Container>

      <NewTutorModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
