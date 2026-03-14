import React from 'react';
import ReactDOM from 'react-dom/client';

// 1. This import is ESSENTIAL
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. This <BrowserRouter> wrapper is ESSENTIAL */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);