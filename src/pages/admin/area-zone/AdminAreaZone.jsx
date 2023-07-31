/* Import du style */
import "../admin.scss"

/* Import des fonctions, variables & images */
import { colorMsg, formatDate, cleanLocalStorage } from "../../../js/utils.js"
import imgDelete from "../../../assets/images/button/garbage.png"
import imgUpdate from "../../../assets/images/button/pencil2.png"
import imgFilter from "../../../assets/images/button/filtre.png"

/* Import des composants */
import Header from "../../../layout/header/Header";
import Footer from "../../../layout/footer/Footer";
import ModalConfirm from "../../../components/modal/ModalConfirm"
import Loader from "../../../components/loader/Loader"

/* Import des Hooks & composants react-rooter */
import { useEffect, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"

const AdminAreaZone = () => {
    const token = localStorage.getItem("jwt")
    const navigate = useNavigate()
    const location = useLocation()

    /* Message optionnel affiché au chargement de la page (location.state) */
    const[displayMessage, setDisplayMessage] = useState(location.state ? location.state : {libelle: "", color: ""})
    
    useEffect(() => {window.scrollTo(0,0)},[])

    /*********************************************************
    API DELETE
    - confirmation de l'utilisateur avec le composant modalConfirm
    *********************************************************/
    const[displayConfirmDelete, setDisplayConfirmDelete] = useState(false) // Affichage de la fenêtre modale
    const[dataDelete, setDataDelete] = useState({id: "", name: "", libelle: ""}) // Paramètres de la fenêtre modale

    /* Bouton suppression : la fenêtre modale est affichée */
    const handleDeleteClick = (id, name) => {
        setDataDelete({id: id, name: name, libelle: "Voulez-vous supprimer la zone ?"})       
        setDisplayConfirmDelete(true) 
    }

    /* L'utilisateur a effectué son choix dans la fenêtre modale : true/false */
    const handleConfirmDeleteClick = (isValidated) => {
        if (isValidated) {
            fetch("http://localhost:3001/api/AreaZones/admin/" + dataDelete.id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    }
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
                    // Erreur id inconnu - Erreur de contrainte (intégrité des données)
                    if(["ERR_NOT_FOUND","ERR_CONSTRAINT"].includes(res.status)) {
                        setDisplayMessage({libelle: res.message, color: colorMsg.error})
                        return
                    }

                    setDisplayMessage({libelle: res.message, color: colorMsg.success})
                })
                .catch((error) => {
                    setDisplayMessage({libelle: error.message, color: colorMsg.error})
                })

            setDisplayConfirmDelete(false)
            window.scrollTo(0,0)
        }
        else {
            setDisplayMessage({libelle: "", color: ""})
            setDisplayConfirmDelete(false)
        }
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
    - Chargement de la liste des zones
      et modification du filtre
    *********************************************************/
    const[getAreaZone, setGetAreaZone] = useState(null)
    
    useEffect(() => {
        const requestUrlParams = 
            "sort=" + filterParam.sort +
            "&name=" + filterParam.name

        fetch("http://localhost:3001/api/AreaZones/admin?" + requestUrlParams, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            }})
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                // Token absent ou invalide
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

                setGetAreaZone(res.data)
            })
            .catch((error) => {
                cleanLocalStorage()
                navigate('/erreur', {state: error.message})             
            })
    },[displayConfirmDelete, filterParam, token, navigate])

    /* ---------------------------------------------- JSX ---------------------------------------------- */

    return (
        <>
        <Header />
        <main>
            <section className="container-fluid admin">
                <h1>Administration</h1>
                <div className="container">
                    {getAreaZone === null ?
                    (<Loader />)
                    :
                    (
                        <>
                        {displayConfirmDelete && <ModalConfirm callFunction={handleConfirmDeleteClick} libelle={dataDelete.libelle} name={dataDelete.name}/>}
                        <div className="admin-titre d-flex justify-content-between align-items-center">
                            <h2>Table 'area_zone'</h2>
                            <Link className="btn-admin-add" to={"/admin-area-zone-create"} href="#">Ajouter un élément</Link>
                        </div>
                        <div className="admin-message d-flex justify-content-center align-items-center">
                            <div style={{backgroundColor: displayMessage.color}}>{displayMessage.libelle}</div>
                        </div>
                        {/* --------------- Début zone de filtre --------------- */}
                        <div className="admin-filter d-flex justify-content-between align-items-center">
                            <div className="admin-filter-nb">Nombre de résultats : <span>{getAreaZone.length}</span></div>
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
                        {/* --------------- Fin zone de filtre --------------- */}
                        { getAreaZone.length === 0 ?
                        (
                            <div className="d-flex justify-content-center align-items-center admin-no-result">Aucun résultat...</div>
                        )
                        :
                        (<>
                            {getAreaZone.map((element) => {
                                return (
                                    <div className="row admin-row" key={element.id}>
                                        <div className="col-12 col-lg-2">
                                            <div className="admin-row-img" style={{backgroundImage: `url(${require("../../../assets/images/pages/area-zone/" + element.picture)})`}}></div>
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
                                            <Link className="btn-admin" to={"/admin-area-zone-update/" + element.id} href="#"><img src={imgUpdate} alt="" /></Link>
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
        <Footer />
        </>
    )
}

export default AdminAreaZone