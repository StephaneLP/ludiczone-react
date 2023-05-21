import "./admin.scss"

import Menu from "../../layout/menu/Menu"

import { colorMsg, formatDate } from "../../js/utils.js"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const AdminAreaTypeCreate = () => {
    const token = localStorage.getItem("jwt")
    const navigate = useNavigate()
    
    const[adminMessage, setAdminMessage] = useState({libelle: "", color: ""})
    const[focusName, setFocusName] = useState("")
    const[createName, setCreateName] = useState("")
    const[createDescription, setCreateDescription] = useState("")
    const[createPicture, setCreatePicture] = useState("default.jpg")

    const handleNameChange = (event) => {
        setCreateName(event.target.value);
        setAdminMessage({libelle: "", color: ""})
        setFocusName("")
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if(createName === "") {
            setAdminMessage({libelle: "Veuillez renseigner un nom S.V.P.", color: colorMsg.error})
            setFocusName(colorMsg.error)
            window.scrollTo(0,0)
            return
        }

        fetch("http://localhost:3001/api/areatype",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: createName,
                description: createDescription,
                picture: createPicture,
            })
        })
        .then((res) => {
            if(res.status === 403) {
                navigate('/connect',{
                    state: true
                })
            }
            return res.json()          
        })
        .then((res) => {
            if(res.success) {
                navigate('/admin-area-type',{
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
            <h1>Ajouter un type de loisir</h1>
            <div className="container">
                <div className="admin-message d-flex justify-content-center align-items-center">
                    <div style={{backgroundColor: adminMessage.color}}>{adminMessage.libelle}</div>
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
                                    <input type="text" maxLength="50" value={createName} onChange={(e) => handleNameChange(e)} style={{borderColor: focusName}} />
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
                                    <div className="admin-alter-img" style={{backgroundImage: `url(${require("../../assets/images/type-sortie/" + createPicture)})`}}></div>
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
            </div>
        </section>
    </main>
    )
}

export default AdminAreaTypeCreate