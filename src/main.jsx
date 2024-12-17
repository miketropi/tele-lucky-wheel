import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import { LuckyWheelContextPrivider } from './context/AppContext.jsx';
import App from './App.jsx';
import UpdateContact from './pages/UpdateContact.jsx';
import AdminView from './pages/AdminView.jsx';
import { AdminViewContextProvider } from './context/AdminViewContext.jsx';
import WebApp from '@twa-dev/sdk';

WebApp.ready();

createRoot(document.getElementById('root')).render(
  <LuckyWheelContextPrivider WebApp={ WebApp }>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="/update-contact" element={<UpdateContact />} />
          <Route path="/admin-view" element={<AdminViewContextProvider><AdminView /></AdminViewContextProvider>} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </LuckyWheelContextPrivider>,
)
