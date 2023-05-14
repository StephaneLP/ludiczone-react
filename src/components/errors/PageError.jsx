import "./errors.scss"
import Menu from "../../layout/menu/Menu"
import imgError from "../../assets/images/errors/error.gif"

import { useLocation } from 'react-router-dom'

const PageError = () => {
    const location = useLocation()
    const message = location.state.message

    return (
        <main>
            <Menu />
            <section className="container d-flex flex-column align-items-center error">
                <p className="parag">Oups, une erreur est survenue...</p>
                <div className="error-message">
                    {message}
                </div>
                <img src={imgError} alt="Erreur inconnue"></img>          
            </section>
        </main>
    )
}

export default PageError