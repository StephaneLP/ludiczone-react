import "./errors.scss"
import imgError from "../../assets/images/errors/error.gif"
import { useLocation } from 'react-router-dom'
import Header from "../../layout/header/HeaderNoMenu";

const PageError = () => {
    const location = useLocation()

    // Message d'erreur passé en paramètre
    const message = location.state || null
    
    return (
        <>
        <Header />
        <main>
            <section className="container d-flex flex-column align-items-center error">
                <p className="parag">Oups, une erreur est survenue...</p>
                {/* {message && */}
                    <div className="error-message">
                        {message}
                        Il s'est passé une drôle d'erreur par ici !!!
                    </div>
                {/* } */}
                <img src={imgError} alt="Erreur inconnue"></img>
            </section>
        </main>
        </>
    )
}

export default PageError