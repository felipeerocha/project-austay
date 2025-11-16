import { CircularProgress } from '@mui/material'
import styled from 'styled-components'
import { PiPawPrintFill as PiPawPrintFillBase } from 'react-icons/pi'


export const Container = styled.main`
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`


export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 5rem;
`

export const PurpleSpinner = styled(CircularProgress)`
  .MuiCircularProgress-circle {
    stroke: ${({ theme }) => theme.colors.accentLavender};
  }
`


export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

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
`

export const PawIcon = styled(PiPawPrintFillBase)`
  cursor: pointer;
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.accentBlue};
`

export const NewPetButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondaryButton};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1.2rem 2.4rem;
  font-size: ${({ theme }) => theme.fontSize.p};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(68, 130, 159, 1);
  }
`

export const PetListContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.accentWhite};
  border-radius: 12px;
  padding: 1.5rem 3rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  flex: 1;
`

const listGridTemplate = '1fr 1fr 1fr 1fr 1fr 1fr'

export const PetListHeader = styled.div`
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
`

export const PetListRow = styled.div`
  display: grid;
  grid-template-columns: ${listGridTemplate};
  align-items: center;
  padding: 1.8rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`

export const PetCell = styled.span`
  font-size: ${({ theme }) => theme.fontSize.p};
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const IconCell = styled.div`
  display: flex;
  justify-content: center;

  svg {
    font-size: 2.2rem;
  }
`


export const StatusMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSize.h5};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-top: 4rem;
`
