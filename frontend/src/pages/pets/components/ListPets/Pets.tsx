import { useState } from 'react'
import { usePets } from './hooks/usePets'
import * as S from './Pets.styles'
import { NewPetModal } from '../../components/NewPetModal/NewPetModal'
import { PetProfileModal } from '../../components/PetProfileModal/PetProfileModal'
import { PawIcon } from './Pets.styles'

export function Pets() {
  const [isNewPetModalOpen, setIsNewPetModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null)

  const { pets, isLoading, error, refetchPets } = usePets()

  const handleViewPet = (petId: string) => {
    setSelectedPetId(petId)
    setIsProfileModalOpen(true)
  }

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false)
    setSelectedPetId(null)
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
        <S.StatusMessage>Ocorreu um erro ao buscar os pets.</S.StatusMessage>
      )
    }

    if (!pets || pets.length === 0) {
      return <S.StatusMessage>Nenhum pet encontrado.</S.StatusMessage>
    }

    return (
      <>
        <S.PetListHeader>
          <span>Nome</span>
          <span>Tutores</span>
          <span>Sexo</span>
          <span>Raça</span>
          <span>Vacinado</span>
          <span style={{ textAlign: 'center' }}>Ver mais</span>
        </S.PetListHeader>

        {pets.map((pet) => (
          <S.PetListRow key={pet.id}>
          <S.PetCell>{pet.nome}</S.PetCell>
          <S.PetCell> {pet.tutors && pet.tutors.length > 0 ? pet.tutors.map((t) => t.name).join(', ') : '—'} </S.PetCell>            
          <S.PetCell>{pet.sexo}</S.PetCell>
          <S.PetCell>{pet.raca}</S.PetCell>
          <S.PetCell> {pet.vacinado ? 'SIM' : 'NÃO'} </S.PetCell>

            <S.IconCell onClick={() => handleViewPet(pet.id)}>
              <PawIcon />
            </S.IconCell>
          </S.PetListRow>
        ))}
      </>
    )
  }

  return (
    <>
      <S.Container>
        <S.Header>
          <S.Title>
            <PawIcon /> Pets
          </S.Title>

          <S.NewPetButton onClick={() => setIsNewPetModalOpen(true)}>
            Novo pet +
          </S.NewPetButton>
        </S.Header>

        <S.PetListContainer>{renderContent()}</S.PetListContainer>
      </S.Container>

      <NewPetModal
        open={isNewPetModalOpen}
        onClose={() => setIsNewPetModalOpen(false)}
        onPetCreated={refetchPets}
      />

      <PetProfileModal
        open={isProfileModalOpen}
        onClose={handleCloseProfileModal}
        petId={selectedPetId}
        onDataChanged={refetchPets}
      />
    </>
  )
}
