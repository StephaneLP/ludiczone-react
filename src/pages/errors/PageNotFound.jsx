//////////////////////////////////////////////////////////
// IMPORTS                                              //
//////////////////////////////////////////////////////////

import "./errors.scss"

/* Import des fonctions, variables & images */
import imgNotfound from "../../assets/images/errors/404-page-animation.gif"

/* Import des composants */
import NoMenu from "../../layout/menu/NoMenu"

/* Import des Hooks & composants react-rooter */
import { Link } from "react-router-dom"

//////////////////////////////////////////////////////////
// JSX                                                  //
//////////////////////////////////////////////////////////

const PageNotFound = () => {
    return (
        <main>
            <NoMenu />
            <section className="container error">
                <p className="parag">Oups, il semblerait que vous soyez arrivé sur une...</p>
                <h1>Page inconnue !</h1>
                <img src={imgNotfound} alt="Erreur 404 - Page inconnue"></img>
                <div>
                    <Link to="/" className="btn">Retourner à la page d'accueil</Link>         
                </div>
            </section>
        </main>
    )
}

export default PageNotFound