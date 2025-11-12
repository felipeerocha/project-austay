import { CircularProgress } from '@mui/material'
import styled from 'styled-components'

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
`

export const PurpleSpinner = styled(CircularProgress)`
  .MuiCircularProgress-circle {
    stroke: ${({ theme }) => theme.colors.accentLavender};
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 0;
`

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.h4};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const TableHeader = styled.thead`
  background-color: ${({ theme }) => theme.colors.backgroundMedium};
`

export const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-transform: uppercase;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`

export const TableBody = styled.tbody``

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundMedium};
  }
`

export const TableCell = styled.td`
  padding: 1rem;
  font-size: ${({ theme }) => theme.fontSize.p};
  color: ${({ theme }) => theme.colors.textPrimary};
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

export const EmptyMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 3rem;
  font-style: italic;
`

