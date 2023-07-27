/* Import du style */
import "./modal.scss"

/* Import des fonctions, variables & images */
import { colorMsg, cleanLocalStorage } from "../../js/utils.js"

/* Import des Hooks & composants react-rooter */
import { useNavigate } from "react-router-dom"

const ModalConfirm = (props) => {
    const navigate = useNavigate()

   /*********************************************************
    API DELETE
    *********************************************************/
    const handleDeleteClick = () => {
        fetch(props.params.urlapi, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${props.token}`,
                }
            })
            .then((res) => {
                return res.json() 
            })
            .then((res) => {
                // Token invalide
                if(["ERR_AUTHENTICATION"].includes(res.status)) {
                    cleanLocalStorage()
                    navigate("/connect", {state: true})
                    return
                }
                // Token absent - Droits insuffisants - Erreur serveur
                if(["ERR_REQUEST","ERR_USER_RIGHTS","ERR_SERVER"].includes(res.status)) {
                    cleanLocalStorage()
                    navigate("/erreur", {state: res.message})
                    return
                }
                // Erreur id inconnu - Erreur de contrainte (intégrité des données)
                if(["ERR_NOT_FOUND","ERR_CONSTRAINT"].includes(res.status)) {
                    props.callFunction({libelle: res.message, color: colorMsg.error})
                    return
                }

                props.callFunction({libelle: res.message, color: colorMsg.success})
            })
            .catch((error) => {
                props.callFunction({libelle: error.message, color: colorMsg.error})
            })
    }

    /* ---------------------------------------------- JSX ---------------------------------------------- */

    return (
        <div className="modalConfirm">
            <div className="validBox">
                <p>{props.params.libelle}</p>
                <h2>{props.params.name}</h2>
                <div className="validbox-buttons">
                    <button className="btn-confirm" onClick={handleDeleteClick}>Valider</button>
                </div>
                <div className="validbox-buttons">
                    <button className="btn-confirm-no" onClick={() => props.callFunction({libelle: "", color: ""})}>Annuler</button>                       
                </div>
            </div>
        </div>
    )
}

export default ModalConfirm