/* Import des fonctions, variables & images */
import { checkStatus } from "./utils.js"

/* Import des Hooks & composants react-rooter */
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const useCheckIsAdmin = (token, route) => {
    const navigate = useNavigate()
    let navParams = {}

    useEffect(() => {
        if(token !== null) {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
            }

            fetch("http://localhost:3001/api/auth/checkRole/admin", requestOptions)
            .then((res) => {
                navParams = {...checkStatus(res.status, route)}
                if(navParams.route !== "") throw new Error("redirect")
            })
            .catch((error) => {
                if(error.message !== "redirect") {
                    navParams.route = "/erreur"
                    navParams.state =  {message: error.message}
                }
                navigate(navParams.route,{state: navParams.state})  
            })
        }
        else {
            localStorage.removeItem("jwt")
            localStorage.removeItem("pseudo")
            navigate('/erreur',{
                state: {message: "Vous n'avez pas les droits requis. Veuillez vous identifier S.V.P."}
            })
        }
    },[token, navigate, route])
}

export { useCheckIsAdmin }