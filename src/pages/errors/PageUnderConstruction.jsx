import "./errors.scss"
import NoMenu from "../../layout/menu/NoMenu"
import imgUnderConstruction from "../../assets/images/errors/UnderConstruction.gif"

import { Link } from 'react-router-dom'

const PageUnderConstruction = () => {
    return (
        <main>
            <NoMenu />
            <section className="container d-flex flex-column align-items-center error">
                <p className="parag">Page en construction...</p>
                <img src={imgUnderConstruction} alt="En construction"></img>
                <div>
                    <Link to="/" className="btn">Retourner à la page d'accueil</Link>         
                </div>
            </section>
        </main>
    )
}

export default PageUnderConstruction