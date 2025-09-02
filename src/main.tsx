import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ThemeProvider } from 'styled-components'
import { App } from './App'
import './index.css'
import theme from './theme'
import { Home } from './pages/home'
import { Tutors } from './pages/tutors'
import { Pets } from './pages/pets'
import { Bookings } from './pages/bookings'
import { Payments } from './pages/payments'

const root = document.getElementById('root') as HTMLElement

createRoot(root).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </App>
    </BrowserRouter>
  </ThemeProvider>
)
