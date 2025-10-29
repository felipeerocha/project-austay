import { CircularProgress } from '@mui/material'
import styled from 'styled-components'
import { PiPawPrintFill as PiPawPrintFillBase } from 'react-icons/pi'
import { BiSolidRightArrow } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa'

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

export const NewBookingButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondaryButton};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1.2rem 2.4rem;
  font-size: ${({ theme }) => theme.fontSize.p};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  &:hover {
    background-color: rgba(68, 130, 159, 1);

    svg {
      transform: translateX(2px);
    }
  }
`

export const TutorListContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.accentWhite};
  border-radius: 12px;
  padding: 1.5rem 3rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  flex: 1;
`

const listGridTemplate = '2fr 3fr 2fr 1fr'

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
`

export const TutorListRow = styled.div`
  display: grid;
  grid-template-columns: ${listGridTemplate};
  align-items: center;
  padding: 1.8rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`

export const TutorCell = styled.span`
  font-size: ${({ theme }) => theme.fontSize.p};
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const IconCell = styled.div`
  display: flex;
  justify-content: center;
`

export const ViewButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  svg {
    color: ${({ theme }) => theme.colors.accentBlue};
    font-size: 2.4rem;
  }
`

export const StatusMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSize.h5};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-top: 4rem;
`

export const ArrowIcon = styled(BiSolidRightArrow)`
  color: white;
  font-size: 1.5rem;
  flex-shrink: 0;
  transition: transform 0.2s;
`

export const PlusIcon = styled(FaPlus)`
  color: white;
  font-size: 1.5rem;
  flex-shrink: 0;
  transition: transform 0.2s;
`

export const PaymentsListContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.accentWhite};
  border-radius: 12px;
  padding: 1.5rem 3rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  flex: 1;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
`

const paymentsGridTemplate = '1.5fr 1fr 1.8fr 1fr 0.8fr'

export const PaymentsListHeader = styled.div`
  display: grid;
  grid-template-columns: ${paymentsGridTemplate};
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  gap: 1rem;
`

export const SortableHeader = styled.span`
  font-size: ${({ theme }) => theme.fontSize.p};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;
  user-select: none;

  &:hover {
    color: ${({ theme }) => theme.colors.accentLavender};
  }
`

export const NonSortableHeader = styled.span`
  font-size: ${({ theme }) => theme.fontSize.p};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;
  user-select: none;

  &:hover {
    color: ${({ theme }) => theme.colors.accentLavender};
  }
`

export const PaymentsListRow = styled.div`
  display: grid;
  grid-template-columns: ${paymentsGridTemplate};
  align-items: center;
  padding: 1.8rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  gap: 1rem;

  &:last-child {
    border-bottom: none;
  }
`

export const PaymentCell = styled.span`
  font-size: ${({ theme }) => theme.fontSize.p};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.textSecondary};
  word-wrap: break-word;
  overflow: hidden;
`

interface StatusBadgeProps {
  status: 'pending' | 'paid' | 'overdue'
}

export const StatusBadge = styled.span<StatusBadgeProps>`
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-transform: uppercase;

  background-color: ${({ status }) =>
    status === 'pending'
      ? '#FFF3CD'
      : status === 'paid'
      ? '#D1ECF1'
      : '#F8D7DA'};

  color: ${({ status }) =>
    status === 'pending'
      ? '#856404'
      : status === 'paid'
      ? '#0C5460'
      : '#721C24'};
`
