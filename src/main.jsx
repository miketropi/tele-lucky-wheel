import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import { LuckyWheelContextPrivider } from './context/AppContext.jsx';
import App from './App.jsx';
import UpdateContact from './pages/UpdateContact.jsx';
import AdminView from './pages/AdminView.jsx';
import InitForm from './pages/InitForm.jsx';
import Welcome from './pages/Welcome.jsx';
import LuckyWheel from './pages/LuckyWheel.jsx';
import Thankyou from './pages/Thankyou.jsx';
import EndGame from './pages/EndGame.jsx';
import ErrorScreen from './pages/ErrorScreen.jsx';
import UserInfo2 from './pages/UserInfo2.jsx';
import { AdminViewContextProvider } from './context/AdminViewContext.jsx';
import WebApp from '@twa-dev/sdk';

WebApp.ready();

createRoot(document.getElementById('root')).render(
  <LuckyWheelContextPrivider WebApp={ WebApp }>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route index element={<Welcome />} />
          <Route path="/update-userinfo" element={<InitForm />} />
          <Route path="/update-userinfo" element={<InitForm />} />
          <Route path="/updateinfo2" element={<UserInfo2 />} />
          <Route path="/luckywheel" element={<LuckyWheel />} />
          <Route path="/thankyou" element={<Thankyou />} />
          <Route path="/endgame" element={<EndGame />} />
          <Route path="/error" element={<ErrorScreen />} />
          {/* <Route path="/update-contact" element={<UpdateContact />} /> */}
          <Route path="/admin-view" element={<AdminViewContextProvider><AdminView /></AdminViewContextProvider>} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </LuckyWheelContextPrivider>,
)
