import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from "./routes/Route.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
)
