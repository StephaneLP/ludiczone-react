import "./modal.scss"

const ModalConfirm = (props) => {
    return (
        <div className="modalConfirm">
            <div className="validBox">
                <p>{props.libelle}</p>
                <h2>{props.name}</h2>
                <div className="validbox-buttons">
                    <button className="btn-confirm" onClick={() => props.callFunction(true)}>Valider</button>
                </div>
                <div className="validbox-buttons">
                    <button className="btn-confirm-no" onClick={() => props.callFunction(false)}>Annuler</button>                       
                </div>
            </div>
        </div>
    )
}

export default ModalConfirm