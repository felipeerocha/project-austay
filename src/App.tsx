import { Aside } from './components/aside'
import { Header } from './components/header'
import * as S from './App.styles'
import type React from 'react'

type Props = {
  children: React.ReactNode
}

export function App({ children }: Props) {
  return (
    <S.AppContainer>
      <Header />
      <S.AppBody>
        <div>
          <Aside />
        </div>
        <S.MainContent>{children}</S.MainContent>
      </S.AppBody>
    </S.AppContainer>
  )
}
