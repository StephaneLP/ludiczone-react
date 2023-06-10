import "./searchResult.scss"
import Loader from "../../../components/loader/Loader"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"

const SearchResult = (props) => {
    const [params, setParams] = useState(props.params)
    const navigate = useNavigate();
    const[getArea, setGetArea] = useState(null)
    const[filterParam, setFilterParam] = useState({
        sort: "asc",
        search: "",
        typeId: "",
        zoneId: "",
    })

    if(params) {
        if(params.filter !== "") {
            let newParam = {...filterParam}
            newParam.typeId = (params.filter === "type" ? params.id : "")
            newParam.zoneId = (params.filter === "zone" ? params.id : "")
            setFilterParam(newParam)
            setParams(null)
        }
    }

    useEffect(() => {
        fetch("http://localhost:3001/api/area?sort=" + filterParam.sort + "&search=" + filterParam.search  + "&typeId=" + filterParam.typeId + "&zoneId=" + filterParam.zoneId)
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                if(res.success) {
                    setGetArea(res.data)
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
    },[filterParam, navigate])

    const handleFicheClick = () => {
        navigate("/en-construction")
    }

    //////////////////////////////////////////////////////////
    // JSX
    //////////////////////////////////////////////////////////

    return (
        <section className="container-fluid search">
            <h1>Recherche Avancée</h1>
            <div className="container">
                {getArea === null ?
                    (<Loader />)
                    :
                    (
                    <div className="row">
                        { getArea.length === 0 ?
                        (
                            <div className="d-flex justify-content-center align-items-center search-no-result">Aucun résultat...</div>
                        )
                        :
                        (<>
                            {getArea.map((element) => {
                                return (
                                    <div className="col-12 col-md-6 search-box" key={element.id}>
                                        <div className="col-12 search-box-inner">
                                            <div className="search-box-recto d-flex justify-content-center align-items-end" style={{backgroundImage: `url(${require("../../../assets/images/pages/area/" + element.picture)})`}}>
                                                <h3>{element.name}</h3>
                                            </div>                              
                                            <div className="search-box-verso" style={{backgroundImage: `url(${require("../../../assets/images/pages/area/" + element.picture)})`}}>
                                                <div className="d-flex flex-column justify-content-center align-items-center search-box-verso-filter">
                                                    <h3>{element.name}</h3>
                                                    <p>{element.AreaType.name}</p>
                                                    <p>{element.AreaZone.name}</p>
                                                    <button className="btn" onClick={handleFicheClick}>Ouvrir la fiche</button>                                    
                                                </div>
                                            </div>                            
                                        </div>
                                    </div>
                                )
                            })} 
                        </>)}
                    </div>
                    )}
            </div>            
        </section>        
    )
}

// <p>Virtual Room, 1ère salle de réalité virtuelle collaborative à Bordeaux, propose des expériences originales et accessibles à tous en équipe de 2 à 4 joueurs.</p>
// <p>À la croisée des chemins entre l’escape game et le cinéma, embarquez pour une aventure virtuelle unique en son genre alliant réflexion, communication et esprit d’équipe !</p>
// <p>+33 (0)5 57 13 11 60</p>
// <p>3 Sente de la Nancy
// <br />33300 Bordeaux</p>

// Prévoir pour le responsive :
//
// const goBoxVerso = (event) => {
//     event.currentTarget.classList.add("active")
// }
//
// const backBoxRecto = (event) => {
//     event.currentTarget.classList.remove("active")
// }
//
// Avec : onClick={() => goBoxVerso('1')} onMouseLeave={() => backBoxRecto('1')}

export default SearchResult