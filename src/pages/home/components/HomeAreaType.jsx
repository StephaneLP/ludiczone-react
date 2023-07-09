/* Import du style */
import "./homeAreaType.scss"

/* Import des composants */
import Loader from "../../../components/loader/Loader"

/* Import des Hooks & composants react-rooter */
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

const HomeTypeSortie = () => {

    /* ------------------------------------------------------------------------------------- */
    /* ------------------------------------- JAVASCRIPT ------------------------------------ */
    /* ------------------------------------------------------------------------------------- */

    const navigate = useNavigate();
    const[getAreaType, setGetAreaType] = useState(null)

    /*********************************************************
    API GET
    - Chargement de la liste des types de loisir
    *********************************************************/
    useEffect(() => {
        fetch("http://localhost:3001/api/areatypes", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                if(["ERR_SERVER"].includes(res.status)) {
                    navigate("/erreur", {state: res.message})
                    return
                }
                setGetAreaType(res.data)
            })
    },[navigate])

    /*********************************************************
    Ouverture de la page Recherche avancée
    - id type passé en paramètre pour le filtre
    *********************************************************/  
    const handleClickNavigate = (id) => {
        navigate('/search?filter=type&id=' + id)
    }

    /* ------------------------------------------------------------------------------------- */
    /* ---------------------------------------- JSX ---------------------------------------- */
    /* ------------------------------------------------------------------------------------- */
    
    return (
        <section className="container-fluid home-type">
            <h2>Recherche par type de loisir</h2>
            <div className="container">
                <div className="row">
                    {getAreaType === null ?
                        (<Loader />)
                        :
                        (
                            <>
                            {getAreaType.map((element) => {
                                return (
                                    <div className="col-12 col-lg-6 type-section" onClick={() => handleClickNavigate(element.id)} key={element.id}>
                                        <div className="col-12 d-flex flex-row section-all">
                                            <div className="d-flex flex-column justify-content-center align-items-center type-section-left">
                                                <h3>{element.name}</h3>
                                            </div>
                                            <div className="type-section-right" style={{backgroundImage: `url(${require("../../../assets/images/pages/area-type/" + element.picture)})`}}>
                                            </div>
                                        </div>
                                    </div>   
                                )
                            })}
                            </>
                        )
                    }
                </div>
            </div>            
        </section>        
    )
}

export default HomeTypeSortie