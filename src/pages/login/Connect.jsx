import "./login.scss"

import { colorMsg, formatDate } from "../../js/utils.js"
import { useEffect, useState } from "react"

const Connect = () => {

    const[adminMessage, setAdminMessage] = useState({libelle: "", color: ""})

    const handleSubmit = () => {
        console.log("ok")
    }

    return (
    <main>
        <section className="container-fluid login">
            <h1>Connection</h1>
            <div className="container">
                <div className="admin-login d-flex justify-content-center align-items-center">
                    <div style={{backgroundColor: adminMessage.color}}>{adminMessage.libelle}</div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-2"></div>
                    <div className="col-12 col-md-8 login-separator-top"></div>
                    <div className="col-12 col-md-2"></div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-2"></div>
                    <div className="col-12 col-md-4">
                        <label>
                            <span className="label-libelle">Identifiant</span>
                            {/* <input type="text" maxLength="50" value={createName} onChange={(e) => handleNameChange(e)} style={{borderColor: focusName}} /> */}
                            <input type="text" maxLength="50" placeholder="Identifiant" />
                        </label> 

                    </div>
                    <div className="col-12 col-md-4"
                    
                    
                    ></div>
                    <div className="col-12 col-md-2"></div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-2"></div>
                    <div className="col-12 col-md-8 login-separator-bottom"></div>
                    <div className="col-12 col-md-2"></div>
                </div>
            </div>
        </section>
    </main>
    )
}

export default Connect