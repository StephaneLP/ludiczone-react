/* Import du style */
import "./homeAreaZone.scss"

/* Import des composants */
import Loader from "../../../components/loader/Loader"

/* Import des Hooks & composants react-rooter */
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

/* ------------------------------------- JAVASCRIPT ------------------------------------ */

const HomeZoneSortie = () => {
    const navigate = useNavigate();
    const[getAreaZone, setGetAreaZone] = useState(null)
 
    /*********************************************************
    API GET
    - Chargement de la liste des zones
    *********************************************************/
    useEffect(() => {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }

        fetch("http://localhost:3001/api/areazone", requestOptions)
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                setGetAreaZone(res.data)
            })
    },[])

    /*********************************************************
    Ouverture de la page Recherche avancée
    - id zone passé en paramètre pour le filtre
    *********************************************************/    
    const handleClickNavigate = (id) => {
        navigate('/search?filter=zone&id=' + id)
    }

/* ---------------------------------------- JSX ---------------------------------------- */

    return (
        <section className="container-fluid home-zone">
            <h2>Recherche par Zone géographique</h2>
            <div className="container">
                <div className="row">
                    {getAreaZone === null ?
                        (<Loader />)
                        :
                        (
                            <>
                            {getAreaZone.map((element) => {
                                return (
                                    <div className="col-12 col-md-6 col-lg-4 zone-section" onClick={() => handleClickNavigate(element.id)} key={element.id}>
                                        <div className="col-12 section-all" style={{backgroundImage: `url(${require("../../../assets/images/pages/area-zone/" + element.picture)})`}}>
                                            <div className="zone-section-title">
                                                <h3>{element.name}</h3>
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

export default HomeZoneSortie
