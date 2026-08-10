import React from 'react'
import ReactDOM from 'react-dom/client'
import BuilderPassApp from './components/BuilderPassApp.jsx'
import './generator.css'

ReactDOM.createRoot(document.getElementById('generator-root')).render(
  <React.StrictMode>
    <BuilderPassApp />
  </React.StrictMode>,
)
