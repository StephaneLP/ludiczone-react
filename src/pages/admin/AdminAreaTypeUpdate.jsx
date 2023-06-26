/* Import du style */
import "./admin.scss"

/* Import des fonctions, variables & images */
import { colorMsg } from "../../js/utils.js"

/* Import des composants */
import Loader from "../../components/loader/Loader"
import Menu from "../../layout/menu/Menu"

/* Import des Hooks & composants react-rooter */
import { useEffect, useState } from "react"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom"

/* ------------------------------------- JAVASCRIPT ------------------------------------ */

const AdminAreaTypeUpdate = () => {
    const token = localStorage.getItem("jwt")
    const navigate = useNavigate()
    const location = useLocation()
    const { id } = useParams()

    const[getAreaType, setGetAreaType] = useState(null)
    const[adminMessage, setAdminMessage] = useState({libelle: "", color: ""})
    const[focusName, setFocusName] = useState("")
    const[updateName, setUpdateName] = useState("")
    const[updateDescription, setUpdateDescription] = useState("")
    const[updatePicture, setUpdatePicture] = useState("default.jpg")


    //////////////////////////////////////////////////////////
    // GET (initialisation du formulaire)
    //////////////////////////////////////////////////////////

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        }

        fetch("http://localhost:3001/api/areatype/admin/" + id, requestOptions)
            .then((res) => {
                switch(res.status ) {
                    case 401:
                        navigate('/connect',{
                            state: {
                                reconnect: true,
                                route: location.pathname
                            }
                        })
                        break
                    case 403:
                        localStorage.removeItem("jwt")
                        localStorage.removeItem("pseudo")
                        navigate('/erreur',{
                            state: {message: "Vous n'avez pas les droits requis. Veuillez vous reconnecter S.V.P."}
                        })
                        break
                    case 500:
                    navigate('/erreur',{
                        state: {message: "Une erreur interne au serveur est survenue (Erreur 500)."}
                    })
                    break
                }
                return res.json()          
            })
            .then((res) => {
                if(res.success) {
                    setUpdateName(res.data.name)
                    setUpdateDescription(res.data.description)
                    setUpdatePicture(res.data.picture)
                    setGetAreaType(res.data)
                }
            })
    },[id, navigate, token])

    //////////////////////////////////////////////////////////
    // UPDATE
    //////////////////////////////////////////////////////////

    const handleSubmit = (event) => {
        event.preventDefault()

        if(updateName === "") {
            setAdminMessage({libelle: "Veuillez renseigner un nom S.V.P.", color: colorMsg.error})
            setFocusName(colorMsg.error)
            window.scrollTo(0,0)
            return
        }
        
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: updateName,
                description: updateDescription,
                picture: updatePicture,
            })
        }

        fetch("http://localhost:3001/api/areatype/admin/" + id, requestOptions)
        .then((res) => {
            if(res.status === 401) {
                navigate('/connect',{
                    state: {
                        reconnect: true,
                        route: "/admin-area-type-update/" + id
                    }
                })
            }
            else if(res.status === 403) {
                navigate('/erreur',{
                    state: {message: "Vous n'avez pas les droits requis pour accéder à cette page."}
                }) 
            }
            return res.json()          
        })
        .then((res) => {
            if(res.success) {
                navigate('/admin-area-type',{
                    state: {
                        success: true,
                        message: res.message           
                    }
                })
            }
            else {
                setAdminMessage({libelle: res.message, color: colorMsg.error})
            }
        })
        .catch((error) => {
            setAdminMessage({libelle: error, color: colorMsg.error})
        })
        window.scrollTo(0,0)
    }

/* ---------------------------------------- JSX ---------------------------------------- */

    return (
    <main>
        <Menu />
        <section className="container-fluid admin">
            <h1>Modifier un type de loisir</h1>
            <div className="container">
                {getAreaType === null ?
                (<Loader />)
                :
                (
                    <>
                    <div className="admin-message d-flex justify-content-center align-items-center">
                        <div style={{backgroundColor: adminMessage.color}}>{adminMessage.libelle}</div>
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
                                        <span className="label-libelle">Nom</span>
                                        <input type="text" maxLength="50" value={updateName} onChange={(e) => {setUpdateName(e.target.value); setAdminMessage({libelle: "", color: ""}); setFocusName("")}} style={{borderColor: focusName}} />
                                    </label>                       
                                </div>
                                <div className="admin-alter-cellule">
                                    <label>
                                    <span className="label-libelle">Description</span>
                                        <textarea maxLength="200" value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} />
                                    </label>                            
                                </div>
                            </div>
                            <div className="col-12 col-md-4">
                                <div className="admin-alter-cellule">
                                    <label>
                                        <span className="label-libelle">Nom de l'image</span>
                                        <input type="text" maxLength="50" value={updatePicture} onChange={(e) => setUpdatePicture(e.target.value)} disabled/>
                                    </label>                       
                                </div>
                                <div className="admin-alter-cellule">
                                    <label>
                                        <span className="label-libelle">Image</span>
                                        <div className="admin-alter-img" style={{backgroundImage: `url(${require("../../assets/images/pages/area-type/" + updatePicture)})`}}></div>
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
    )
}

export default AdminAreaTypeUpdate