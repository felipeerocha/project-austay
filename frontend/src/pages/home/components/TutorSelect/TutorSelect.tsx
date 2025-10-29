import React from 'react'
import { useTutors } from '../../../tutors/hooks/useTutors'
import {
  StyledSelect,
  StyledMenuItem
} from '../../../pets/components/NewPetModal/NewPetModal.styles'

interface TutorSelectProps {
  value: string
  onChange: (tutorId: string) => void
  required?: boolean
  disabled?: boolean
  error?: boolean
  helperText?: string
}

export const TutorSelect: React.FC<TutorSelectProps> = ({
  value,
  onChange,
  required = false,
  disabled = false,
  error = false,
  helperText
}) => {
  const { tutors, isLoading, error: fetchError } = useTutors()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTutorId = event.target.value
    onChange(selectedTutorId)
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
      placeholder="Selecione um tutor"
      sx={{
        '& .MuiInputBase-root': {
          height: '42.4px',
          width: '295px',
          display: 'flex',
          alignItems: 'center'
        }
      }}
    >
      <StyledMenuItem value="">
        <em>Selecione um tutor</em>
      </StyledMenuItem>
      {tutors.map((tutor) => (
        <StyledMenuItem key={tutor.id} value={tutor.id}>
          {tutor.name} - {tutor.phone}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  )
}
