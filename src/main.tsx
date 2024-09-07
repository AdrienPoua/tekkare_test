import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './contexts/theme-provider.tsx'
import { DeviceProvider } from './contexts/breakpoints.tsx'
import { PrivateModeProvider } from './contexts/privateMode.tsx'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <DeviceProvider>
        <PrivateModeProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </QueryClientProvider>
        </PrivateModeProvider>
      </DeviceProvider>
    </ThemeProvider>
  </StrictMode>
)
