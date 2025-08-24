import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom' // {BrowserRouter}
import {AuthProvider} from './contexts/Auth'
createRoot(document.getElementById('root')).render(


    <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
    </BrowserRouter>
 
)
