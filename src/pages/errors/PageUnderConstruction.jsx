import "./errors.scss"
import imgUnderConstruction from "../../assets/images/errors/UnderConstruction.gif"
import Header from "../../layout/header/HeaderNoMenu";

const PageUnderConstruction = () => {
    return (
        <>
        <Header />
        <main>
            <section className="container error">
                <p className="parag">Page en construction...</p>
                <img src={imgUnderConstruction} alt="En construction"></img>
            </section>
        </main>
        </>
    )
}

export default PageUnderConstruction