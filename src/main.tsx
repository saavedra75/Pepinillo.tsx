import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ShipProvider } from './context/ShipContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ShipProvider>
      <App />
    </ShipProvider> 
  </StrictMode>,
)
