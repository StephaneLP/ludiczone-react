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
        fetch("http://localhost:3001/api/user/login/" + token, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
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

    /* ------------------------------------------------------------------------------------------------- */
    /* ------------------------------------------ PARTIE JSX ------------------------------------------- */
    /* ------------------------------------------------------------------------------------------------- */

    return (
        <>
        <main className="main-login">
            <section className="login">
                <Link to="/">
                    {/* <div className="login-img" alt="Logo LudicZone"></div> */}
                </Link>
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
                        <Link className="btn-login" to="/">Se connecter</Link>
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
                        <Link className="btn-login" to="/">Renvoyer un mail de confirmation</Link>
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