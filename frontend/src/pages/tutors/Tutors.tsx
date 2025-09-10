import { useTutors } from './hooks'
import { PiPawPrintFill } from 'react-icons/pi'
import * as S from './Tutors.styles'
import { formatPhoneNumber } from '../../utils/phoneNumberFormat'

export function Tutors() {
  const { tutors, isLoading, error } = useTutors()

  const renderContent = () => {
    if (isLoading) {
      return <S.StatusMessage>Carregando tutores...</S.StatusMessage>
    }

    if (error) {
      return <S.StatusMessage>{error}</S.StatusMessage>
    }

    if (tutors.length === 0) {
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
    <S.Container>
      <S.Header>
        <S.Title>
          <PiPawPrintFill /> Tutores
        </S.Title>
        <S.NewTutorButton>Novo tutor +</S.NewTutorButton>
      </S.Header>

      <S.TutorListContainer>{renderContent()}</S.TutorListContainer>
    </S.Container>
  )
}
