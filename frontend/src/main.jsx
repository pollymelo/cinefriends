import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './Pages/Home';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
