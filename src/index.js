import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// STYLES : BOOTSTRAP, SCSS (global)
import "bootstrap/dist/css/bootstrap.css";
import "./styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

