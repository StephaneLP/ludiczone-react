import "./admin.scss"

import Menu from "../../layout/menu/Menu"

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const AdminAreaTypeCreate = () => {
    const navigate = useNavigate()
    const[adminMessage, setAdminMessage] = useState({libelle: "", color: ""})

    const[createName, setCreateName] = useState("")
    const[createDescription, setCreateDescription] = useState("")
    const[createPicture, setCreatePicture] = useState("default.jpg")

    const handleSubmit = (event) => {
        event.preventDefault()

        if(createName === "") {
            setAdminMessage({libelle: "Veuillez renseigner un nom S.V.P.", color: "brown"})
            return
        }
        if(createDescription === "") {
            setAdminMessage({libelle: "Veuillez renseigner une description S.V.P.", color: "brown"})
            return
        }

        fetch("http://localhost:3001/api/areatype",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: createName,
                description: createDescription,
                picture: createPicture,
            })
        })
        .then((res) => {
            return res.json()          
        })
        .then((res) => {
            navigate("/admin-area-type")
        })
    }

    return (
    <main>
        <Menu />
        <section className="container-fluid admin">
            <h1>Ajouter un type de loisir</h1>

            <div className="container">
                <form className="admin-create" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12 col-md-2"></div>
                        <div className="col-12 col-md-8 admin-create-separator-top">
                            <div className="admin-message d-flex justify-content-center align-items-center">
                                <div style={{backgroundColor: adminMessage.color}}>{adminMessage.libelle}</div>
                            </div>
                        </div>
                        <div className="col-12 col-md-2"></div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-2"></div>
                        <div className="col-12 col-md-4">
                            <div className="admin-create-cellule">
                                <label>
                                    <span className="label-libelle">Nom</span>
                                    <input type="text" maxLength="50" value={createName} onChange={(e) => setCreateName(e.target.value)} style={{borderColor: adminMessage.color}} />
                                </label>                       
                            </div>
                            <div className="admin-create-cellule">
                                <label>
                                <span className="label-libelle">Description</span>
                                    <textarea maxLength="200" value={createDescription} onChange={(e) => setCreateDescription(e.target.value)} style={{borderColor: adminMessage.color}} />
                                </label>                            
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="admin-create-cellule">
                                <label>
                                    <span className="label-libelle">Nom de l'image</span>
                                    <input type="text" maxLength="50" value={createPicture} onChange={(e) => setCreatePicture(e.target.value)} disabled/>
                                </label>                       
                            </div>
                            <div className="admin-create-cellule">
                                <label>
                                    <span className="label-libelle">Image</span>
                                    <div className="admin-create-img" style={{backgroundImage: `url(${require("../../assets/images/type-sortie/" + createPicture)})`}}></div>
                                </label>                            
                            </div>
                        </div>
                        <div className="col-12 col-md-2"></div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-2"></div>
                        <div className="col-12 col-md-8 admin-create-separator-bottom"></div>
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