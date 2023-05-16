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
    // const token = localStorage.getItem("jwt")
    const navigate = useNavigate()
    const[adminMessage, setAdminMessage] = useState({libelle: "", color: ""})
    
    //////////////////////////////////////////////////////////
    // DELETE : CONFIRMATION A L'AIDE DE LA FENETRE MODALE CONFIRM
    // APPEL DE L'API DELETE
    //////////////////////////////////////////////////////////

    const[displayConfirmDelete, setDisplayConfirmDelete] = useState(false)
    const[dataDelete, setDataDelete] = useState({id: "", name: "", libelle: ""})

    const handleDeleteClick = ((id, name) => {
        setDataDelete({id: id, name: name, libelle: "Voulez-vous supprimer le type ?"})       
        setDisplayConfirmDelete(true) 
    })

    const handleConfirmDeleteClick = (isValidated) => { 
        if (isValidated) {
            fetch("http://localhost:3001/api/areatype/" + dataDelete.id,{
                method: "DELETE",
                // headers: {
                //     authorization: `Bearer ${token}`,
                // },
            })
            .then((res) => {
                return res.json()          
            })
            .then((res) => {
                if(res.success) {
                    setAdminMessage({libelle: res.message, color: "green"})
                }
                else {
                    setAdminMessage({libelle: res.message, color: "brown"})
                }
            })
            .catch((error) => {
                setAdminMessage({libelle: error, color: "brown"})
            })
        }
        setDisplayConfirmDelete(false)
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
    }

    const handleFilterRAZ = () => {
        setFilterSort("asc")
        setFilterName("")
    }

    //////////////////////////////////////////////////////////
    // CHARGEMENT : APPEL DE L'API GET
    // PARAMETRES : CHANGEMENT DANS LA ZONE DE FILTRE
    //////////////////////////////////////////////////////////

    const[getAreaType, setGetAreaType] = useState(null)

    useEffect(() => {
        fetch("http://localhost:3001/api/areatype?sort=" + filterParam.sort + "&search=" + filterParam.search)
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                if(res.success) {
                    setGetAreaType(res.data)
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
    },[displayConfirmDelete, filterParam])

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
                                        <img src={imgFilter} />
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
                                                <div className="admin-row-img" style={{backgroundImage: `url(${require("../../assets/images/type-sortie/" + element.picture)})`}}></div>
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
                                                <Link className="btn-admin" to={"/" + element.id} href="#"><img src={imgUpdate} /></Link>
                                                <Link className="btn-admin" onClick={() => handleDeleteClick(element.id, element.name)}><img src={imgDelete} /></Link>
                                            </div>
                                        </div>
                                    )
                                })} 
                            </>)
                            }
                            </>
                        )
                    }
            </div>          
        </section>
    </main>
    )
}

export default AdminAreaType