import { useEffect } from "react"

const colorMsg = {
    success: "#77a366",
    error: "#b65d5d",
}

const formatDate = (dateString, mode) => {
    const optionsShort = { year: "numeric", month: "long", day: "numeric" }
    const optionsLong = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }

    return new Date(dateString).toLocaleDateString("fr-FR", (mode === "short" ? optionsShort : optionsLong))
}

const getRole = (token) => {
    let status = 0
    return(
        fetch("http://localhost:3001/api/user/role",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            status = res.status
            return res.json()          
        })
        .then((res) => {
            if(res.success) {
                return {status: 200, role: res.data}
            }
            else {
                return {status: status, role: ""}
            }
        })
        .catch(() => {
            return {status: 401, role: ""}
        })
    )   
}

const useCheckTokenValid = (token, navigate) => {
    useEffect(() => {
        if(token !== null) {

            fetch("http://localhost:3001/api/user/role",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if(res.status === 401) {
                    navigate('/connect',{
                        state: {
                            reconnect: true,
                            route: "/admin-area-zone"
                        }
                    })
                }
                else if(res.status === 403) {
                    localStorage.removeItem("jwt")
                    localStorage.removeItem("pseudo")
                    navigate('/erreur',{
                        state: {message: "Vous n'avez pas les droits requis. Veuillez vous reconnecter S.V.P."}
                    })
                }
                else if(res.status === 500) {
                    navigate('/erreur',{
                        state: {message: "Une erreur interne au serveur est survenue (Erreur 500)."}
                    })
                }
                return res.json()          
            })
            .then((res) => {
                if(res.data !== "admin") {
                    localStorage.removeItem("jwt")
                    localStorage.removeItem("pseudo")
                    navigate('/erreur',{
                        state: {message: "Vous n'avez pas les droits requis. Veuillez vous reconnecter S.V.P."}
                    })                        
                }
            })
            .catch(() => {
                navigate('/erreur',{
                    state: {message: "Une erreur est survenue lors de la vérification des autorisations."}
                })
            })
        }
        else {
            localStorage.removeItem("jwt")
            localStorage.removeItem("pseudo")
            navigate('/erreur',{
                state: {message: "Vous n'avez pas les droits requis. Veuillez vous identifier S.V.P."}
            })
        }
    },[token, navigate])
}

export { colorMsg, formatDate, getRole, useCheckTokenValid }