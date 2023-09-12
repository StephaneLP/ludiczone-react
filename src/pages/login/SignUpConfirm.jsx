/* Import du style */
import "./login.scss"

/* Import des fonctions, variables & images */
import imgDone from "../../assets/images/icones/done.png"
import { colorMsg } from "../../js/utils.js"

/* Import des composants */
import Spinner from "../../components/loader/Spinner"

/* Import des Hooks & composants react-rooter */
import { Link, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const SignUpConfirm = () => {

    /* ------------------------------------------------------------------------------------------------- */
    /* --------------------------------------- PARTIE JAVASCRIT ---------------------------------------- */
    /* ------------------------------------------------------------------------------------------------- */

    const navigate = useNavigate()
    const { token } = useParams()
    const[getResponse, setGetResponse] = useState(null)
    const[displayMessage, setDisplayMessage] = useState({libelle: "", color: ""})

    /*********************************************************
    API PUT
    - validation de l'adresse mail du user
    *********************************************************/
    useEffect(() => {
        fetch("http://localhost:3001/api/user/signup", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            }})
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                // Erreur serveur
                if(["ERR_SERVER"].includes(res.status)) {
                    navigate("/erreur", {state: res.message})
                    return
                }
                // Echec de validation de l'adresse mail
                if(res.status !== "SUCCESS") {
                    navigate("/inscription-relance", {state: res.message})
                    return
                }

                setDisplayMessage({libelle: res.message, color: colorMsg.success})
                setGetResponse(res.status)
            })
    },[token, navigate])

    /* ------------------------------------------------------------------------------------------------- */
    /* ------------------------------------------ PARTIE JSX ------------------------------------------- */
    /* ------------------------------------------------------------------------------------------------- */

    return (
        <>
        <main className="main-login">
            <section className="login">
                {getResponse === null ?
                (
                    <div className="login-spinner">
                        <Spinner />
                    </div>
                )
                :
                (
                    <>
                    <h1>Inscription finalisée</h1>
                    <div className="login-image">
                        <img src={imgDone} alt="Logo succès"/>
                    </div>
                    <div className="login-message">{displayMessage.libelle}</div>
                    <Link className="btn-login btn-login-confirm" to="/connect/inscription">Se connecter</Link>
                    <div className="login-back">
                        <Link to="/">Page d'accueil</Link>
                    </div>                     
                    </>
                )}
            </section>
        </main>
        </>
    )
}

export default SignUpConfirm