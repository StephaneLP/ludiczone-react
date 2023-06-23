//////////////////////////////////////////////////////////
// IMPORTS                                              //
//////////////////////////////////////////////////////////

import 'bootstrap/dist/js/bootstrap.js';
import "bootstrap/dist/css/bootstrap.css";
import "./styles/base/index.scss";

/* Import des dépendances */
import React from 'react';
import ReactDOM from 'react-dom/client';

/* Import des composants */
import App from './App';
import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";

//////////////////////////////////////////////////////////
// JSX                                                  //
//////////////////////////////////////////////////////////

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <>
            <Header />
            <App />
            <Footer />
        </>
    </React.StrictMode>
)
