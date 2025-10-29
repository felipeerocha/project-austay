import styled from 'styled-components'
import { BiSolidRightArrow } from 'react-icons/bi'

interface DateTagProps {
  type: 'current' | 'upcoming'
}

export const BookingSection = styled.div`
  margin-bottom: 2rem;
`

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.p};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  margin-bottom: 1rem;
`

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 3rem;
`

export const BookingCard = styled.div`
  background-color: ${({ theme }) => theme.colors.accentWhite};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`

export const CardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  position: relative;
  margin-bottom: 2rem;
`

export const PetAvatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.accentLavender};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const DefaultAvatar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.accentLavender};
  color: white;
  font-size: 1.5rem;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`

export const BookingInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const PetName = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.h5};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  margin: 0 0 0.25rem 0;
`

export const TutorName = styled.p`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`

export const ArrowIcon = styled(BiSolidRightArrow)`
  color: ${({ theme, type }) =>
    type === 'current' ? theme.colors.accentBlue : theme.colors.accentLavender};
  font-size: 2.5rem;
  flex-shrink: 0;
  transition: transform 0.2s, color 0.2s;

  ${BookingCard}:hover & {
    color: ${({ theme, type }) =>
      type === 'current'
        ? theme.colors.accentBlue
        : theme.colors.accentLavender};
    transform: translateX(3px);
  }
`

export const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export const DateTag = styled.span<DateTagProps>`
  display: inline-block;
  padding: 0.25rem 1rem;
  border-radius: 16px;
  font-size: ${({ theme }) => theme.fontSize.small};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: white;
  background-color: ${({ theme, type }) =>
    type === 'current' ? theme.colors.accentBlue : theme.colors.accentLavender};
  text-align: center;
`

export const EmptyMessage = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
  grid-column: 1 / -1;
  padding: 2rem;
`
