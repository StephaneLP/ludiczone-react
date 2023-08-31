/* Import du style */
import "./login.scss"

/* Import des fonctions, variables & images */
import imgDone from "../../assets/images/icones/done.png"
import imgWarning from "../../assets/images/icones/failure.png"
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
                if(["ERR_SERVER"].includes(res.status)) { // Erreur serveur
                    navigate("/erreur", {state: res.message})
                    return
                }

                setDisplayMessage({libelle: res.message, color: (res.status === "SUCCESS" ? colorMsg.success : colorMsg.error)})
                setGetResponse(res.status)
            })
    },[token, navigate])

    /*********************************************************
    API GET
    - Envoi d'un nouveau mail de vérification l'adresse mail du user
    *********************************************************/
    const handleClickSubmit = () => {
        fetch("http://localhost:3001/api/user/sendnewmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
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
                (getResponse === "SUCCESS" ?
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
                    )
                    :
                    (
                        <>
                        <h1>Game Over !</h1>
                        <div className="login-image">
                            <img src={imgWarning} alt="Logo échec"/>
                        </div>
                        <div style={{backgroundColor: displayMessage.color}} className="login-message">{displayMessage.libelle}</div>
                        <button className="btn-login btn-login-confirm" onClick={handleClickSubmit}>Renvoyer un mail de confirmation</button>
                        <div className="login-back">
                            <Link to="/">Page d'accueil</Link>
                        </div> 
                        </>
                    )
                )}
            </section>
        </main>
        </>
    )
}

export default SignUpConfirm