import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 90%;
  max-width: 800px;
  max-height: 85vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9fafb;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background-color: #e5e7eb;
    color: #374151;
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
  flex: 1;
  overflow-y: auto;
`;

export const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  display: flex;
  justify-content: flex-end;
`;

export const CloseModalButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondaryButton};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(151, 190, 208, 1);
  }
`;

export const PetsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
`;

export const TableHeader = styled.thead`
  background: #f3f4f6;
`;

export const TableHeaderCell = styled.th`
  padding: 16px 20px;
  text-align: left;
  font-weight: 600;
  font-size: 1.3rem;
  color: #374151;
  border-bottom: 1px solid #d1d5db;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:hover {
    background: #f9fafb;
  }
`;

export const TableCell = styled.td`
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  color: #111827;
  font-size: 1.2rem;
`;

export const NoPetsMessage = styled.div`
  text-align: center;
  color: #6b7280;
  font-style: italic;
  font-size: 1.4rem;
  padding: 40px 20px;
  background: #f9fafb;
  border-radius: 8px;
  border: 2px dashed #d1d5db;
`;
