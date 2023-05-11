import "./admin.scss"
import Loader from "../../components/loader/Loader"
import Menu from "../../layout/menu/Menu"
import imgDelete from "../../assets/images/button/garbage.png"
import imgUpdate from "../../assets/images/button/pencil3.png"
import { formatDate } from "../../js/utils.js"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

const AdminAreaType = () => {
    const[getAreaType, setGetAreaType] = useState(null)
    const[param, setParam] = useState({
        sort: "asc",
        search: "",
    })
    useEffect(() => {
        fetch("http://localhost:3001/api/areatype")
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                setGetAreaType(res.data)
            })
    },[])





    const[displayModalDelete, setDisplayModalDelete] = useState(false)

    const handleShowModalClick = (() => {
        setDisplayModalDelete(true)
    })

    const libelle = "Etes-vous sûr de vouloir supprimer le Coworking ?"
    // const token = localStorage.getItem("jwt")
    const handleCancelledClick = (isValidated) => {
        if (isValidated) {
        //     fetch("http://localhost:3001/api/coworking/" + id,{
        //         method: "DELETE",
        //         // headers: {
        //         //     authorization: `Bearer ${token}`,
        //         // },
        //     })
        //     .then((res) => {
        //         return res.json()          
        //     })
        //     .then((res) => {
        //         console.log(res)
        //         navigate("/coworking")
        //     })
        } else {
            setDisplayModalDelete(false)

        }
    }

    const handleSubmit = () => {
        console.log("Création")
    }

    const handleSortClick = () => {
        console.log("Tri")
    }

    return (
    <main>
        <Menu />
        <section className="container admin">
            <h1>Administration</h1>
            <h2>Table 'area_type'</h2>
            <div className="container">
                {/* <div className="row"> */}
                {getAreaType === null ?
                        (<Loader />)
                        :
                        (
                            <>
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <div className="tri">Nombre de résultats : <span>{getAreaType.length}</span></div>
                                <div className="tri">
                                    <span>Tri par nom : </span>
                                    <input type="radio" name="tri" value="asc" onChange={handleSortClick} checked={param.sort==="asc"} />
                                    <label>Croissant</label>
                                    <input type="radio" name="tri" value="desc" onChange={handleSortClick} checked={param.sort==="desc"} />
                                    <label>Décroissant</label>   
                                </div>
                            </div>
                            <div className="row">
                                <div className="filtre d-flex justify-content-between align-items-center">
                                    <form onSubmit={handleSubmit}>
                                        <label>
                                            Nom
                                            <input type="text" name="name" />
                                        </label>
                                        <input type="submit" value="Filtrer" />
                                    </form>
                                    <Link className="btn-admin-add" to={"/"} href="#">Ajouter un élément</Link>
                                </div>
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
                                            <Link className="btn-admin" onClick={handleShowModalClick}><img src={imgDelete} /></Link>
                                        </div>
                                        {/* <hr></hr> */}
                                    </div>
                                )
                            })}

                            </>
                        )
                    }
                {/* </div> */}
            </div>          
        </section>
    </main>
    )
}

export default AdminAreaType