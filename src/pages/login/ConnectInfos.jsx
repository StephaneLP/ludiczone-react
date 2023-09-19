/* Import du style */
import "./login.scss"

/* Import des fonctions, variables & images */
import imglogin from "../../assets/images/icones/hourglass.png"
import imgTriangle from "../../assets/images/icones/arrow.png"
import imgWarning from "../../assets/images/icones/warning.png"

/* Import des Hooks & composants react-rooter */
import { Link, useLocation } from "react-router-dom"

const ConnectInfos = () => {
    let infos = {title: "...", message: "...", email: "..."}
    const location = useLocation()
    if(location.state) {
        infos = {title: location.state.title, message: location.state.message, email: location.state.email}
    }

    return (
        <>
        <main className="main-login">
            <section className="login">
                <h1>{infos.title}</h1>
                <div className="login-image">
                    <img src={imglogin} alt="Chronomètre"/>
                </div>
                <div className="login-info">
                    <p>{infos.message}</p>
                    <p className="email">{infos.email}</p>
                    <p className="note"><img src={imgWarning} alt="Flèche"/>Durée de validité du lien : 5mn</p>
                </div>
                <div className="login-back">
                    <Link to="/"><img src={imgTriangle} alt="Flèche"/>Page d'accueil</Link>
                </div>
            </section>
        </main>
        </>
    )
}

export default ConnectInfos
