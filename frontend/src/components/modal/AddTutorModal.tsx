import React, { useState } from 'react';
import api from '../../services/api';
import * as S from './AddTutorModal.styles';

interface AddTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface TutorFormData {
  name: string;
  phone: string;
  cpf: string;
}

export function AddTutorModal({ isOpen, onClose, onSuccess }: AddTutorModalProps) {
  const [formData, setFormData] = useState<TutorFormData>({
    name: '',
    phone: '',
    cpf: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro quando usuário começar a digitar
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await api.post('/tutors/', formData);
      onSuccess();
      onClose();
      // Resetar formulário
      setFormData({ name: '', phone: '', cpf: '' });
    } catch (err: any) {
      console.error('Erro ao criar tutor:', err);
      setError(err.response?.data?.detail || 'Erro ao cadastrar tutor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({ name: '', phone: '', cpf: '' });
      setError(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={handleClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>Novo tutor</S.ModalTitle>
          <S.CloseButton onClick={handleClose}>×</S.CloseButton>
        </S.ModalHeader>
        
        <S.ModalBody>
          <S.Form onSubmit={handleSubmit}>
            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
            
            <S.FormGroup>
              <S.Label htmlFor="name">Nome completo</S.Label>
              <S.Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="phone">Telefone</S.Label>
              <S.Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="cpf">CPF</S.Label>
              <S.Input
                id="cpf"
                name="cpf"
                type="text"
                value={formData.cpf}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </S.FormGroup>
          </S.Form>
        </S.ModalBody>
        
        <S.ModalFooter>
          <S.CancelButton onClick={handleClose} disabled={isLoading}>
            Cancelar
          </S.CancelButton>
          <S.SubmitButton 
            type="submit" 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </S.SubmitButton>
        </S.ModalFooter>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}
