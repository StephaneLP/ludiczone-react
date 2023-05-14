import "./AdminAreaTypeCreate.scss"

const AdminAreaTypeCreate = () => {
    return (
        <div className="modalCreate">
            <div className="container d-flex flex-column justify-content-between align-items-center">
                <h2>Création</h2>
                <div>
                    <button className="btn-confirm">Oui</button>
                    <button className="btn-confirm">Annuler</button>                          
                </div>
                  
            </div>
        </div>
    )
}

export default AdminAreaTypeCreate