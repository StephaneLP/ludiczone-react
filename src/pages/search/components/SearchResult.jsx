/* Import du style */
import "./searchResult.scss"

/* Import des composants */
import Loader from "../../../components/loader/Loader"

/* Import des Hooks & composants react-rooter */
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

const SearchResult = (props) => {

    /* ------------------------------------------------------------------------------------------------- */
    /* --------------------------------------- PARTIE JAVASCRIT ---------------------------------------- */
    /* ------------------------------------------------------------------------------------------------- */

    const navigate = useNavigate();
    const [getArea, setGetArea] = useState(null) // Liste des salles

    const [filterParam, setFilterParam] = useState({ // Tri & filtre
        sort: "asc",
        name: "",
        typeId: props.typeId,
        zoneId: props.zoneId,
    })

    /*********************************************************
    API GET
    - Chargement de la liste des salles
    *********************************************************/
    useEffect(() => {
        const requestUrlParams =
            "sort=" + filterParam.sort +
            "&name=" + filterParam.name +
            "&typeId=" + filterParam.typeId +
            "&zoneId=" + filterParam.zoneId

        fetch("http://localhost:3001/api/areas?" + requestUrlParams, {
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
                setGetArea(res.data)
            })
            .catch((error) => {
                navigate("/erreur", {state: error.message})
            })
    },[filterParam, navigate])

    /*********************************************************
    Ouverture de la fiche descriptive d'une salle
    *********************************************************/
    const handleFicheClick = () => {
        navigate("/en-construction")
    }

    /* ------------------------------------------------------------------------------------------------- */
    /* ------------------------------------------ PARTIE JSX ------------------------------------------- */
    /* ------------------------------------------------------------------------------------------------- */

    return (
        <>
        <section className="search-titre">
             <h1>Recherche Avancée</h1>
        </section>
        <section className="container-fluid search">
            <div className="container">
                {getArea === null ?
                (
                    <Loader />
                )
                :
                (
                    <div className="row">
                        {getArea.length === 0 ?
                        (
                            <div className="search-no-result">Aucun résultat ne correspond aux critères de recherche...</div>
                        )
                        :
                        (
                            <>
                            {getArea.map((element) => {
                            return (
                                <div className="col-12 col-md-6 search-box" key={element.id}>
                                    <div className="col-12 search-box-inner">
                                        <div className="search-box-recto" style={{backgroundImage: `url(${require("../../../assets/images/pages/area/" + element.picture)})`}}>
                                            <h2>{element.name}</h2>
                                        </div>                              
                                        <div className="search-box-verso" style={{backgroundImage: `url(${require("../../../assets/images/pages/area/" + element.picture)})`}}>
                                            <div className="search-box-verso-filter">
                                                <h2>{element.name}</h2>
                                                <p>{element.AreaType.name}</p>
                                                <p>{element.AreaZone.name}</p>
                                                <button className="btn-fiche" onClick={handleFicheClick}>Ouvrir la fiche</button>                                    
                                            </div>
                                        </div>                            
                                    </div>
                                </div>
                            )})} 
                            </>
                        )}
                    </div>
                )}
            </div>
        </section>          
        </>
      
    )
}

export default SearchResult