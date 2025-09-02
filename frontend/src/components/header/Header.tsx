import * as S from './Header.styles'
import logo from '../../assets/logo.svg'

export function Header() {
  return (
    <S.HeaderContainer>
      <img src={logo} />
    </S.HeaderContainer>
  )
}
