import "../header.scss"
import { Link } from "react-router-dom"

const Bandeau = () => {
    return (
        <section className="container bandeau">
            <div className="d-flex d-row justify-content-center align-items-center bandeau-logo">
                <Link className="navbar-brand bandeau-logo-titre" to="/">
                    <div className="bandeau-img"></div>
                    <span >L</span>udic<span>Z</span>one
                </Link>
            </div>
        </section>        
    )
}

export default Bandeau