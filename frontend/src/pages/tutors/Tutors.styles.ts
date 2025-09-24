import styled from "styled-components";

export const Container = styled.main`
  padding: 2rem 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.h2};
  color: ${({ theme }) => theme.colors.textTertiary};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    color: ${({ theme }) => theme.colors.accentLavender};
  }
`;

export const NewTutorButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondaryButton};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1.2rem 2.4rem;
  font-size: ${({ theme }) => theme.fontSize.p};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(151, 190, 208, 1)
  }
`;

export const TutorListContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.accentWhite};
  border-radius: 12px;
  padding: 1.5rem 3rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  flex: 1;
`;

// Usando Grid para alinhar as colunas facilmente
const listGridTemplate = "2fr 3fr 2fr 1fr";

export const TutorListHeader = styled.div`
  display: grid;
  grid-template-columns: ${listGridTemplate};
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  span {
    font-size: ${({ theme }) => theme.fontSize.small};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    text-transform: uppercase;
  }
`;

export const TutorListRow = styled.div`
  display: grid;
  grid-template-columns: ${listGridTemplate};
  align-items: center;
  padding: 1.8rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const TutorCell = styled.span`
  font-size: ${({ theme }) => theme.fontSize.p};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const IconCell = styled.div`
  display: flex;
  justify-content: center;
`;

export const ViewButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    color: ${({ theme }) => theme.colors.accentBlue};
    font-size: 2.4rem;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const StatusMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSize.h5};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-top: 4rem;
`;