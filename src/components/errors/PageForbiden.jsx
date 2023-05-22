import "./errors.scss"
import NoMenu from "../../layout/menu/NoMenu"
import imgForbiden from "../../assets/images/errors/forbiden.gif"

import { Link, useLocation, useNavigate } from "react-router-dom"

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