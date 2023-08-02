/* Import des fonctions, variables & images */
import { cleanLocalStorage } from "./utils.js"

/* Import des Hooks & composants react-rooter */
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

/*********************************************************
Vérifie que l'utilisateur est bien administrateur :
- Paramètres : token et route de la page appelante
  (pour une redirection en cas d'erreur)
*********************************************************/
const useCheckIsAdmin = (token) => {
    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:3001/api/auth/checkadmin", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            return res.json() 
        })
        .then((res) => {
            // Token invalide
            if(["ERR_AUTHENTICATION"].includes(res.status)) {
                cleanLocalStorage()
                navigate("/reconnect")
            }
            // Token absent - Droits insuffisants - Erreur serveur
            if(["ERR_REQUEST","ERR_USER_RIGHTS","ERR_SERVER"].includes(res.status)) {
                cleanLocalStorage()
                navigate("/erreur", {state: res.message})
            }
        })
        .catch((error) => {
            cleanLocalStorage()
            navigate('/erreur', {state: error.message})
        })
    },[token, navigate])
}

export { useCheckIsAdmin }