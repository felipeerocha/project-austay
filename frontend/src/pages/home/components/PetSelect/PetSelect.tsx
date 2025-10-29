import React from 'react'
import { usePets } from '../../../bookings/components/NewBookingModal/hooks/useFetchPets'
import {
  StyledSelect,
  StyledMenuItem
} from '../../../bookings/components/NewBookingModal/NewBooking.styles'

interface PetSelectProps {
  value: string
  onChange: (petId: string, tutorId: string) => void
  required?: boolean
  disabled?: boolean
  error?: boolean
  helperText?: string
}

export const PetSelect: React.FC<PetSelectProps> = ({
  value,
  onChange,
  required = false,
  disabled = false,
  error = false,
  helperText
}) => {
  const { pets, isLoading, error: fetchError } = usePets()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedPetId = event.target.value
    const selectedPet = pets.find((pet) => pet.id === selectedPetId)

    const tutorId = selectedPet?.tutors?.[0]?.id || ''

    onChange(selectedPetId, tutorId)
  }

  return (
    <StyledSelect
      select
      value={value}
      onChange={handleChange}
      required={required}
      disabled={disabled || isLoading}
      error={error || !!fetchError}
      helperText={helperText || fetchError}
      placeholder="Selecione um pet"
      sx={{
        '& .MuiInputBase-root': {
          height: '42.4px',
          display: 'flex',
          alignItems: 'center'
        }
      }}
    >
      <StyledMenuItem value="">
        <em>Selecione um pet</em>
      </StyledMenuItem>
      {pets.map((pet) => (
        <StyledMenuItem key={pet.id} value={pet.id}>
          {pet.nome} - {pet.especie} ({pet.raca})
        </StyledMenuItem>
      ))}
    </StyledSelect>
  )
}
