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
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12 col-md-2"></div>
                        <div className="col-12 col-md-4" style={{backgroundColor: "blue"}}>
                            <div>
                                <label>
                                    <span className="label-libelle">Nom</span>
                                    <input type="text" name="name" />
                                </label>                       
                            </div>
                            <div>
                                <label>
                                <span className="label-libelle">Description</span>
                                    <input type="text" name="description" />
                                </label>                            
                            </div>
                        </div>
                        <div className="col-12 col-md-4" style={{backgroundColor: "green"}}>
                            image
                        </div>
                        <div className="col-12 col-md-2"></div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <input className="button" type="submit" value="Créer" />
                        </div>
                    </div>
                </form>
            </div>
        </section>
    </main>
    )
}

export default AdminAreaTypeCreate