import type { IconName } from '../../types/iconName'
import type { PagesPath } from '../../types/pagesPath'
import * as S from './Menu.styles'

type Props = {
  label: string
  icon: IconName
  navigateTo: PagesPath
}

export function MenuItem({ label, icon, navigateTo }: Props) {
  return (
    <S.MenuItemContainer to={navigateTo}>
      <S.Icon name={icon} fontSize="large" />
      <S.Label>{label}</S.Label>
    </S.MenuItemContainer>
  )
}
