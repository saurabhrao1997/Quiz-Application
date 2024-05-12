import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QuestionState } from './Component/Context/QuestionContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  
    <BrowserRouter>
    <QuestionState>
    <App />
    </QuestionState>
    </BrowserRouter>
    
  </React.StrictMode>,
)
