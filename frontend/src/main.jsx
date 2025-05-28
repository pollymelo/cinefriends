import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
//import { useForm, SubmitHandler } from 'react-hook-form';
import Home from './Pages/Home';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
