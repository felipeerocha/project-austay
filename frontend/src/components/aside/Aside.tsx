import * as S from './Aside.styles'
import dogs from '../../assets/dogs.svg'
import { Menu } from '../menu'

export function Aside() {
  return (
    <S.AsideContainer>
      <S.Content>
        <S.UserInfoContainer>
          <S.UserIconContainer>
            <p>L</p>
          </S.UserIconContainer>
          <S.UserName>Pet House da Liz</S.UserName>
        </S.UserInfoContainer>
        <S.Divider />
        <Menu />
      </S.Content>
      <img src={dogs} />
    </S.AsideContainer>
  )
}
