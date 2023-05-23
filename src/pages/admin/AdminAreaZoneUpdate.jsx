import "./admin.scss"

import Loader from "../../components/loader/Loader"
import Menu from "../../layout/menu/Menu"

import { colorMsg, formatDate, getRole } from "../../js/utils.js"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const AdminAreaZoneUpdate = () => {
    const token = localStorage.getItem("jwt")
    const navigate = useNavigate()
    const { id } = useParams()

    const[getAreaType, setGetAreaType] = useState(null)
    const[adminMessage, setAdminMessage] = useState({libelle: "", color: ""})
    const[focusName, setFocusName] = useState("")
    const[updateName, setUpdateName] = useState("")
    const[updateDescription, setUpdateDescription] = useState("")
    const[updatePicture, setUpdatePicture] = useState("default.jpg")

    //////////////////////////////////////////////////////////
    // CONTROLE DE LA VALIDITE DU TOKEN ET DES DROITS
    //////////////////////////////////////////////////////////

    useEffect(() => {
        if(token !== null) {
            getRole(token)
                .then((res) => {
                    if(res.status === 401) {
                        navigate('/connect',{
                            state: {
                                reconnect: true,
                                route: "/admin-area-zone-update/" + id
                            }
                        })
                    }
                    else if(res.status === 403 || res.role !== "admin") {
                        localStorage.removeItem("jwt")
                        localStorage.removeItem("pseudo")
                        navigate('/erreur',{
                            state: {message: "Vous n'avez pas les droits requis. Veuillez vous reconnecter S.V.P."}
                        })
                    }
                })
        }
        else {
            navigate('/erreur',{
                state: {message: "Vous n'avez pas les droits requis pour accéder à cette page."}
            }) 
        }
    },[])

    useEffect(() => {
        fetch("http://localhost:3001/api/areazone/" + id,{
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            }})
            .then((res) => {
                return res.json()          
            })
            .then((res) => {
                setUpdateName(res.data.name)
                setUpdateDescription(res.data.description)
                setUpdatePicture(res.data.picture)
                setGetAreaType(res.data)
            })
    },[])

    const handleNameChange = (event) => {
        setUpdateName(event.target.value);
        setAdminMessage({libelle: "", color: ""})
        setFocusName("")
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if(updateName === "") {
            setAdminMessage({libelle: "Veuillez renseigner un nom S.V.P.", color: colorMsg.error})
            setFocusName(colorMsg.error)
            window.scrollTo(0,0)
            return
        }

        fetch("http://localhost:3001/api/areazone/" + id,{
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
        })
        .then((res) => {
            if(res.status === 401) {
                navigate('/connect',{
                    state: {
                        reconnect: true,
                        route: "/admin-area-zone-update/" + id
                    }
                })
            }
            return res.json()          
        })
        .then((res) => {
            if(res.success) {
                navigate('/admin-area-zone',{
                    state: {
                        alter: {
                            success: true,
                            message: res.message                            
                        }
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
                                        <input type="text" maxLength="50" value={updateName} onChange={(e) => handleNameChange(e)} style={{borderColor: focusName}} />
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
                                        <div className="admin-alter-img" style={{backgroundImage: `url(${require("../../assets/images/pages/area-zone/" + updatePicture)})`}}></div>
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
                    </>
                )}
            </div>
        </section>
    </main>
    )
}

export default AdminAreaZoneUpdate