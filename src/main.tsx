import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'

// Ensure DOM is fully loaded and ready
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root')
  if (!rootElement) {
    console.error('Root element not found')
    return
  }

  // Create root once DOM is ready
  const root = ReactDOM.createRoot(rootElement)
  
  // Render with StrictMode for better development experience
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})