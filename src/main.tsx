import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="max-w-full h-screen overflow-x-hidden">
        <App />
      </div>
    </BrowserRouter>
  </React.StrictMode>,
)
