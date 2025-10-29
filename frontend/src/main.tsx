import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import theme from './theme'

import { Home } from './pages/home'
import { Tutors } from './pages/tutors'
import { Pets } from './pages/pets'
import { Bookings } from './pages/bookings'
import { Payments } from './pages/payments'
import { Dashboard } from './pages/dashboard'
import { Login } from './pages/auth'
import { App } from './App'

const root = document.getElementById('root') as HTMLElement

createRoot(root).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <ToastContainer theme="light" style={{ zIndex: 9999 }} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<App />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/payments" element={<Payments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
)
