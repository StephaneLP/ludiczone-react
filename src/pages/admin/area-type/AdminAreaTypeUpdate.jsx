/* Import du style */
import "../admin.scss"

/* Import des fonctions, variables & images */
import { colorMsg, cleanLocalStorage } from "../../../js/utils.js"

/* Import des composants */
import Header from "../../../layout/header/Header"
import Menu from "../../../layout/menu/Menu"
import Footer from "../../../layout/footer/Footer"
import Loader from "../../../components/loader/Loader"

/* Import des Hooks & composants react-rooter */
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const AdminAreaTypeUpdate = () => {

    /* ------------------------------------------------------------------------------------------------- */
    /* --------------------------------------- PARTIE JAVASCRIT ---------------------------------------- */
    /* ------------------------------------------------------------------------------------------------- */

    const token = localStorage.getItem("jwt")
    const navigate = useNavigate()
    const { id } = useParams()

    const[displayMessage, setDisplayMessage] = useState({libelle: "", color: ""})
    const[focusName, setFocusName] = useState("")
    const[updateName, setUpdateName] = useState("")
    const[updateDescription, setUpdateDescription] = useState("")
    const[updatePicture, setUpdatePicture] = useState("default.jpg")
    const[getAreaType, setGetAreaType] = useState(null)

    /*********************************************************
    API GET BY ID
    - chargement de l'élément et initialisation du formulaire
    *********************************************************/
    useEffect(() => {
        fetch("http://localhost:3001/api/areatypes/admin/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            }})
            .then((res) => {
                return res.json()          
            })
            .then((res) => {
                // Token invalide
                if(["ERR_AUTHENTICATION"].includes(res.status)) {
                    cleanLocalStorage()
                    navigate("/connect/reconnect")
                    return
                }
                // Token absent - Droits insuffisants - Erreur serveur
                if(["ERR_REQUEST","ERR_USER_RIGHTS","ERR_SERVER"].includes(res.status)) {
                    cleanLocalStorage()
                    navigate("/erreur", {state: res.message})
                    return
                }
                // Erreur id inconnu
                if(["ERR_NOT_FOUND"].includes(res.status)) {
                    setDisplayMessage({libelle: res.message, color: colorMsg.error})
                    return
                }

                setUpdateName(res.data.name)
                setUpdateDescription(res.data.description)
                setUpdatePicture(res.data.picture)
                setGetAreaType(res.data)
            })
            .catch((error) => {
                cleanLocalStorage()
                navigate('/erreur', {state: error.message})             
            })
    },[id, navigate, token])

    /*********************************************************
    API UPDATE
    - modification du type de loisir
    *********************************************************/
    const handleSubmit = (event) => {
        event.preventDefault()

        if(updateName === "") {
            setDisplayMessage({libelle: "Veuillez renseigner un nom S.V.P.", color: colorMsg.error})
            setFocusName(colorMsg.error)
            window.scrollTo(0,0)
            return
        }

        const requestBody = JSON.stringify({
            name: updateName,
            description: updateDescription,
            picture: updatePicture,
        })

        fetch("http://localhost:3001/api/areatypes/admin/" + id, {
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
                // Token invalide
                if(["ERR_AUTHENTICATION"].includes(res.status)) {
                    cleanLocalStorage()
                    navigate("/connect", {state: true})
                    return
                }
                // Token absent - Droits insuffisants - Erreur serveur
                if(["ERR_REQUEST","ERR_USER_RIGHTS","ERR_SERVER"].includes(res.status)) {
                    cleanLocalStorage()
                    navigate("/erreur", {state: res.message})
                    return
                }
                // Erreur de contrainte (intégrité des données)
                if(["ERR_CONSTRAINT"].includes(res.status)) {
                    setDisplayMessage({libelle: res.message, color: colorMsg.error})
                    return
                }

                navigate('/admin-area-type',{
                    state: {
                        libelle: res.message,
                        color: (res.status === "SUCCESS" ? colorMsg.success : colorMsg.error) // Succès ou Id inconnu
                    }
                })
            })
            .catch((error) => {
                setDisplayMessage({libelle: error, color: colorMsg.error})
            })
        window.scrollTo(0,0)
    }

    /* ------------------------------------------------------------------------------------------------- */
    /* ------------------------------------------ PARTIE JSX ------------------------------------------- */
    /* ------------------------------------------------------------------------------------------------- */

    return (
        <>
        <Header />
        <main>
            <Menu />{/* Menu placé dans <main> pour la propriété CSS position: sticky */}
            <section className="container-fluid admin">
                <h1>Modifier un type de loisir</h1>
                <div className="container">
                    {getAreaType === null ?
                    (<Loader />)
                    :
                    (
                        <>
                        <div className="admin-message">
                            <div style={{backgroundColor: displayMessage.color}}>{displayMessage.libelle}</div>
                        </div>
                        <form className="admin-alter" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-12 col-md-2"></div>
                                <div className="col-12 col-md-8 admin-alter-separator-top">

                                </div>
                                <div className="col-12 col-md-2"></div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-2"></div>
                                <div className="col-12 col-md-4">
                                    <div className="admin-alter-cellule">
                                        <label>
                                            <span>Nom</span>
                                            <input type="text" maxLength="50" value={updateName} onChange={(e) => {setUpdateName(e.target.value); setDisplayMessage({libelle: "", color: ""}); setFocusName("")}} style={{borderColor: focusName}} />
                                        </label>                       
                                    </div>
                                    <div className="admin-alter-cellule">
                                        <label>
                                        <span>Description</span>
                                            <textarea maxLength="200" value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} />
                                        </label>                            
                                    </div>
                                </div>
                                <div className="col-12 col-md-4">
                                    <div className="admin-alter-cellule">
                                        <label>
                                            <span>Nom de l'image</span>
                                            <input type="text" maxLength="50" value={updatePicture} onChange={(e) => setUpdatePicture(e.target.value)} disabled/>
                                        </label>                       
                                    </div>
                                    <div className="admin-alter-cellule">
                                        <label>
                                            <span >Image</span>
                                            <div className="admin-alter-img" style={{backgroundImage: `url(${require("../../../assets/images/pages/area-type/" + updatePicture)})`}}></div>
                                        </label>                            
                                    </div>
                                </div>
                                <div className="col-12 col-md-2"></div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-2"></div>
                                <div className="col-12 col-md-8 admin-alter-separator-bottom"></div>
                                <div className="col-12 col-md-2"></div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-buttons">
                                        <div>
                                            <input className="btn-confirm" type="submit" value="Enregistrer" />
                                        </div>
                                        <div>
                                            <Link className="btn-confirm-no" to="/admin-area-type" aria-current="page" href="#">Annuler</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        </>
                    )}
                </div>
            </section>
        </main>
        <Footer />
        </>
    )
}

export default AdminAreaTypeUpdate