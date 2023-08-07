import "./errors.scss"
import imgNotfound from "../../assets/images/errors/404-page-animation.gif"
import Header from "../../layout/header/HeaderNoMenu";

const PageNotFound = () => {
    return (
        <>
        <Header />
        <main>
            <section className="container error">
                <p className="parag">Oups, il semblerait que vous soyez arrivé sur une...</p>
                <h1>Page inconnue !</h1>
                <img src={imgNotfound} alt="Erreur 404 - Page inconnue"></img>
            </section>
        </main>
        </>
    )
}

export default PageNotFound