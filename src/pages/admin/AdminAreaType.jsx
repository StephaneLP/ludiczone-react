//////////////////////////////////////////////////////////
//
//    PARTIE : IMPORTS
//
//////////////////////////////////////////////////////////

import "./admin.scss"

/* Import des fonctions, variables & images */
import { colorMsg, formatDate, checkStatus } from "../../js/utils.js"
import imgDelete from "../../assets/images/button/garbage.png"
import imgUpdate from "../../assets/images/button/pencil2.png"
import imgFilter from "../../assets/images/button/filtre.png"

/* Import des composants */
import Loader from "../../components/loader/Loader"
import Menu from "../../layout/menu/Menu"
import ModalConfirm from "../../components/modalconfirm/ModalConfirm"

/* Import des Hooks & composants react-rooter */
import { useEffect, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"

//////////////////////////////////////////////////////////
//
//    PARTIE : JAVASCRIPT
//
//////////////////////////////////////////////////////////

const AdminAreaType = () => {
    const token = localStorage.getItem("jwt")
    const navigate = useNavigate()
    const location = useLocation()
    const[adminMessage, setAdminMessage] = useState({libelle: "", color: ""})
    
    useEffect(() => {window.scrollTo(0,0)},[])

    //////////////////////////////////////////////////////////
    // DELETE (confirmation avec le composant modalConfirm)
    //////////////////////////////////////////////////////////

    const[displayConfirmDelete, setDisplayConfirmDelete] = useState(false)
    const[dataDelete, setDataDelete] = useState({id: "", name: "", libelle: ""})

    const handleDeleteClick = (id, name) => {
        setDataDelete({id: id, name: name, libelle: "Voulez-vous supprimer le type ?"})       
        setDisplayConfirmDelete(true) 
    }

    const handleConfirmDeleteClick = (isValidated) => {
        if (isValidated) {
            const requestOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
            }

            fetch("http://localhost:3001/api/areatype/admin/" + dataDelete.id, requestOptions)
            .then((res) => {
                if(res.status === 401) {
                    navigate('/connect',{
                        state: {
                            reconnect: true,
                            route: location.pathname
                        }
                    })
                }
                return res.json() 
            })
            .then((res) => {
                if(res.success) {
                    setAdminMessage({libelle: res.message, color: colorMsg.success})
                }
                else {
                    setAdminMessage({libelle: res.message, color: colorMsg.error})
                }
            })
            .catch((error) => {
                setAdminMessage({libelle: error, color: colorMsg.error})
            })
            setDisplayConfirmDelete(false)
            window.scrollTo(0,0)
        }
        else {
            setAdminMessage({libelle: "", color: ""})
            setDisplayConfirmDelete(false)
        }
    }

    //////////////////////////////////////////////////////////
    // FILTRE
    //////////////////////////////////////////////////////////

    const[filterParam, setFilterParam] = useState({
        sort: "asc",
        name: "",
    })
    const[filterSort, setFilterSort] = useState("asc")
    const[filterName, setFilterName] = useState("")

    const handleFilterSubmit = (event) => {
        event.preventDefault()
        let newParam = {...filterParam}
        newParam.sort = filterSort
        newParam.name = filterName.trim()
        setFilterParam(newParam)
        setAdminMessage({libelle: "", color: ""})
    }

    const handleFilterRAZ = () => {
        setFilterSort("asc")
        setFilterName("")
    }

    //////////////////////////////////////////////////////////
    // GET (chargement de la page et modification du filtre)
    //////////////////////////////////////////////////////////

    const[getAreaType, setGetAreaType] = useState(null)

    useEffect(() => {
        let navParams = {}

        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        }

        const requestUrl = "http://localhost:3001/api/areatype/admin" +
            "?sort=" + filterParam.sort +
            "&name=" + filterParam.name

        fetch(requestUrl, requestOptions)
            .then((res) => {
                navParams = {...checkStatus(res.status, location.pathname)}
                if(navParams.route !== "") throw new Error("redirect")
                return res.json()
            })
            .then((res) => {
                setGetAreaType(res.data)
                if(location.state !== null) {
                    if(location.state.alter !== null) {
                        if(location.state.alter.success) {
                            setAdminMessage({libelle: location.state.alter.message, color: colorMsg.success})
                        }
                        location.state = null
                    }
                }
            })
            .catch((error) => {
                if(error.message !== "redirect") {
                    navParams.route = "/erreur"
                    navParams.state =  {message: error.message}
                }
                navigate(navParams.route,{state: navParams.state})                 
            })
    },[displayConfirmDelete, filterParam, token, location, navigate])

    //////////////////////////////////////////////////////////
    //
    //    PARTIE : JSX
    //
    //////////////////////////////////////////////////////////

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
                    {displayConfirmDelete && <ModalConfirm callFunction={handleConfirmDeleteClick} libelle={dataDelete.libelle} name={dataDelete.name}/>}
                    <div className="admin-titre d-flex justify-content-between align-items-center">
                        <h2>Table 'area_type'</h2>
                        <Link className="btn-admin-add" to={"/admin-area-type-create"} href="#">Ajouter un élément</Link>
                    </div>
                    <div className="admin-message d-flex justify-content-center align-items-center">
                        <div style={{backgroundColor: adminMessage.color}}>{adminMessage.libelle}</div>
                    </div>
                    <div className="admin-filter d-flex justify-content-between align-items-center">
                        <div className="admin-filter-nb">Nombre de résultats : <span>{getAreaType.length}</span></div>
                        <nav className="navbar bg-body-tertiary">
                            <button className="navbar-toggler btn-admin" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                                <img src={imgFilter} alt="" />
                            </button>
                            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                                <div className="offcanvas-header">
                                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Zone de Filtre</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body">
                                    <form className="d-flex flex-column admin-filter-form" onSubmit={handleFilterSubmit} role="search">
                                        <label>
                                            <span className="label-libelle">Tri</span>
                                            <select value={filterSort}  onChange={(e) => setFilterSort(e.target.value)}>
                                                <option value="asc">Nom croissant</option>
                                                <option value="desc">Nom décroissant</option>
                                            </select>
                                        </label>
                                        <hr />
                                        <label>
                                            <span className="label-libelle">Nom</span>
                                            <input type="text" value={filterName} onChange={(e) => setFilterName(e.target.value)} />
                                        </label>
                                        <div className="form-buttons">
                                            <div>
                                                <input className="btn-confirm" type="submit" value="Valider" data-bs-dismiss="offcanvas" />
                                            </div>
                                            <div>
                                                <button className="btn-confirm-no" onClick={handleFilterRAZ} data-bs-dismiss="offcanvas">Réinitialiser</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </nav>
                    </div>
                    { getAreaType.length === 0 ?
                    (
                        <div className="d-flex justify-content-center align-items-center admin-no-result">Aucun résultat...</div>
                    )
                    :
                    (<>
                        {getAreaType.map((element) => {
                            return (
                                <div className="row admin-row" key={element.id}>
                                    <div className="col-12 col-lg-2">
                                        <div className="admin-row-img" style={{backgroundImage: `url(${require("../../assets/images/pages/area-type/" + element.picture)})`}}></div>
                                    </div>
                                    <div className="col-12 col-lg-3 admin-row-title">
                                        {element.name}
                                    </div>
                                    <div className="col-12 col-lg-2 justify-content-center">
                                        Created : {formatDate(element.created_at,"short")}
                                    </div>
                                    <div className="col-12 col-lg-2 justify-content-center">
                                        Updated : {formatDate(element.updated_at,"short")}
                                    </div>
                                    <div className="col-12 col-lg-1 justify-content-end">
                                        Id : {element.id}
                                    </div>
                                    <div className="col-12 col-lg-2 justify-content-end">
                                        <Link className="btn-admin" to={"/admin-area-type-update/" + element.id} href="#"><img src={imgUpdate} alt="" /></Link>
                                        <Link className="btn-admin" onClick={() => handleDeleteClick(element.id, element.name)}><img src={imgDelete} alt="" /></Link>
                                    </div>
                                </div>
                            )
                        })} 
                    </>)
                    }
                    </>
                )}
            </div>          
        </section>
    </main>
    )
}

export default AdminAreaType