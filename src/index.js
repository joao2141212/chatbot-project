// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n'; // Importa o i18n

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
