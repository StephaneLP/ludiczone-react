import "./modalLogin.scss"

import { colorMsg, formatDate } from "../../js/utils.js"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const ModalConfirm = (props) => {
    const navigate = useNavigate()

    const[adminMessage, setAdminMessage] = useState({libelle: "", color: ""})
    const[focusLogin, setFocusLogin] = useState("")
    const[focusPassword, setFocusPassword] = useState("")
    const[login, setLogin] = useState("")
    const[password, setPassword] = useState("")

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
        setAdminMessage({libelle: "", color: ""})
        setFocusLogin("")
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setAdminMessage({libelle: "", color: ""})
        setFocusPassword("")
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if(login === "") {
            setAdminMessage({libelle: "Veuillez renseigner un identifiant S.V.P.", color: colorMsg.error})
            setFocusLogin(colorMsg.error)
            return
        }

        if(password === "") {
            setAdminMessage({libelle: "Veuillez renseigner un mot de passe S.V.P.", color: colorMsg.error})
            setFocusPassword(colorMsg.error)
            return
        }

        fetch("http://localhost:3001/api/user/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: login,
                password: password,
            })
        })
        .then((res) => {
            return res.json()          
        })
        .then((res) => {
            if(res.success) {
                localStorage.setItem("jwt",res.token)
                localStorage.setItem("pseudo",res.data.nick_name)
                navigate(0)
            }
            else {
                setAdminMessage({libelle: res.message, color: colorMsg.error})
            }
        })
    }

    const handleCancleClick = () => {
        navigate("/")
    }

    return (
        <div className="modalLogin">
            <div className="validBox">

                <h2>Votre session est expirée...</h2>
                <h3>Veuillez vous identifier S.V.P.</h3>
                <div className="login-message d-flex justify-content-center align-items-center">
                    <div style={{backgroundColor: adminMessage.color}}>{adminMessage.libelle}</div>
                </div>
                <form onSubmit={handleSubmit}>

                        <div className="">
                            <div className="login-cellule">
                                <label>
                                    <input type="text" placeholder="Pseudo ou Email" maxLength="50" value={login} onChange={(e) => handleLoginChange(e)} style={{borderColor: focusLogin}} />
                                </label>
                            </div>
                            <div className="login-cellule">
                                <label>
                                    <input type="password" placeholder="Mot de passe" maxLength="50" value={password} onChange={(e) => handlePasswordChange(e)} style={{borderColor: focusPassword}} />
                                </label>
                            </div>
                        </div>

                        <div className="">
                            <div className="form-buttons">
                                <div>
                                    <input className="btn-confirm" type="submit" value="Valider" />
                                </div>
                                <div>
                                    <button className="btn-confirm-no" onClick={handleCancleClick}>Annuler</button>
                                </div>
                            </div>
                        </div>
                </form>



            </div>
        </div>
    )
}

export default ModalConfirm