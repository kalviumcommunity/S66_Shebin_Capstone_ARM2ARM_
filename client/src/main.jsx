import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ClerkProvider} from "@clerk/clerk-react"
import './index.css'
import App from './App.jsx'

const Clerk_Key=import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if(!Clerk_Key) throw new Error("Clerk Key Required")

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={Clerk_Key}>
      <App />
    </ClerkProvider>
  </StrictMode>,
)
