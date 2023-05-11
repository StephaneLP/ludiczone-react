import "./admin.scss"
import Loader from "../../components/loader/Loader"
import Menu from "../../layout/menu/Menu"
import imgDelete from "../../assets/images/button/garbage.png"
import imgUpdate from "../../assets/images/button/pencil.png"
import { formatDate } from "../../utils/utils.js"
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
                {/* <div className="row"> */}
                {getAreaType === null ?
                        (<Loader />)
                        :
                        (
                            <>

                    
                            {getAreaType.map((element) => {
                                return (
                                    <div className="row tab-row" key={element.id}>
                                        <div className="col-12 col-lg-1">
                                            Id : {element.id}
                                        </div>
                                        <div className="col-12 col-lg-3">
                                            {element.name}
                                        </div>
                                        <div className="col-12 col-lg-3">
                                            Created : {formatDate(element.created_at,"short")}
                                        </div>
                                        <div className="col-12 col-lg-3">
                                            Updated : {formatDate(element.updated_at,"short")}
                                        </div>
                                        <div className="col-12 col-lg-2">
                                            <img src={imgUpdate} />
                                            <img src={imgDelete} />

                                            {/* <Link className="btn-logo" to={"/update-coworking/" + singleCoworking.id} href="#"><img src="/img/pencil3.png" /></Link>
                                            <Link className="btn-logo" onClick={handleShowModalClick}><img src="/img/garbage.png" /></Link> */}
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