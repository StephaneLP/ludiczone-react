import "./admin.scss"
import imgDelete from "../../assets/images/button/garbage.png"
import imgUpdate from "../../assets/images/button/pencil2.png"
import imgFilter from "../../assets/images/button/filtre.png"
import Loader from "../../components/loader/Loader"
import Menu from "../../layout/menu/Menu"
import ModalConfirm from "../../components/modalconfirm/ModalConfirm"

import { formatDate } from "../../js/utils.js"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const AdminAreaType = () => {
    const navigate = useNavigate()
    const[confirmElement, setConfirmElement] = useState({id: "", name: ""})
    const[displayModalConfirm, setDisplayModalConfirm] = useState(false)

    //////////////////////////////////////////////////////////
    // CHARGEMENT : APPEL DE L'API GET
    // PARAMETRES : CHANGEMENT DANS LA ZONE DE FILTRE
    //////////////////////////////////////////////////////////

    const[getAreaType, setGetAreaType] = useState(null)

    // const[param, setParam] = useState({
    //     sort: "asc",
    //     search: "",
    // })
    useEffect(() => {
        fetch("http://localhost:3001/api/areatype")
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                setGetAreaType(res.data)
            })
    },[displayModalConfirm])

    //////////////////////////////////////////////////////////
    // DELETE : CONFIRMATION A L'AIDE DE LA FENETRE MODALE CONFIRM
    // APPEL DE L'API DELETE
    //////////////////////////////////////////////////////////

    const libelle = "Etes-vous sûr de vouloir supprimer le type ?"

    const handleShowModalClick = ((id, name) => {
        setConfirmElement({id: id, name: name})       
        setDisplayModalConfirm(true) 
    })

    // const token = localStorage.getItem("jwt")
    const handleCancelledClick = (isValidated) => { 
        if (isValidated) {
            fetch("http://localhost:3001/api/areatype/" + confirmElement.id,{
                method: "DELETE",
                // headers: {
                //     authorization: `Bearer ${token}`,
                // },
            })
            .then((res) => {
                return res.json()          
            })
        }
        setDisplayModalConfirm(false)
    }

    //////////////////////////////////////////////////////////
    // 
    //////////////////////////////////////////////////////////

    const handleSubmit = () => {
        console.log("Création")
    }

    const handleSortClick = () => {
        console.log("Tri")
    }

    return (
    <main>
        <Menu />
        <section className="container-fluid admin">
            <h1>Administration</h1>
            <div className="container">
                {getAreaType === null ?
                        (<Loader />)
                        :
                        (
                            <>
                            {displayModalConfirm && <ModalConfirm callFunction={handleCancelledClick} libelle={libelle} name={confirmElement.name}/>}
                            <div className="admin-titre d-flex justify-content-between align-items-center">
                                <h2>Table 'area_type'</h2>
                                <Link className="btn-admin-add" to={"/"} href="#">Ajouter un élément</Link>                                
                            </div>
                            <div className="admin-filtre d-flex justify-content-between align-items-center">
                                <div className="admin-filtre-nb">Nombre de résultats : <span>{getAreaType.length}</span></div>

                                <nav className="navbar bg-body-tertiary">
                                    <button className="navbar-toggler btn-admin" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                                        <img src={imgFilter} />
                                    </button>
                                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                                        <div className="offcanvas-header">
                                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                        </div>
                                        <div className="offcanvas-body">
                                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                                <li className="nav-item">
                                                    <a className="nav-link" aria-current="page" href="#">Home</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#">Link</a>
                                                </li>
                                            </ul>
                                            <form className="d-flex mt-3" role="search">
                                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                                <button className="btn btn-outline-success" type="submit">Search</button>
                                            </form>
                                        </div>
                                    </div>
                                </nav>
                                {/* <div className="tri">
                                    <span>Tri par nom : </span>
                                    <input type="radio" name="tri" value="asc" onChange={handleSortClick} checked={param.sort==="asc"} />
                                    <label>Croissant</label>
                                    <input type="radio" name="tri" value="desc" onChange={handleSortClick} checked={param.sort==="desc"} />
                                    <label>Décroissant</label>   
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <label>
                                        Nom
                                        <input type="text" name="name" />
                                    </label>
                                    <input type="submit" value="Filtrer" />
                                </form> */}

                            </div>
                            {getAreaType.map((element) => {
                                return (
                                    <div className="row admin-row" key={element.id}>
                                        <div className="col-12 col-lg-1">
                                            Id : {element.id}
                                        </div>
                                        <div className="col-12 col-lg-3 admin-row-title">
                                            {element.name}
                                        </div>
                                        <div className="col-12 col-lg-3 justify-content-center">
                                            Created : {formatDate(element.created_at,"short")}
                                        </div>
                                        <div className="col-12 col-lg-3 justify-content-center">
                                            Updated : {formatDate(element.updated_at,"short")}
                                        </div>
                                        <div className="col-12 col-lg-2 justify-content-end">
                                            <Link className="btn-admin" to={"/" + element.id} href="#"><img src={imgUpdate} /></Link>
                                            <Link className="btn-admin" onClick={() => handleShowModalClick(element.id, element.name)}><img src={imgDelete} /></Link>
                                        </div>
                                    </div>
                                )
                            })}

                            </>
                        )
                    }
            </div>          
        </section>
    </main>
    )
}

export default AdminAreaType