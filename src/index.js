// STYLES : BOOTSTRAP, SCSS (global)
import 'bootstrap/dist/js/bootstrap.js';
import "bootstrap/dist/css/bootstrap.css";
import "./styles/base/index.scss";

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <>
            <Header />
            <App />
            <Footer />
        </>
    </React.StrictMode>
);
