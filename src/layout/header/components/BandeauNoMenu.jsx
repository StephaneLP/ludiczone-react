import "../header.scss"
import { Link } from "react-router-dom"

const Bandeau = () => {
    return (
        <section className="container d-flex d-row justify-content-center align-items-center bandeau">
            <Link className="navbar-brand bandeau-logo" to="/">
                <div className="bandeau-img"></div>
                <span >L</span>udic<span>Z</span>one
            </Link>
        </section>        
    )
}

export default Bandeau