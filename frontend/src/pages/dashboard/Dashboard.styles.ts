import { CircularProgress } from '@mui/material'
import styled from 'styled-components'

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

export const StatusMessage = styled.p`
  font-size: ${({ theme }) => theme.fontSize.h5};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin-top: 4rem;
`

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`

export const MetricCard = styled.div`
  background-color: ${({ theme }) => theme.colors.accentWhite};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
`

export const MetricIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.accentLavender};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    color: white;
    font-size: 2.4rem;
  }
`

export const MetricContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const MetricLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-transform: uppercase;
`

export const MetricValue = styled.span`
  font-size: ${({ theme }) => theme.fontSize.h3};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`

export const MetricSubtext = styled.span`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
`

interface ProgressFillProps {
  width: number
}

export const ProgressFill = styled.div<ProgressFillProps>`
  height: 100%;
  background-color: ${({ theme, width }) =>
    width >= 80
      ? theme.colors.accentRed
      : width >= 60
      ? '#FFA500'
      : theme.colors.accentGreen};
  width: ${({ width }) => Math.min(width, 100)}%;
  transition: width 0.3s ease;
`

export const Section = styled.div`
  background-color: ${({ theme }) => theme.colors.accentWhite};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.h4};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  margin-bottom: 2rem;
`

export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const TimelineItem = styled.div<{ hasMovements: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.backgroundMedium};
  border-left: 4px solid ${({ theme, hasMovements }) =>
    hasMovements ? theme.colors.accentLavender : theme.colors.border};
  border-right: ${({ theme, hasMovements }) =>
    hasMovements ? `1px solid ${theme.colors.border}` : 'none'};
  border-top: ${({ theme, hasMovements }) =>
    hasMovements ? `1px solid ${theme.colors.border}` : 'none'};
  border-bottom: ${({ theme, hasMovements }) =>
    hasMovements ? `1px solid ${theme.colors.border}` : 'none'};
  cursor: ${({ hasMovements }) => (hasMovements ? 'pointer' : 'default')};
  transition: all 0.2s ease;

  ${({ hasMovements, theme }) =>
    hasMovements &&
    `
    background-color: ${theme.colors.accentWhite};
    box-shadow: 0 1px 4px rgba(134, 105, 217, 0.1);
    
    &:hover {
      transform: translateX(2px);
      box-shadow: 0 2px 8px rgba(134, 105, 217, 0.2);
      border-left-width: 6px;
    }
  `}
`

export const DayInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 120px;
`

export const DayName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.h5};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`

export const DayDate = styled.span`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`


export const MovementsInfo = styled.div`
  display: flex;
  gap: 2rem;
  flex: 1;
`

interface MovementItemProps {
  type: 'checkin' | 'checkout'
}

export const MovementItem = styled.div<MovementItemProps>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`

export const MovementIcon = styled.span<MovementItemProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme, type }) =>
    type === 'checkin' ? theme.colors.accentGreen : theme.colors.accentBlue};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  flex-shrink: 0;
`

export const MovementText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.p};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`


export const LoadMoreButton = styled.button`
  background-color: ${({ theme }) => theme.colors.accentLavender};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: ${({ theme }) => theme.fontSize.p};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1.5rem;
  width: 100%;

  &:hover {
    background-color: rgba(134, 105, 217, 0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const PetsListContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.accentWhite};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 3rem;
`

export const PetsListHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1.5fr 1.5fr 1fr 1fr 1fr;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  gap: 1rem;
`

export const PetsListHeaderCell = styled.span`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-transform: uppercase;
  text-align: center;
`

export const PetsListRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1.5fr 1.5fr 1fr 1fr 1fr;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  gap: 1rem;

  &:last-child {
    border-bottom: none;
  }
`

export const PetsListCell = styled.span`
  font-size: ${({ theme }) => theme.fontSize.p};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const PaymentBadge = styled.span<{ paid: boolean }>`
  display: inline-block;
  padding: 0.4rem 1rem;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-transform: uppercase;
  background-color: ${({ paid }) => (paid ? '#D1ECF1' : '#FFF3CD')};
  color: ${({ paid }) => (paid ? '#0C5460' : '#856404')};
`

export const EmptyPetsMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 2rem;
  font-style: italic;
`

export const RowActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.8rem;
`

export const ActionButton = styled.button<{ $variant?: 'danger' }>`
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  background: ${({ theme, $variant }) =>
    $variant === 'danger' ? theme.colors.accentRed : `${theme.colors.accentLavender}1a`};
  color: ${({ theme, $variant }) =>
    $variant === 'danger' ? theme.colors.accentWhite : theme.colors.textTertiary};
  box-shadow: ${({ $variant }) =>
    $variant === 'danger'
      ? '0 8px 18px rgba(200, 35, 51, 0.25)'
      : '0 8px 16px rgba(134, 105, 217, 0.15)'};
  font-size: 1.6rem;

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

