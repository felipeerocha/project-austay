import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';


import * as S from './NewTutorModal.styles';

type NewTutorModalProps = {
  open: boolean;
  onClose: () => void;
};

export function NewTutorModal({ open, onClose }: NewTutorModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [pet, setPet] = useState('');

  const handleSave = () => {
    const tutorData = { name, phone, cpf, pet };
    console.log("Salvando novo tutor:", tutorData);
    onClose();
  };

  return (
    <S.ModalContainer open={open} onClose={onClose}>
      
      <S.ModalHeader>
        <h2>Novo tutor</h2>
        <S.CloseButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </S.CloseButton>
      </S.ModalHeader>
      
      <S.FormContainer component="form" noValidate autoComplete="off">
        <S.StyledTextField 
          label="Nome completo" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth 
        />
        <S.StyledTextField 
          label="Telefone" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth 
        />
        <S.StyledTextField 
          label="CPF" 
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          fullWidth 
        />

        <S.PetSelectionContainer>
          <S.StyledSelect
            select
            label="Pet"
            value={pet}
            onChange={(e) => setPet(e.target.value)}
          >
            <S.StyledMenuItem value=""><em>Nenhum</em></S.StyledMenuItem>
            <S.StyledMenuItem value="pet1">Rex</S.StyledMenuItem>
            <S.StyledMenuItem value="pet2">Totó</S.StyledMenuItem>
          </S.StyledSelect>
          <S.SecondaryButton>Novo pet +</S.SecondaryButton>
        </S.PetSelectionContainer>
      </S.FormContainer>

      <S.ActionsContainer>
        <S.TextButton onClick={onClose}>
          Cancelar
        </S.TextButton>
        <S.PrimaryButton onClick={handleSave}>
          Cadastrar
        </S.PrimaryButton>
      </S.ActionsContainer>
    </S.ModalContainer>
  );
}