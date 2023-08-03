/* Import du style */
import "./login.scss"

/* Import des fonctions, variables & images */
import { colorMsg, cleanLocalStorage } from "../../js/utils.js"
import logoUser from "../../assets/images/logo/login.png"

/* Import des composants */
import Header from "../../layout/header-no-menu/Header"

/* Import des Hooks & composants react-rooter */
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const ReConnect = () => {

    /* ------------------------------------------------------------------------------------------------- */
    /* --------------------------------------- PARTIE JAVASCRIT ---------------------------------------- */
    /* ------------------------------------------------------------------------------------------------- */

    const navigate = useNavigate()

    // Messages et focus d'erreur
    const[errorMessage, setErrorMessage] = useState({libelle: "", color: ""})
    const[focusLogin, setFocusLogin] = useState("")
    const[focusPassword, setFocusPassword] = useState("")

    // Identifiant & Mot de passe
    const[login, setLogin] = useState("")
    const[password, setPassword] = useState("")

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
        setErrorMessage({libelle: "", color: ""})
        setFocusLogin("")
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setErrorMessage({libelle: "", color: ""})
        setFocusPassword("")
    }

    /*********************************************************
    API POST
    - authentification avec identifiant et mot de passe
    *********************************************************/
    const handleSubmit = (event) => {
        event.preventDefault()

        if(login === "") {
            setErrorMessage({libelle: "Veuillez renseigner un identifiant S.V.P.", color: colorMsg.error})
            setFocusLogin(colorMsg.error)
            return
        }

        if(password === "") {
            setErrorMessage({libelle: "Veuillez renseigner un mot de passe S.V.P.", color: colorMsg.error})
            setFocusPassword(colorMsg.error)
            return
        }

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
        <Header />
        <main>
            <section className="login">
                <img className="login-img" src={logoUser} alt="Logo user" />
                <h1>Session expirée...</h1>
                <h2>Veuillez-vous identifier S.V.P.</h2>

                <div className="login-message d-flex justify-content-center align-items-center">
                    <div style={{backgroundColor: errorMessage.color}}>{errorMessage.libelle}</div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="login-cellule">
                        <label>
                            <input className="logo-user" type="text" tabIndex="1" placeholder="Pseudo ou Email..." maxLength="50" value={login} onChange={(e) => handleLoginChange(e)} style={{borderColor: focusLogin}} />
                        </label>
                    </div>
                    <div className="login-cellule">
                        <label>
                            <input className="logo-cadenas" type="password" tabIndex="2" placeholder="Mot de passe..." maxLength="50" value={password} onChange={(e) => handlePasswordChange(e)} style={{borderColor: focusPassword}} />
                        </label>
                    </div>
                    <div className="form-buttons">
                        <div>
                            <input className="btn-confirm" tabIndex="3" type="submit" value="Valider" />
                        </div>
                        <div>
                            <Link to="/" className="btn-lien" onClick={cleanLocalStorage}>Annuler</Link>
                        </div>
                    </div>
                </form>
            </section>
        </main>
        </>
    )
}

export default ReConnect