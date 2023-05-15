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
                <div className="row">
                    <div className="col-12 col-md-4" style={{backgroundColor: "blue"}}></div>
                    <div className="col-12 col-md-4">
                <form onSubmit={handleSubmit}>
                    <div style={{marginBottom: 5 + "px"}}>
                        <label>
                            <span className="sous-titre-create">Nom</span>
                            <input type="text" name="name" />
                        </label>                            
                    </div>
                    <div style={{marginBottom: 5 + "px"}}>
                        <label>
                            <span className="sous-titre-create">Description</span>
                            <input type="text" name="description" />
                        </label>                            
                    </div>
                    <input className="button" type="submit" value="Créer" />
                </form>                        
                    </div>
                    <div className="col-12 col-md-4" style={{backgroundColor: "blue"}}></div>


                </div>










            </div>
        </section>
    </main>
    )
}

export default AdminAreaTypeCreate