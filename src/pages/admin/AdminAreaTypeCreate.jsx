import "./admin.scss"
import Menu from "../../layout/menu/Menu"

const AdminAreaTypeCreate = () => {

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("test")
    }
    return (
    <main>
        <Menu />
        <section className="container-fluid admin">
            <h1>Ajouter un type de loisir</h1>
            <div className="container">
                <form className="admin-create" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12 col-md-2"></div>
                        <div className="col-12 col-md-4">
                            <div>
                                <label>
                                    <span className="label-libelle">Nom</span>
                                    <input type="text" name="name" maxLength="51" placeholder="nom" size="50" />
                                </label>                       
                            </div>
                            <div>
                                <label>
                                <span className="label-libelle">Description</span>
                                    <textarea name="description" placeholder="description" cols="50" />
                                </label>                            
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            image
                        </div>
                        <div className="col-12 col-md-2"></div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <input className="button" type="submit" disabled value="Créer" />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </main>
    )
}

export default AdminAreaTypeCreate