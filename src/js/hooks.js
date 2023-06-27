/* Import des fonctions, variables & images */
import { cleanLocalStorage, checkStatus } from "./utils.js"

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

    useEffect(() => {
        fetch("http://localhost:3001/api/auth/checkRole/admin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            /*********************************************************
            Vérification du statut de la réponse. Si status <> 200 :
            - route de redirection renseignée
            - nettoyage du localStorage et redirection
            *********************************************************/
            let navParams = {...checkStatus(res.status, route)}
            if(navParams.route !== "") {
                cleanLocalStorage()
                navigate(navParams.route,{state: navParams.state})
            }
        })
        .catch((error) => {
            cleanLocalStorage()
            navigate('/erreur',{state: {message: error.message}})
        })
    },[token, navigate, route])
}

export { useCheckIsAdmin }