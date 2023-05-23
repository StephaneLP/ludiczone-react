import "./homeZoneSortie.scss"
import Loader from "../../../components/loader/Loader"

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"

const HomeZoneSortie = () => {
    const navigate = useNavigate();
    const[getAreaZone, setGetAreaZone] = useState(null)
  
    useEffect(() => {
        fetch("http://localhost:3001/api/areazone")
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                setGetAreaZone(res.data)
            })
    },[])

    const handleClickNavigate = (id) => {
        navigate('/search',{
            state: {
                Zone: id,
              }
        })
    }

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
                                    <div className="col-12 col-lg-4 zone-section" onClick={() => handleClickNavigate(element.id)} key={element.id}>
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