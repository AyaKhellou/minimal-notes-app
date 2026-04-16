// Entry point for the React application
import { createRoot } from 'react-dom/client'
import './App.css'  // Import global styles
import App from './App.jsx'  // Import main App component

// Render the App component into the DOM
createRoot(document.getElementById('root')).render(
  <App />
)
