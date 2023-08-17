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
    const[controlNickName, setControlNickName] = useState({libelle: "Pseudo...", color: ""})
    const[controlEmail, setControlEmail] = useState({libelle: "Email...", color: ""})
    const[controlPassword, setControlPassword] = useState({libelle: "Mot de passe...", color: ""})
    const[controlConfirmPassword, setControlConfirmPassword] = useState({libelle: "Confirmer le mot de passe...", color: ""})

    // Identifiant & Mot de passe
    const[nickName, setNickName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")

    const handleNickNameChange = (event) => {
        const val = event.target.value.trim()
        const exp = /[^a-zA-Z0-9]/
        let color = ""

        if(exp.test(val)) color = colorMsgForm.error
        else if(val.length >= 5) color = colorMsgForm.success

        setNickName(val);
        setErrorMessage({libelle: "", color: ""})
        setControlNickName({libelle: "Pseudo...", color: color})
    }

    const handleEmailChange = (event) => {
        const val = event.target.value.trim()
        const exp = /([\w-\.]+@[\w\.]+\.{1}[\w]+)/
        let color = ""

        if(exp.test(val)) color = colorMsgForm.success
        else if(val.length >= 1) color = colorMsgForm.error

        setEmail(val);
        setErrorMessage({libelle: "", color: ""})
        setControlEmail({libelle: "Email...", color: color})
    }

    const handlePasswordChange = (event) => {
        const val = event.target.value.trim()
        const exp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
        let color = ""

        if(exp.test(val)) color = colorMsgForm.success
        else if(val.length >= 1) color = colorMsgForm.error

        setPassword(event.target.value.trim());
        setErrorMessage({libelle: "", color: ""})
        setControlPassword({libelle: "Mot de passe...", color: color})
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value.trim());
        setErrorMessage({libelle: "", color: ""})
        setControlConfirmPassword({libelle: "Confirmer le mot de passe...", color: ""})
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
        if(nickName === "" || email === "" || password === "" || confirmPassword === "") return

        const requestBody = JSON.stringify({
            nick_name: nickName,
            email: email,
            password: password,
        })

        fetch("http://localhost:3001/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: requestBody
            })
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                // Erreur identifiant ou mot de passe
                if(["ERR_REQUEST","ERR_AUTHENTICATION"].includes(res.status)) {
                    setErrorMessage({libelle: res.message, color: colorMsg.error})
                    return
                }
                // Erreur serveur
                if(["ERR_SERVER"].includes(res.status)) {
                    navigate("/erreur", {state: res.message})
                    return
                }

                localStorage.setItem("jwt",res.data.token) // Token enregistré dans le localStorage
                localStorage.setItem("pseudo",res.data.nick_name) // Pseudo enregistré dans le localStorage
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
                            <input className="logo-user" type="text" tabIndex="1" placeholder={controlNickName.libelle} maxLength="50" value={nickName} onChange={(e) => handleNickNameChange(e)} style={{borderColor: controlNickName.color}} />
                            <div className="login-cellule-message">
                                5 caractères minimum (lettres minuscules, ou majuscules, sans accent - chiffres)
                            </div>
                        </label>
                    </div>
                    <div className="login-cellule">
                        <label>
                            <input className="logo-email" type="text" tabIndex="1" placeholder={controlEmail.libelle} maxLength="50" value={email} onChange={(e) => handleEmailChange(e)} style={{borderColor: controlEmail.color}} />
                            <div className="login-cellule-message">ex : nom@domaine.com</div>
                        </label>
                    </div>
                    <div className="login-cellule">
                        <label>
                            <input className="logo-cadenas" type="password" tabIndex="2" placeholder={controlPassword.libelle} maxLength="50" value={password} onChange={(e) => handlePasswordChange(e)} style={{borderColor: controlPassword.color}} />
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
