import styled, { css } from 'styled-components'

export const Container = styled.main`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`

export const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: ${({ theme }) => theme.fontSize.h2};
  color: ${({ theme }) => theme.colors.textTertiary};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};

  svg {
    color: ${({ theme }) => theme.colors.accentLavender};
  }
`

export const ScheduleButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1.2rem 2.4rem;
  border: none;
  border-radius: 12px;
  background: #54b3ce;
  color: ${({ theme }) => theme.colors.accentWhite};
  font-size: ${({ theme }) => theme.fontSize.p};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  cursor: pointer;
  transition: background 0.2s ease;
  box-shadow: 0 2px 8px rgba(84, 179, 206, 0.25);

  &:hover {
    background: #4a9fb8;
  }

  svg {
    font-size: 1.6rem;
  }
`

export const CalendarCard = styled.section`
  background: ${({ theme }) => theme.colors.accentWhite};
  border-radius: 28px;
  padding: 3.2rem;
  box-shadow: 0 32px 60px rgba(134, 105, 217, 0.14);
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
`

export const MonthButton = styled.button`
  width: 3.6rem;
  height: 3.6rem;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.backgroundMedium};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textTertiary};
  font-size: 2.4rem;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accentLavender}1a;
    transform: translateY(-1px);
  }
`

export const MonthLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.h3};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textSecondary};
  min-width: 24rem;
  text-align: center;
  text-transform: capitalize;
`

export const DayNamesRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.4rem;
  padding: 0 0.4rem;
`

export const DayName = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 0.04em;
  height: 2.8rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.backgroundMedium};
`

export const WeeksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

export const WeekRow = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.4rem;
  min-height: 12rem;
  padding: 0.4rem;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(246, 247, 251, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%);
  box-shadow: inset 0 0 0 1px rgba(134, 105, 217, 0.08);
`

export const DayCell = styled.div<{
  $isCurrentMonth: boolean
  $isToday: boolean
}>`
  position: relative;
  background: ${({ $isCurrentMonth, theme }) =>
    $isCurrentMonth ? theme.colors.accentWhite : theme.colors.backgroundMedium};
  border-radius: 14px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  border: 1px solid rgba(134, 105, 217, 0.1);
  transition: border 0.2s ease, box-shadow 0.2s ease;

  ${({ $isToday, theme }) =>
    $isToday &&
    css`
      border: 1.5px solid ${theme.colors.accentBlue};
      box-shadow: 0 0 0 3px rgba(84, 179, 206, 0.18);
    `}
`

export const DayNumber = styled.span<{
  $isCurrentMonth: boolean
}>`
  align-self: flex-end;
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ $isCurrentMonth, theme }) =>
    $isCurrentMonth ? theme.colors.textPrimary : 'rgba(0, 0, 0, 0.35)'};
`

export const EventsLayer = styled.div<{
  $laneCount: number
}>`
  position: absolute;
  left: 0.8rem;
  right: 0.8rem;
  bottom: 0.8rem;
  top: 3.8rem;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: ${({ $laneCount }) =>
    `repeat(${Math.max($laneCount, 1)}, 3.2rem)`};
  gap: 0.6rem;
  pointer-events: none;
`

export const EventPill = styled.div<{
  $background: string
  $border: string
  $isTruncatedStart: boolean
  $isTruncatedEnd: boolean
}>`
  pointer-events: auto;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.7rem 1.4rem;
  border-radius: 14px;
  font-size: 1.3rem;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.accentWhite};
  background: ${({ $background }) => $background};
  border: 2px solid ${({ $border }) => $border};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${({ $isTruncatedStart }) =>
    $isTruncatedStart &&
    css`
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    `}

  ${({ $isTruncatedEnd }) =>
    $isTruncatedEnd &&
    css`
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    `}
`

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  padding: 5rem 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.p};
`

