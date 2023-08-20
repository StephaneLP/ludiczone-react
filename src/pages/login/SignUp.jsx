/* Import du style */
import "./login.scss"

/* Import des fonctions, variables & images */
import { colorMsg, colorMsgForm, cleanLocalStorage } from "../../js/utils.js"

/* Import des Hooks & composants react-rooter */
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const SignUp = () => {

    /* ------------------------------------------------------------------------------------------------- */
    /* --------------------------------------- PARTIE JAVASCRIT ---------------------------------------- */
    /* ------------------------------------------------------------------------------------------------- */

    const navigate = useNavigate()

    // Messages et focus d'erreur
    const[errorMessage, setErrorMessage] = useState({libelle: "", color: ""})
    const[controlNickName, setControlNickName] = useState({libelle: "Pseudo...", color: colorMsgForm.success})
    const[controlEmail, setControlEmail] = useState({libelle: "Email...", color: colorMsgForm.success})
    const[controlPassword, setControlPassword] = useState({libelle: "Mot de passe...", color: colorMsgForm.success})
    const[controlConfirmPassword, setControlConfirmPassword] = useState({libelle: "Confirmer le mot de passe...", color: colorMsgForm.success})

    // Identifiants & Mot de passe
    const[nickName, setNickName] = useState("StephaneLP")
    const[email, setEmail] = useState("ceodren@outlook.com")
    const[password, setPassword] = useState("Egs37000")
    const[confirmPassword, setConfirmPassword] = useState("Egs37000")

    // Gestion du champ Pseudo
    const handleNickNameChange = (event) => {
        const val = event.target.value.trim()
        const exp = /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]{5,}$/
        let color = ""

        if(val.length >= 1) {
            color = (exp.test(val) ? colorMsgForm.success : colorMsgForm.error)
        }

        setNickName(val);
        setErrorMessage({libelle: "", color: ""})
        setControlNickName({libelle: "Pseudo...", color: color})
    }

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
        setControlEmail({libelle: "Email...", color: color})
    }

    // Gestion du champ Mot de passe
    const handlePasswordChange = (event) => {
        const val = event.target.value.trim()
        const exp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
        let color = ""

        if(val.length >= 1) {
            color = (exp.test(val) ? colorMsgForm.success : colorMsgForm.error)
        }

        setPassword(event.target.value.trim());
        setErrorMessage({libelle: "", color: ""})
        setControlPassword({libelle: "Mot de passe...", color: color})
    }

    // Gestion du champ Confirmation du mot de passe
    const handleConfirmPasswordChange = (event) => {
        const val = event.target.value.trim()
        let color = ""

        if(val.length >= 1) {
            color = (val === password ? colorMsgForm.success : colorMsgForm.error)
        }

        setConfirmPassword(event.target.value.trim());
        setErrorMessage({libelle: "", color: ""})
        setControlConfirmPassword({libelle: "Confirmer le mot de passe...", color: color})
    }
    
    /*********************************************************
    API POST
    - authentification avec identifiant et mot de passe
    *********************************************************/
    const handleSubmit = (event) => {
        event.preventDefault()

        if(nickName === "") setControlNickName({libelle: "Veuillez renseigner un pseudo", color: colorMsgForm.error})
        if(email === "") setControlEmail({libelle: "Veuillez renseigner un email", color: colorMsgForm.error})
        if(password === "") setControlPassword({libelle: "Veuillez renseigner un mot de passe", color: colorMsgForm.error})
        if(confirmPassword === "") setControlConfirmPassword({libelle: "Veuillez confirmer le mot de passe", color: colorMsgForm.error})

        if(controlNickName.color !== colorMsgForm.success || controlEmail.color !== colorMsgForm.success || controlPassword.color !== colorMsgForm.success || controlConfirmPassword.color !== colorMsgForm.success) {
            setErrorMessage({libelle: "Veuillez remplir correctement les champs S.V.P.", color: colorMsg.error})
            return
        }

        const requestBody = JSON.stringify({
            nick_name: nickName,
            email: email,
            password: password,
        })

        fetch("http://localhost:3001/api/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: requestBody
            })
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                // Erreur identifiant ou mot de passe
                if(["ERR_CONSTRAINT","ERR_REQUEST","ERR_AUTHENTICATION"].includes(res.status)) {
                    setErrorMessage({libelle: res.message, color: colorMsg.error})
                    return
                }
                // Erreur serveur
                if(["ERR_SERVER"].includes(res.status)) {
                    navigate("/erreur", {state: res.message})
                    return
                }

                navigate(-1) // Retour au composant appelant
            })
            .catch((error) => {
                cleanLocalStorage()
                navigate('/erreur', {state: error.message})
            })
    }

    /* ------------------------------------------------------------------------------------------------- */
    /* ------------------------------------------ PARTIE JSX ------------------------------------------- */
    /* ------------------------------------------------------------------------------------------------- */

    return (
        <>
        <main className="main-login">
            <section className="login">
                <Link to="/">
                    <div className="login-img" ></div>
                </Link>
                <h1>Créer un compte</h1>
                <div className="login-message" style={{backgroundColor: errorMessage.color}}>{errorMessage.libelle}</div>
                <form onSubmit={handleSubmit}>
                    <div className="login-cellule">
                        <label>
                            <input className="logo-user" type="text" tabIndex="1" placeholder={controlNickName.libelle} maxLength="12" value={nickName} onChange={(e) => handleNickNameChange(e)} style={{borderColor: controlNickName.color}} />
                            <div className="login-cellule-message">
                                5 caractères minimum, composés de :<br />
                                - chiffres et lettres (sans accent)
                            </div>
                        </label>
                    </div>
                    <div className="login-cellule">
                        <label>
                            <input className="logo-email" type="text" tabIndex="1" placeholder={controlEmail.libelle} maxLength="254" value={email} onChange={(e) => handleEmailChange(e)} style={{borderColor: controlEmail.color}} />
                            <div className="login-cellule-message">ex : nom@domaine.com</div>
                        </label>
                    </div>
                    <div className="login-cellule">
                        <label>
                            <input className="logo-cadenas" type="password" tabIndex="2" placeholder={controlPassword.libelle} maxLength="30" value={password} onChange={(e) => handlePasswordChange(e)} style={{borderColor: controlPassword.color}} />
                            <div className="login-cellule-message">
                                8 caractères minimum, dont au moins :<br />
                                - une lettre minuscule<br />
                                - une lettre majuscule<br />
                                - un chiffre
                            </div>
                        </label>
                    </div>
                    <div className="login-cellule">
                        <label>
                            <input className="logo-cadenas" type="password" tabIndex="2" placeholder={controlConfirmPassword.libelle} maxLength="50" value={confirmPassword} onChange={(e) => handleConfirmPasswordChange(e)} style={{borderColor: controlConfirmPassword.color}} />
                        </label>
                    </div>
                    <input className="btn-login" tabIndex="3" type="submit" value="Valider" />
                    <div className="login-back">
                        <Link className="login-link" to="/connect">Retour</Link>
                    </div>                 
                </form>
            </section>
        </main>
        </>
    )
}

export default SignUp
