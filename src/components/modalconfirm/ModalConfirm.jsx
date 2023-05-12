import "./modalConfirm.scss"

const ModalConfirm = (props) => {
    return (
        <div className="modalConfirm">
            <div className="validBox">
                <p>{props.libelle}</p>
                <h2>{props.name}</h2>
                <button className="btn-confirm" onClick={() => props.callFunction(true)}>Oui</button>
                <button className="btn-confirm" onClick={() => props.callFunction(false)}>Annuler</button>                        
            </div>
        </div>
    )
}

export default ModalConfirm