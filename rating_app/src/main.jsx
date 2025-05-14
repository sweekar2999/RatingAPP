import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StoreProvider } from './context/StoreContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
