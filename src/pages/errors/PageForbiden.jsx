import "./errors.scss"

/* Import des fonctions, variables & images */
import imgForbiden from "../../assets/images/errors/forbiden.gif"

/* Import des composants */
import NoMenu from "../../layout/menu/NoMenu"

/* Import des Hooks & composants react-rooter */
import { Link } from "react-router-dom"

const PageError = () => {
    return (
        <main>
            <NoMenu />
            <section className="container d-flex flex-column align-items-center error">
                <p className="parag">Oups, Vous n'avez pas les droits pour accéder à cette page !</p>
                <img src={imgForbiden} alt="Erreur inconnue"></img>
                <div>
                    <Link to="/" className="btn">Retourner à la page d'accueil</Link>         
                </div>       
            </section>
        </main>
    )
}

export default PageError