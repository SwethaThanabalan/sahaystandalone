import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SahayCaseStudy from './pages/SahayCaseStudy'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SahayCaseStudy />} />
        <Route path="*" element={<SahayCaseStudy />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
