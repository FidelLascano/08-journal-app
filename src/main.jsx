import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import JournalApp from "./JournalApp.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <JournalApp />
    </BrowserRouter>
  </React.StrictMode>,
)
