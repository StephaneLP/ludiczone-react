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
    const[controlNickName, setControlNickName] = useState({libelle: "", color: ""})
    const[controlEmail, setControlEmail] = useState({libelle: "", color: ""})
    const[controlPassword, setControlPassword] = useState({libelle: "", color: ""})
    const[controlConfirmPassword, setControlConfirmPassword] = useState({libelle: "", color: ""})

    // Identifiant & Mot de passe
    const[nickName, setNickName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")

    const handleNickNameChange = (event) => {
        setNickName(event.target.value);
        setErrorMessage({libelle: "", color: ""})
        setControlNickName({libelle: "", color: ""})
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setErrorMessage({libelle: "", color: ""})
        setControlEmail({libelle: "", color: ""})
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setErrorMessage({libelle: "", color: ""})
        setControlPassword({libelle: "", color: ""})
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setErrorMessage({libelle: "", color: ""})
        setControlConfirmPassword({libelle: "", color: ""})
    }
    
    /*********************************************************
    API POST
    - authentification avec identifiant et mot de passe
    *********************************************************/
    const handleSubmit = (event) => {
        event.preventDefault()

        if(nickName === "") setControlNickName({libelle: "Veuillez renseigner un pseudo S.V.P.", color: colorMsgForm.error})
        if(email === "") setControlEmail({libelle: "Veuillez renseigner un email S.V.P.", color: colorMsgForm.error})
        if(password === "") setControlPassword({libelle: "Veuillez renseigner un mot de passe S.V.P.", color: colorMsgForm.error})
        if(confirmPassword === "") setControlConfirmPassword({libelle: "Veuillez confirmer le mot de passe S.V.P.", color: colorMsgForm.error})
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
                            <input className="logo-user" type="text" tabIndex="1" placeholder="Pseudo..." maxLength="50" value={nickName} onChange={(e) => handleNickNameChange(e)} style={{borderColor: controlNickName.color}} />
                            <div className="login-cellule-message">{controlNickName.libelle}</div>
                        </label>
                    </div>
                    <div className="login-cellule">
                        <label>
                            <input className="logo-email" type="text" tabIndex="1" placeholder="Email..." maxLength="50" value={email} onChange={(e) => handleEmailChange(e)} style={{borderColor: controlEmail.color}} />
                            <div className="login-cellule-message">{controlEmail.libelle}</div>
                        </label>
                    </div>
                    <div className="login-cellule">
                        <label>
                            <input className="logo-cadenas" type="password" tabIndex="2" placeholder="Mot de passe..." maxLength="50" value={password} onChange={(e) => handlePasswordChange(e)} style={{borderColor: controlPassword.color}} />
                            <div className="login-cellule-message">{controlPassword.libelle}</div>
                        </label>
                    </div>
                    <div className="login-cellule">
                        <label>
                            <input className="logo-cadenas" type="password" tabIndex="2" placeholder="Confirmer le mot de passe..." maxLength="50" value={confirmPassword} onChange={(e) => handleConfirmPasswordChange(e)} style={{borderColor: controlConfirmPassword.color}} />
                            <div className="login-cellule-message">{controlConfirmPassword.libelle}</div>
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
