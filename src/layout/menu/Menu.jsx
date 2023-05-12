import "./menu.scss"
import imgLogin from "../../assets/images/button/login.png"
import { Link, useLocation } from "react-router-dom"

const Menu = () => {
    const location = useLocation()

    return (
        <section className="container-fluid menu">
            <div className="container d-flex d-row justify-content-between align-items-center">
                <nav className="navbar navbar-expand-lg menu-navbar">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item">
                                <Link to="/" className={location.pathname === "/" ? "nav-link menu-link actif" : "nav-link menu-link"} aria-current="page" href="#">ACCUEIL</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/search" className={location.pathname === "/search" ? "nav-link menu-link actif" : "nav-link menu-link"} aria-current="page" href="#">RECHERCHE AVANCÉE</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/my-space" className={location.pathname === "/my-space" ? "nav-link menu-link actif" : "nav-link menu-link"} aria-current="page" href="#">MON ESPACE</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <button className={location.pathname === "/admin-area-type" ? "nav-link menu-link menu-link-button dropdown-toggle actif" : "nav-link menu-link menu-link-button dropdown-toggle"} data-bs-toggle="dropdown" aria-expanded="false">ADMIN</button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to="/admin-area-type" className={location.pathname === "/admin-area-type" ? "nav-link menu-link actif" : "nav-link menu-link"} aria-current="page" href="#">AREA TYPE</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin-area-zone" className={location.pathname === "/admin-area-zone" ? "nav-link menu-link actif" : "nav-link menu-link"} aria-current="page" href="#">AREA ZONE</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin-area" className={location.pathname === "/admin-area" ? "nav-link menu-link actif" : "nav-link menu-link"} aria-current="page" href="#">AREA</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
                <button className="btn-connect">
                    <img src={imgLogin} />
                </button>
            </div>
        </section>
    )
}

export default Menu