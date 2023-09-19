/* Import du style */
import "./login.scss"

/* Import des fonctions, variables & images */
import imgRetry from "../../assets/images/icones/failure.png"
import { colorMsg, colorMsgForm } from "../../js/utils.js"

/* Import des composants */
import Spinner from "../../components/loader/Spinner"

/* Import des Hooks & composants react-rooter */
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"

const SignUpRetry = () => {

    /* ------------------------------------------------------------------------------------------------- */
    /* --------------------------------------- PARTIE JAVASCRIT ---------------------------------------- */
    /* ------------------------------------------------------------------------------------------------- */

    const navigate = useNavigate()
    const location = useLocation()
    const message = location.state || null

    // Messages et focus d'erreur
    const[errorMessage, setErrorMessage] = useState({libelle: "", color: ""})
    const[controlEmail, setControlEmail] = useState({color: ""})
    const[email, setEmail] = useState("")
    const[displaySpinner, setDisplaySpinner] = useState(null)

    // Gestion du champ Email
    const handleEmailChange = (event) => {
        const val = event.target.value.trim()
        const exp = /([\w-.]+@[\w.]+\.{1}[\w]+)/
        let color = ""

        if(val.length >= 1) {
            color = (exp.test(val) ? colorMsgForm.success : colorMsgForm.error)
        }

        setEmail(val);
        setErrorMessage({libelle: "", color: ""})
        setControlEmail({color: color})
    }
        
    /*********************************************************
    API GET
    - Envoi d'un nouveau mail de vérification de l'adresse mail du user
    *********************************************************/
    const handleClickSubmit = (event) => {
        event.preventDefault()

        if(email === "") setControlEmail({color: colorMsgForm.error})

        if(controlEmail.color !== colorMsgForm.success)  {
            setErrorMessage({libelle: "Veuillez remplir correctement le champ S.V.P.", color: colorMsg.error})
            return
        }

        setDisplaySpinner(true)

        fetch("http://localhost:3001/api/user/sendmail/confirmemail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email: email})
            })
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                // Erreur compte inconnu, adresse email déjà vérifiée...
                if(["ERR_REQUEST", "ERR_NOT_FOUND"].includes(res.status)) {
                    setErrorMessage({libelle: res.message, color: colorMsg.error})
                    setDisplaySpinner(false)
                    return
                }
                // Token absent - Droits insuffisants - Erreur serveur
                if(["ERR_SERVER"].includes(res.status)) {
                    navigate("/erreur", {state: res.message})
                    return
                }

                navigate('/connect-info',{
                    state: {
                        title: "Finaliser l'inscription",
                        message: "Veuillez finaliser votre inscription en cliquant sur le lien qui vous a été envoyé par mail à l'adresse suivante :",
                        email: email,
                    }
                })
            })
    }

    /* ------------------------------------------------------------------------------------------------- */
    /* ------------------------------------------ PARTIE JSX ------------------------------------------- */
    /* ------------------------------------------------------------------------------------------------- */

    return (
        <main className="main-login">
            <section className="login">
                {displaySpinner && 
                    <div className="login-spinner-absolute">
                        <Spinner />
                    </div>
                }
                <h1>Game Over !</h1>
                <div className="login-image">
                    <img src={imgRetry} alt="Logo échec"/>
                </div>
                {message &&
                    <div className="login-message-retry">{message}</div>
                }
                <div className="login-message" style={{backgroundColor: errorMessage.color}}>{errorMessage.libelle}</div>
                <form onSubmit={handleClickSubmit}>
                    <div className="login-cellule">
                        <label>
                            <input className="logo-email" type="text" tabIndex="1" placeholder="Veuillez saisir votre adresse Email S.V.P." maxLength="254" value={email} onChange={(e) => handleEmailChange(e)} style={{borderColor: controlEmail.color}} />
                        </label>
                    </div>
                    <input className="btn-login btn-login-retry" tabIndex="3" type="submit" value="Renvoyer un email de confirmation" />
                    <div className="login-back">
                        <Link to="/">Page d'accueil</Link>
                    </div> 
                </form>
            </section>
        </main>
    )
}

export default SignUpRetry