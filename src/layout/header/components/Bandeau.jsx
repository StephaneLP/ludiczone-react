import "../header.scss"
import { Link } from "react-router-dom"

const Bandeau = () => {
    return (
        <section className="container bandeau">
            <div className="d-flex d-row justify-content-between align-items-center">
                <div className="bandeau-logo">
                    <Link className="navbar-brand bandeau-logo-titre" to="/">
                    <div className="bandeau-img"></div>
                        <span >L</span>udic<span>Z</span>one
                    </Link>
                </div>
                <div className="bandeau-titre"><span >S</span>orties <span >L</span>udiques à <span >B</span>ordeaux</div>              
            </div>
        </section>        
    )
}

export default Bandeau