import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LuckyWheelContextPrivider } from './context/AppContext.jsx';
import App from './App.jsx';
import WebApp from '@twa-dev/sdk';

WebApp.ready();

createRoot(document.getElementById('root')).render(
  <LuckyWheelContextPrivider WebApp={ WebApp }>
    <StrictMode>
      <App />
    </StrictMode>
  </LuckyWheelContextPrivider>,
)
