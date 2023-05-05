import "./menu.scss"
import { Link, useLocation } from "react-router-dom"

const Menu = () => {
    const location = useLocation()

    return (
        <section className="container-fluid menu">
            <div className="container d-flex d-row justify-content-between align-items-center">
                <nav className="navbar navbar-expand-lg menu-navbar">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav d-flex align-items-center">
                            <Link to="/" className={location.pathname === "/" ? "nav-link menu-link actif" : "nav-link menu-link"} aria-current="page" href="#">ACCUEIL</Link>
                            <i className="fa-solid fa-circle" />
                            <Link to="/search" className={location.pathname === "/search" ? "nav-link menu-link actif" : "nav-link menu-link"} aria-current="page" href="#">RECHERCHE AVANCÉE</Link>
                            <i className="fa-solid fa-circle" />
                            <a className="nav-link menu-link" href="#">MON ESPACE</a>
                            <i className="fa-solid fa-circle" />
                            <a className="nav-link menu-link" href="#">ADMIN</a>
                        </div>
                    </div>
                </nav>
                <button className="d-flex align-items-center btn-connect">
                    <i className="fa-solid fa-user"></i>
                    <span>Connexion</span>
                </button>
            </div>
        </section>
    )
}

export default Menu