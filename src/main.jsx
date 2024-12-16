import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import { LuckyWheelContextPrivider } from './context/AppContext.jsx';
import App from './App.jsx';
import UpdateContact from './pages/UpdateContact.jsx';
import WebApp from '@twa-dev/sdk';

WebApp.ready();

createRoot(document.getElementById('root')).render(
  <LuckyWheelContextPrivider WebApp={ WebApp }>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="/update-contact" element={<UpdateContact />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </LuckyWheelContextPrivider>,
)
