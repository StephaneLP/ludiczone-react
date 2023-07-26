/* Import du style */
import "./modal.scss"

/* Import des fonctions, variables & images */
import { colorMsg, formatDate, cleanLocalStorage } from "../../js/utils.js"

const ModalConfirm = (props) => {


console.log("ok")



    /* ---------------------------------------------- JSX ---------------------------------------------- */

    return (
        <div className="modalConfirm">
            <div className="validBox">
                <p>{props.libelle}</p>
                <h2>{props.name}</h2>
                <div className="validbox-buttons">
                    <button className="btn-confirm" onClick={() => {props.setDisplayMessage({libelle: "ok", color: colorMsg.success}); props.setDisplayModalDelete(false)}}>Valider</button>
                </div>
                <div className="validbox-buttons">
                    <button className="btn-confirm-no" onClick={() => props.setDisplayMessage({libelle: "no", color: colorMsg.error})}>Annuler</button>                       
                </div>
            </div>
        </div>
    )
}

export default ModalConfirm