/* Import du style */
import "./login.scss"

/* Import des fonctions, variables & images */
import imgWarning from "../../assets/images/icones/failure.png"
import { colorMsg } from "../../js/utils.js"

/* Import des Hooks & composants react-rooter */
import { Link, useNavigate, useLocation } from "react-router-dom"

const SignUpRetry = () => {

    /* ------------------------------------------------------------------------------------------------- */
    /* --------------------------------------- PARTIE JAVASCRIT ---------------------------------------- */
    /* ------------------------------------------------------------------------------------------------- */

    const navigate = useNavigate()
    const location = useLocation
    const message = (location.state ? location.state.message : "...")

    /*********************************************************
    API GET
    - Envoi d'un nouveau mail de vérification l'adresse mail du user
    *********************************************************/
    const handleClickSubmit = () => {
        fetch("http://localhost:3001/api/user/sendnewmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }})
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                if(["SUCCESS"].includes(res.status)) {
                    navigate('/inscription-info',{
                        state: {
                            email: res.email
                        }
                    })
                    return
                }
                navigate("/erreur", {state: res.message})
            })
    }

    /* ------------------------------------------------------------------------------------------------- */
    /* ------------------------------------------ PARTIE JSX ------------------------------------------- */
    /* ------------------------------------------------------------------------------------------------- */

    return (
        <main className="main-login">
            <section className="login">
                <h1>Game Over !</h1>
                <div className="login-image">
                    <img src={imgWarning} alt="Logo échec"/>
                </div>
                <div style={{backgroundColor: colorMsg.error}} className="login-message">{message}</div>
                <button className="btn-login btn-login-confirm" onClick={handleClickSubmit}>Renvoyer un mail de confirmation</button>
                <div className="login-back">
                    <Link to="/">Page d'accueil</Link>
                </div> 
            </section>
        </main>
    )
}

export default SignUpRetry