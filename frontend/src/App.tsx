import { Navigate, Outlet } from 'react-router-dom'
import { Aside } from './components/aside'
import { Header } from './components/header'
import * as S from './App.styles'

export function App() {
  const isAuthenticated = !!localStorage.getItem('authToken')

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <S.AppContainer>
      <Header />
      <S.AppBody>
        <Aside />
        <S.MainContent>
          <Outlet />
        </S.MainContent>
      </S.AppBody>
    </S.AppContainer>
  )
}
