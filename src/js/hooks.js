/* Import des fonctions, variables & images */
import { checkStatus } from "./utils.js"

/* Import des Hooks & composants react-rooter */
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

/*********************************************************
Vérifie que l'utilisateur est bien administrateur :
- Paramètres : token et route de la page appelante
  (pour une redirection en cas d'erreur)
*********************************************************/
const useCheckIsAdmin = (token, route) => {
    const navigate = useNavigate()
    let navParams = {} // Paramètres pour la redirection en cas d'erreur

    useEffect(() => {
        if(token !== null) {
            fetch("http://localhost:3001/api/auth/checkRole/admin", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                /* Vérification du statut de la réponse :
                si status <> 200 alors redirection */
                navParams = {...checkStatus(res.status, route)}
                if(navParams.route !== "") {
                    localStorage.removeItem("jwt")
                    localStorage.removeItem("pseudo")
                    navigate(navParams.route,{state: navParams.state})
                }
            })
            .catch((error) => {
                localStorage.removeItem("jwt")
                localStorage.removeItem("pseudo")
                navigate('/erreur',{state: {message: error.message}})
            })
        }
        else { // Aucun token n'est présent dans le localStorage
            localStorage.removeItem("jwt")
            localStorage.removeItem("pseudo")
            navigate('/erreur',{state: {message: "Vous n'avez pas les droits requis. Veuillez vous identifier S.V.P."}})
        }
    },[token, navigate, route])
}

export { useCheckIsAdmin }