/* Import du style */
import "./login.scss"

/* Import des fonctions, variables & images */
import imgTriangle from "../../assets/images/icones/arrow.png"


/* Import des Hooks & composants react-rooter */
import { Link, useLocation } from "react-router-dom"

const SignUpInfo = () => {
    const location = useLocation()
    const email = (location.state ? location.state.email : "...")

    return (
        <>
        <main className="main-login">
            <section className="login">
                <Link to="/">
                    <div className="login-img" alt="Logo LudicZone"></div>
                </Link>
                <h1>Finaliser l'inscription</h1>
                <div className="login-info">
                    <p>Veuillez finaliser votre inscription en cliquant sur le lien qui vous a été envoyé par mail à l'adresse suivante :</p>
                    <p className="email">{email}</p>
                    <p className="note">Durée de validité du lien : 5mn</p>
                </div>
                <div className="login-forgotten">
                    <Link className="login-link" to="/"><img src={imgTriangle} alt="Flèche"/>Page d'accueil</Link>
                </div>
            </section>
        </main>
        </>
    )
}

export default SignUpInfo
