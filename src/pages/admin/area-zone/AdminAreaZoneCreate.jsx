/* Import du style */
import "../admin.scss"

/* Import des fonctions, variables & images */
import { colorMsg, cleanLocalStorage } from "../../../js/utils.js"

/* Import des composants */
import Menu from "../../../layout/menu/Menu"

/* Import des Hooks & composants react-rooter */
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCheckIsAdmin } from "../../../js/hooks.js"

const AdminAreaZoneCreate = () => {
    /* ------------------------------------------------------------------------------------- */
    /* ------------------------------------- JAVASCRIPT ------------------------------------ */
    /* ------------------------------------------------------------------------------------- */

    const token = localStorage.getItem("jwt")
    const navigate = useNavigate()
    
    const[displayMessage, setDisplayMessage] = useState({libelle: "", color: ""})
    const[focusName, setFocusName] = useState("")
    const[createName, setCreateName] = useState("")
    const[createDescription, setCreateDescription] = useState("")
    const[createPicture, setCreatePicture] = useState("default.jpg")

    /* Contrôle de la validité du token et des droits */
    useCheckIsAdmin(token)

    /*********************************************************
    API CREATE
    - création de la zone
    *********************************************************/
    const handleSubmit = (event) => {
        event.preventDefault()

        if(createName === "") {
            setDisplayMessage({libelle: "Veuillez renseigner un nom S.V.P.", color: colorMsg.error})
            setFocusName(colorMsg.error)
            window.scrollTo(0,0)
            return
        }

        const requestBody = JSON.stringify({
            name: createName,
            description: createDescription,
            picture: createPicture,
        })

        fetch("http://localhost:3001/api/AreaZones/admin", {
                method: "POST",
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

                navigate('/admin-area-zone',{
                    state: {
                        libelle: res.message,
                        color: colorMsg.success
                    }
                })
            })
            .catch((error) => {
                setDisplayMessage({libelle: error, color: colorMsg.error})
            })
        window.scrollTo(0,0)
    }

    /* ------------------------------------------------------------------------------------- */
    /* ---------------------------------------- JSX ---------------------------------------- */
    /* ------------------------------------------------------------------------------------- */

    return (
    <main>
        <Menu />
        <section className="container-fluid admin">
            <h1>Ajouter une zone</h1>
            <div className="container">
                <div className="admin-message d-flex justify-content-center align-items-center">
                    <div style={{backgroundColor: displayMessage.color}}>{displayMessage.libelle}</div>
                </div>
                <form className="admin-alter" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12 col-md-2"></div>
                        <div className="col-12 col-md-8 admin-alter-separator-top"></div>
                        <div className="col-12 col-md-2"></div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-2"></div>
                        <div className="col-12 col-md-4">
                            <div className="admin-alter-cellule">
                                <label>
                                    <span className="label-libelle">Nom</span>
                                    <input type="text" maxLength="50" value={createName} onChange={(e) => {setCreateName(e.target.value); setDisplayMessage({libelle: "", color: ""}); setFocusName("")}} style={{borderColor: focusName}} />
                                </label>                       
                            </div>
                            <div className="admin-alter-cellule">
                                <label>
                                <span className="label-libelle">Description</span>
                                    <textarea maxLength="200" value={createDescription} onChange={(e) => setCreateDescription(e.target.value)} />
                                </label>                            
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="admin-alter-cellule">
                                <label>
                                    <span className="label-libelle">Nom de l'image</span>
                                    <input type="text" maxLength="50" value={createPicture} onChange={(e) => setCreatePicture(e.target.value)} disabled/>
                                </label>                       
                            </div>
                            <div className="admin-alter-cellule">
                                <label>
                                    <span className="label-libelle">Image</span>
                                    <div className="admin-alter-img" style={{backgroundImage: `url(${require("../../../assets/images/pages/area-zone/" + createPicture)})`}}></div>
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
                                    <Link className="btn-confirm-no" to="/admin-area-zone" aria-current="page" href="#">Annuler</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </main>
    )
}

export default AdminAreaZoneCreate