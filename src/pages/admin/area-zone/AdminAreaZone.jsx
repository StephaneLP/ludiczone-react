import "../admin.scss"
import imgDelete from "../../../assets/images/button/garbage.png"
import imgUpdate from "../../../assets/images/button/pencil2.png"
import imgFilter from "../../../assets/images/button/filtre.png"

import Loader from "../../../components/loader/Loader"
import Menu from "../../../layout/menu/Menu"
import ModalConfirm from "../../../components/modalconfirm/ModalConfirm"

import { colorMsg, formatDate } from "../../../js/utils.js"
// import { useCheckTokenRole } from "../../js/hooks.js"
import { useEffect, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"

const AdminAreaZone = () => {
    const token = localStorage.getItem("jwt")
    const navigate = useNavigate()
    const location = useLocation()
    const[adminMessage, setAdminMessage] = useState({libelle: "", color: ""})
    
    useEffect(() => {window.scrollTo(0,0)},[])

    //////////////////////////////////////////////////////////
    // CONTROLE DE LA VALIDITE DU TOKEN ET DES DROITS
    //////////////////////////////////////////////////////////

    // useCheckTokenRole(token, "admin", location.pathname)

    //////////////////////////////////////////////////////////
    // DELETE (confirmation avec le composant modalConfirm)
    //////////////////////////////////////////////////////////

    const[displayConfirmDelete, setDisplayConfirmDelete] = useState(false)
    const[dataDelete, setDataDelete] = useState({id: "", name: "", libelle: ""})

    const handleDeleteClick = ((id, name) => {
        setDataDelete({id: id, name: name, libelle: "Voulez-vous supprimer la zone ?"})       
        setDisplayConfirmDelete(true) 
    })

    const handleConfirmDeleteClick = (isValidated) => {
        if (isValidated) {
            fetch("http://localhost:3001/api/areazone/" + dataDelete.id,{
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if(res.status === 401) {
                    navigate('/connect',{
                        state: true
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
                setDisplayConfirmDelete(false)
            })
            .catch((error) => {
                setAdminMessage({libelle: error, color: colorMsg.error})
                setDisplayConfirmDelete(false)
            })
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
        search: "",
    })
    const[filterSort, setFilterSort] = useState("asc")
    const[filterName, setFilterName] = useState("")

    const handleFilterSubmit = (event) => {
        event.preventDefault()
        let newParam = {...filterParam}
        newParam.sort = filterSort
        newParam.search = filterName.trim()
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

    const[getAreaZone, setGetAreaZone] = useState(null)

    useEffect(() => {
        fetch("http://localhost:3001/api/areazone?sort=" + filterParam.sort + "&search=" + filterParam.search)
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                if(res.success) {
                    setGetAreaZone(res.data)
                    if(location.state !== null) {
                        if(location.state.alter !== null) {
                            if(location.state.alter.success) {setAdminMessage({libelle: location.state.alter.message, color: colorMsg.success})}
                            else {setAdminMessage({libelle: location.state.alter.message, color: colorMsg.error})}
                            location.state = null
                        }
                    }
                }
                else {
                    navigate('/erreur',{
                        state: {message: res.message}
                    })
                }
            })
            .catch((error) => {
                navigate('/erreur',{
                    state: {erreur: error}
                })
            })
    },[displayConfirmDelete, filterParam, location, navigate])

    //////////////////////////////////////////////////////////
    // JSX
    //////////////////////////////////////////////////////////

    return (
    <main>
        <Menu />
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
                        <div style={{backgroundColor: adminMessage.color}}>{adminMessage.libelle}</div>
                    </div>
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
    )
}

export default AdminAreaZone