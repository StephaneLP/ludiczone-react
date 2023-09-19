/* Import du style */
import "./login.scss"

/* Import des fonctions, variables & images */
import imgPassword from "../../assets/images/icones/password.png"
import imgQuestionMark from "../../assets/images/icones/question-mark.png"
import { colorMsg, colorMsgForm } from "../../js/utils.js"

/* Import des composants */
import Spinner from "../../components/loader/Spinner"

/* Import des Hooks & composants react-rooter */
import { Link, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const ForgotPasswordConfirm = () => {

    /* ------------------------------------------------------------------------------------------------- */
    /* --------------------------------------- PARTIE JAVASCRIT ---------------------------------------- */
    /* ------------------------------------------------------------------------------------------------- */

    const navigate = useNavigate()
    const { token } = useParams()

    // Messages et focus d'erreur
    const[errorMessage, setErrorMessage] = useState({libelle: "", color: ""})
    const[controlPassword, setControlPassword] = useState({libelle: "Mot de passe...", color: ""})
    const[controlConfirmPassword, setControlConfirmPassword] = useState({libelle: "Confirmer le mot de passe...", color: ""})
    const[displaySpinner, setDisplaySpinner] = useState(null)

    // Identifiants & Mot de passe
    const[password, setPassword] = useState("")
    const[confirmPassword, setConfirmPassword] = useState("")

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
    API PUT
    - changement du mot de passe (oublié)
    *********************************************************/
    const handleSubmit = (event) => {
        event.preventDefault()

        if(password === "") setControlPassword({libelle: "Veuillez renseigner un mot de passe", color: colorMsgForm.error})
        if(confirmPassword === "") setControlConfirmPassword({libelle: "Veuillez confirmer le mot de passe", color: colorMsgForm.error})

        if( controlPassword.color !== colorMsgForm.success || controlConfirmPassword.color !== colorMsgForm.success) {
            setErrorMessage({libelle: "Veuillez remplir correctement tous les champs S.V.P.", color: colorMsg.error})
            return
        }

        setDisplaySpinner(true)

        const requestBody = JSON.stringify({
            password: password,
        })

        fetch("http://localhost:3001/api/user/forgotpassword", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
                body: requestBody
            })
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                // Erreur identifiant ou mot de passe
                if(["ERR_CONSTRAINT","ERR_AUTHENTICATION"].includes(res.status)) {
                    setErrorMessage({libelle: res.message, color: colorMsg.error})
                    setDisplaySpinner(null)
                    return
                }
                // Erreur serveur
                if(["ERR_SERVER"].includes(res.status)) {
                    navigate("/erreur", { state: res.message })
                    return
                }

                navigate('/connect-info',{
                    state: {
                        title: "Finaliser l'inscription",
                        message: "Veuillez finaliser votre inscription en cliquant sur le lien qui vous a été envoyé par mail à l'adresse suivante :",
                        email: "...",
                    }
                })
            })
            .catch((error) => {
                navigate('/erreur', {state: error.message})
            })




    }
    // useEffect(() => {
    //     fetch("http://localhost:3001/api/user/signup", {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //             authorization: `Bearer ${token}`,
    //         }})
    //         .then((res) => {
    //             return res.json()
    //         })
    //         .then((res) => {
    //             // Erreur serveur
    //             if(["ERR_SERVER"].includes(res.status)) {
    //                 navigate("/erreur", {state: res.message})
    //                 return
    //             }
    //             // Echec de validation de l'adresse mail
    //             if(res.status !== "SUCCESS") {
    //                 navigate("/inscription-relance", {state: res.message})
    //                 return
    //             }

    //             setDisplayMessage({libelle: res.message, color: colorMsg.success})
    //             setGetResponse(res.status)
    //         })
    // },[token, navigate])

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
                <h1>Mot de passe oublié...</h1>
                <div className="login-image">
                    <img src={imgPassword} alt="Logo mot de passe"/>
                </div>
                <div className="login-message">Veuillez saisir un nouveau mot de passe S.V.P.</div>
                <div className="login-message" style={{backgroundColor: errorMessage.color}}>{errorMessage.libelle}</div>


                <form onSubmit={handleSubmit}>
                    <div className="login-cellule">
                        <label>
                            <input className="logo-cadenas" type="password" tabIndex="2" placeholder={controlPassword.libelle} maxLength="30" value={password} onChange={(e) => handlePasswordChange(e)} style={{borderColor: controlPassword.color}} />
                            <div className="login-instructions">
                                <img src={imgQuestionMark} alt="Point d'interrogation" />
                                <div className="login-instructions-message">
                                    8 caractères minimum, dont au moins :<br />
                                    - une lettre minuscule<br />
                                    - une lettre majuscule<br />
                                    - un chiffre
                                </div>
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
                        <Link to="/">Page d'accueil</Link>
                    </div>                 
                </form>                   
            </section>
        </main>
    )
}

export default ForgotPasswordConfirm