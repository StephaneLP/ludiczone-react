/* Import du style */
import "./login.scss"

/* Import des fonctions, variables & images */
import { colorMsg, cleanLocalStorage } from "../../js/utils.js"
import logoUser from "../../assets/images/logo/login-menu.png"

/* Import des Hooks & composants react-rooter */
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Connect = () => {

    /* ------------------------------------------------------------------------------------------------- */
    /* --------------------------------------- PARTIE JAVASCRIT ---------------------------------------- */
    /* ------------------------------------------------------------------------------------------------- */

    const navigate = useNavigate()

    // Messages et focus d'erreur
    const[errorMessage, setErrorMessage] = useState({libelle: "", color: ""})
    const[controlLogin, setControlLogin] = useState({libelle: "", color: ""})
    const[controlPassword, setControlPassword] = useState({libelle: "", color: ""})

    // Identifiant & Mot de passe
    const[login, setLogin] = useState("")
    const[password, setPassword] = useState("")

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
        setErrorMessage({libelle: "", color: ""})
        setControlLogin({libelle: "", color: ""})
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setErrorMessage({libelle: "", color: ""})
        setControlPassword({libelle: "", color: ""})
    }

    /*********************************************************
    API POST
    - authentification avec identifiant et mot de passe
    *********************************************************/
    const handleSubmit = (event) => {
        event.preventDefault()

        if(login === "") setControlLogin({libelle: "Veuillez renseigner un identifiant S.V.P.", color: colorMsg.error})
        if(password === "") setControlPassword({libelle: "Veuillez renseigner un mot de passe S.V.P.", color: colorMsg.error})
        if(login === "" || password === "") return

        const requestBody = JSON.stringify({
            username: login,
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
                navigate(-2) // Retour au composant appelant
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
                    <div className="login-img" alt="Logo LudicZone"></div>
                </Link>
                <h1>S'identifier</h1>
                <div className="login-message" style={{backgroundColor: errorMessage.color}}>{errorMessage.libelle}</div>

                <form onSubmit={handleSubmit}>
                    <div className="login-cellule">
                        <label>
                            <input className="logo-user" type="text" tabIndex="1" placeholder="Pseudo ou Email..." maxLength="50" value={login} onChange={(e) => handleLoginChange(e)} style={{borderColor: controlLogin.color}} />
                            <div className="login-cellule-message" style={{backgroundColor: controlLogin.color}}>{controlLogin.libelle}</div>
                        </label>
                    </div>
                    <div className="login-cellule">
                        <label>
                            <input className="logo-cadenas" type="password" tabIndex="2" placeholder="Mot de passe..." maxLength="50" value={password} onChange={(e) => handlePasswordChange(e)} style={{borderColor: controlPassword.color}} />
                            <div className="login-cellule-message" style={{backgroundColor: controlPassword.color}}>{controlPassword.libelle}</div>
                        </label>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Link className="login-link" to="/en-construction">Mot de passe oublié ?</Link>
                    </div>
                    <input className="btn-login" tabIndex="3" type="submit" value="Valider" />
                    <div className="login-signup">
                        Vous n'avez toujours pas de compte ?<br />
                        <Link className="login-link" to="/en-construction">Créer un compte</Link>
                    </div>                 
                </form>
            </section>
        </main>
        </>
    )
}

export default Connect



