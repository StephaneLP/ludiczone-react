/* Import du style */
import "../admin.scss"

/* Import des fonctions, variables & images */
import { formatDate, cleanLocalStorage } from "../../../js/utils.js"

/* Import des composants */
import Header from "../../../layout/header/Header"
import Menu from "../../../layout/menu/Menu"
import Footer from "../../../layout/footer/Footer"
import ModalDelete from "../../../components/modal/ModalDelete"
import Loader from "../../../components/loader/Loader"

/* Import des Hooks & composants react-rooter */
import { useEffect, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"

const AdminAreaType = () => {

    /* ------------------------------------------------------------------------------------------------- */
    /* --------------------------------------- PARTIE JAVASCRIT ---------------------------------------- */
    /* ------------------------------------------------------------------------------------------------- */

    const token = localStorage.getItem("jwt")
    const navigate = useNavigate()
    const location = useLocation()

    /* Message optionnel affiché au chargement de la page (location.state) */
    const[displayMessage, setDisplayMessage] = useState(location.state ? location.state : {libelle: "", color: ""})
    
    useEffect(() => {window.scrollTo(0,0)},[])

    /*********************************************************
    DELETE
    *********************************************************/
    const[displayModalDelete, setDisplayModalDelete] = useState(false) // Affichage de la fenêtre modale
    const[dataDelete, setDataDelete] = useState({urlapi: "", name: "", libelle: ""}) // Paramètres de la fenêtre modale

    /* Bouton suppression : la fenêtre modale est affichée */
    const handleDeleteClick = (id, name) => {
        const url = "http://localhost:3001/api/areatypes/admin/" + id
        const libelle = "Supprimer la catégorie :"

        setDataDelete({urlapi: url, name: name, libelle: libelle})       
        setDisplayModalDelete(true) 
    }

    /* L'utilisateur a effectué son choix dans la fenêtre modale */
    const handleConfirmDeleteClick = (message) => {
        if(message.libelle !== "") {
            setDisplayMessage({libelle: message.libelle, color: message.color})
            window.scrollTo(0,0)
        }
        setDisplayModalDelete(false)
    }

    /*********************************************************
    FILTRE
    *********************************************************/
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
        setDisplayMessage({libelle: "", color: ""})
    }

    const handleFilterRAZ = () => {
        setFilterSort("asc")
        setFilterName("")
    }

    /*********************************************************
    API GET
    - Chargement de la liste des types de loisir
      et modification du filtre
    *********************************************************/
    const[getAreaType, setGetAreaType] = useState(null)
    
    useEffect(() => {
        const requestUrlParams = 
            "sort=" + filterParam.sort +
            "&name=" + filterParam.name

        fetch("http://localhost:3001/api/areatypes/admin?" + requestUrlParams, {
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

                setGetAreaType(res.data)
            })
            .catch((error) => {
                cleanLocalStorage()
                navigate('/erreur', {state: error.message})             
            })
    },[displayModalDelete, filterParam, token, navigate])

    /* ------------------------------------------------------------------------------------------------- */
    /* ------------------------------------------ PARTIE JSX ------------------------------------------- */
    /* ------------------------------------------------------------------------------------------------- */

    return (
        <>
        <Header />
        <main>
            <Menu />{/* Menu placé dans <main> pour la propriété CSS position: sticky */}
            <section className="container-fluid admin">
                <h1>Administration</h1>
                <div className="container">
                    {getAreaType === null ?
                    (
                        <Loader />
                    )
                    :
                    (
                        <>
                        {displayModalDelete && <ModalDelete callFunction={handleConfirmDeleteClick} params={dataDelete} token={token} />}
                        <div className="admin-titre">
                            <h2>Table 'area_type'</h2>
                            <Link className="btn-admin btn-admin-add" to={"/admin-area-type-create"} href="#">Ajouter un élément</Link>
                        </div>
                        <div className="admin-message">
                            <div style={{backgroundColor: displayMessage.color}}>{displayMessage.libelle}</div>
                        </div>
                        {/* --------------- Début zone de filtre --------------- */}
                        <div className="admin-filter">
                            <div className="admin-filter-nb">Nombre de résultats : <span>{getAreaType.length}</span></div>
                            <nav className="navbar bg-body-tertiary">
                                <button className="navbar-toggler btn-admin btn-admin-filter" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation"></button>
                                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                                    <div className="offcanvas-header">
                                        <h3 className="offcanvas-title" id="offcanvasNavbarLabel">Zone de Tri & Filtre</h3>
                                        <button className="btn-close" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div className="offcanvas-body">
                                        <form className="admin-filter-form" onSubmit={handleFilterSubmit} role="search">
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
                        {/* --------------- Fin zone de filtre --------------- */}
                        { getAreaType.length === 0 ?
                        (
                            <div className="admin-no-result">Aucun résultat ne correspond aux critères de recherche...</div>
                        )
                        :
                        (<>
                            {getAreaType.map((element) => {
                                return (
                                    <div className="row admin-row" key={element.id}>
                                        <div className="col-12 col-lg-2">
                                            <div className="admin-row-img" style={{backgroundImage: `url(${require("../../../assets/images/pages/area-type/" + element.picture)})`}}></div>
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
                                            <Link className="btn-admin btn-admin-update" to={"/admin-area-type-update/" + element.id} href="#"></Link>
                                            <Link className="btn-admin btn-admin-delete" onClick={() => handleDeleteClick(element.id, element.name)}></Link>
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
        <Footer />
        </>
    )
}

export default AdminAreaType