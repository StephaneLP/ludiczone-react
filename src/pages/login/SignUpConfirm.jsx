/* Import du style */
import "./login.scss"

/* Import des fonctions, variables & images */
import imgTriangle from "../../assets/images/icones/arrow.png"

/* Import des composants */
import Spinner from "../../components/loader/Spinner"

/* Import des Hooks & composants react-rooter */
import { Link, useLocation, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

const SignUpConfirm = () => {

    /* ------------------------------------------------------------------------------------------------- */
    /* --------------------------------------- PARTIE JAVASCRIT ---------------------------------------- */
    /* ------------------------------------------------------------------------------------------------- */

    const location = useLocation()
    const { token } = useParams()

    const[getResponse, setGetResponse] = useState(null)

    /*********************************************************
    API PUT
    - validation de l'adresse mail du user
    *********************************************************/
    useEffect(() => {
        fetch("http://localhost:3001/api/user/signup/" + token, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }})
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                // Token invalide
                if(["ERR_AUTHENTICATION"].includes(res.status)) {
                    // navigate("/reconnect")
                    // return
                }
                console.log(res.status)
                setGetResponse(res.status)
            })
    })

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
                <h1>Finaliser l'inscription</h1>

                {getResponse === null ?
                (
                    <div className="login-spinner">
                        <Spinner />
                    </div>
                )
                :
                (
                    <>
                    <div className="login-info">
                        <p>Veuillez finaliser votre inscription en cliquant sur le lien qui vous a été envoyé par mail à l'adresse suivant :</p>
                        <p className="email">{token}</p>
                        <p className="note">Durée de validité du lien : 5mn</p>
                    </div>
                    <div className="login-forgotten">
                        <Link className="login-link" to="/"><img src={imgTriangle} alt="Flèche"/>Page d'accueil</Link>
                    </div> 
                    </>
                )}
            </section>
        </main>
        </>
    )
}

export default SignUpConfirm



