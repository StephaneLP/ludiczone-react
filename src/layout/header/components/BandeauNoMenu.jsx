import "../header.scss"
import logoMenu from "../../../assets/images/logo/logo-menu.png"
import { Link } from "react-router-dom"

const Bandeau = () => {
    return (
        <section className="container bandeau-no-menu">
            <div className="d-flex d-row justify-content-center align-items-center bandeau-logo">
                <Link className="navbar-brand bandeau-logo-titre" to="/">
                    <img src={logoMenu} alt="Logo LudicZone"/>
                    <span >L</span>udic<span>Z</span>one
                </Link>
            </div>
        </section>        
    )
}

export default Bandeau