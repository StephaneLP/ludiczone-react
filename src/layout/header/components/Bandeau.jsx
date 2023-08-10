import "../header.scss"
import { Link } from "react-router-dom"

const Bandeau = () => {
    return (
        <section className="container d-flex d-row justify-content-between align-items-center bandeau">
            <div>
                <Link className="navbar-brand bandeau-logo" to="/">
                    <div className="bandeau-img"></div>
                    <span >L</span>udic<span>Z</span>one
                </Link>
            </div>
            <div className="bandeau-titre"><span >S</span>orties <span >L</span>udiques à <span >B</span>ordeaux</div>
        </section>        
    )
}

export default Bandeau