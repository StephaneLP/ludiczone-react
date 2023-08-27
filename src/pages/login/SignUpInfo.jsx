/* Import du style */
import "./signUp.scss"

/* Import des fonctions, variables & images */
import imgSignUp from "../../assets/images/icones/hourglass.png"
import imgTriangle from "../../assets/images/icones/arrow.png"
import imgWarning from "../../assets/images/icones/warning.png"

/* Import des Hooks & composants react-rooter */
import { Link, useLocation } from "react-router-dom"

const SignUpInfo = () => {
    const location = useLocation()
    const email = (location.state ? location.state.email : "...")

    return (
        <>
        <main className="main-signup">
            <section className="signup">
                <h1>Finaliser l'inscription</h1>
                <div className="signup-image">
                    <img src={imgSignUp} alt="Chronomètre"/>
                </div>
                <div className="signup-info">
                    <p>Veuillez finaliser votre inscription en cliquant sur le lien qui vous a été envoyé par mail à l'adresse suivante :</p>
                    <p className="email">{email}</p>
                    <p className="note"><img src={imgWarning} alt="Flèche"/>Durée de validité du lien : 5mn</p>
                </div>
                <div className="signup-back">
                    <Link className="signup-link" to="/"><img src={imgTriangle} alt="Flèche"/>Page d'accueil</Link>
                </div>
            </section>
        </main>
        </>
    )
}

export default SignUpInfo
