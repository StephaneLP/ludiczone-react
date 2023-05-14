import "./errors.scss"
import Menu from "../../layout/menu/Menu"
import imgNotfound from "../../assets/images/errors/404-page-animation.gif"

const PageNotFound = () => {
    return (
        <main>
            <Menu />
            <section className="container error">
                <p className="parag">Oups, il semblerait que vous soyez arrivé sur une...</p>
                <h1>Page inconnue !</h1>
                <img src={imgNotfound} alt="Erreur 404 - Page inconnue"></img>          
            </section>
        </main>
    )
}

export default PageNotFound