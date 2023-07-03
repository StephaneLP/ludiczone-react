import "./errors.scss"
import imgError from "../../assets/images/errors/error.gif"
import NoMenu from "../../layout/menu/NoMenu"
import { Link, useLocation } from 'react-router-dom'

const PageError = () => {
    const location = useLocation()

    // Message d'erreur passé en paramètre
    const message = location.state || null
    
    return (
        <main>
            <NoMenu />
            <section className="container d-flex flex-column align-items-center error">
                <p className="parag">Oups, une erreur est survenue...</p>
                {message &&
                    <div className="error-message">
                        {message}
                    </div>
                }
                <img src={imgError} alt="Erreur inconnue"></img>
                <div>
                    <Link to="/" className="btn">Retourner à la page d'accueil</Link>         
                </div>
            </section>
        </main>
    )
}

export default PageError