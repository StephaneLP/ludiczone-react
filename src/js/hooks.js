import { useEffect } from "react"

const useCheckTokenRole = (token, role, navigate, url) => {
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
                            route: url
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
                if(res.data !== role) {
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
    },[token, role, navigate, url])
}

export { useCheckTokenRole }