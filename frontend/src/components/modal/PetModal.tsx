import React from 'react';
import type { Tutor } from '../../pages/tutors/types';
import * as S from './PetModal.styles';

interface PetModalProps {
  tutor: Tutor | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PetModal({ tutor, isOpen, onClose }: PetModalProps) {
  if (!isOpen || !tutor) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>Pets de {tutor.name}</S.ModalTitle>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.ModalHeader>
        
        <S.ModalBody>
          {tutor.pets.length === 0 ? (
            <S.NoPetsMessage>Este tutor não possui pets cadastrados.</S.NoPetsMessage>
          ) : (
            <S.PetsTable>
              <S.TableHeader>
                <S.TableHeaderCell>Nome do Pet</S.TableHeaderCell>
                <S.TableHeaderCell>ID</S.TableHeaderCell>
              </S.TableHeader>
              <S.TableBody>
                {tutor.pets.map((pet) => (
                  <S.TableRow key={pet.id}>
                    <S.TableCell>{pet.nome}</S.TableCell>
                    <S.TableCell>{pet.id}</S.TableCell>
                  </S.TableRow>
                ))}
              </S.TableBody>
            </S.PetsTable>
          )}
        </S.ModalBody>
        
        <S.ModalFooter>
          <S.CloseModalButton onClick={onClose}>
            Fechar
          </S.CloseModalButton>
        </S.ModalFooter>
      </S.ModalContent>
    </S.ModalOverlay>
  );
}