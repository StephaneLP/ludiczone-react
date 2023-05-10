import "./admin.scss"
import Loader from "../../components/loader/Loader"
import Menu from "../../layout/menu/Menu"
import { useEffect, useState } from "react"

const AdminAreaType = () => {
    const[getAreaType, setGetAreaType] = useState(null)

    useEffect(() => {
        fetch("http://localhost:3001/api/areatype")
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                setGetAreaType(res.data)
            })
    },[])

    return (
    <main>
        <Menu />
        <section className="container admin">
            <h1>Administration de la table 'area_type'</h1>
            <div className="container">
                <div className="row">
                {getAreaType === null ?
                        (<Loader />)
                        :
                        (
                            <>
                            {getAreaType.map((element) => {
                                return (
                                    <div className="col-12" key={element.id}>
                                        <p>{element.id}</p>
                                        <h3>{element.name}</h3>
                                        <hr></hr>
                                    </div>
                                )
                                })}
                            </>
                        )
                    }
                </div>
            </div>          
        </section>
    </main>
    )
}

export default AdminAreaType