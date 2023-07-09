/* Import du style */
import "./menu.scss"

/* Import des fonctions, variables & images */
import imgLogin from "../../assets/images/button/login.png"
import imgLogout from "../../assets/images/button/logout.png"

/* Import des Hooks & composants react-rooter */
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

const Menu = () => {

    /* ------------------------------------------------------------------------------------- */
    /* ------------------------------------- JAVASCRIPT ------------------------------------ */
    /* ------------------------------------------------------------------------------------- */

    const location = useLocation()
    const navigate = useNavigate()
    const token = localStorage.getItem("jwt")
    const pseudo = localStorage.getItem("pseudo")
    const [isUser, setIsUser] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    /*********************************************************
    API GET
    - Vérification des rôles utilisateur et administrateur 
      à partir du token
    *********************************************************/
    useEffect(() => {
        fetch("http://localhost:3001/api/auth/checkroles", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            return res.json()          
        })
        .then((res) => {
            setIsUser(res.isUser)
            setIsAdmin(res.isAdmin)
        })
    },[token])

    /* Variables booléennes permettant de cibler le menu actif */
    const path = location.pathname
    const isRouteArea = (path === "/admin-area" || path === "/admin-area-create" || path === "/admin-area-update")
    const isRouteAreaType = (path === "/admin-area-type" || path === "/admin-area-type-create" || path.includes("/admin-area-type-update"))
    const isRouteAreaZone = (path === "/admin-area-zone" || path === "/admin-area-zone-create" || path.includes("/admin-area-zone-update"))
    const isRouteAdmin = (isRouteArea || isRouteAreaType || isRouteAreaZone)

    /* Déconnexion */
    const handleLogoutClick = () => {
        localStorage.removeItem("jwt")
        localStorage.removeItem("pseudo")
        navigate("/")
    }

    /* ------------------------------------------------------------------------------------- */
    /* ---------------------------------------- JSX ---------------------------------------- */
    /* ------------------------------------------------------------------------------------- */

    return (
        <section className="container-fluid d-flex align-items-center menu">
            <div className="container d-flex d-row justify-content-between align-items-center">
                <nav className="navbar navbar-expand-lg menu-navbar">
                    <button className="navbar-toggler menu-navbar-togler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav align-items-start">
                            <li className="nav-item">
                                <Link to="/" className={location.pathname === "/" ? "nav-link menu-link actif" : "nav-link menu-link"} aria-current="page" href="#">ACCUEIL</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/search" className={location.pathname === "/search" ? "nav-link menu-link actif" : "nav-link menu-link"} aria-current="page" href="#">RECHERCHE AVANCÉE</Link>
                            </li>
                            {isUser &&
                                <li className="nav-item">
                                    <Link to="/en-construction" className={location.pathname === "/my-space" ? "nav-link menu-link actif" : "nav-link menu-link"} aria-current="page" href="#">MON COMPTE</Link>
                                </li>
                            }
                            {isAdmin &&
                                <li className="nav-item dropdown">
                                    <button className={isRouteAdmin ? "nav-link menu-link menu-link-button dropdown-toggle actif" : "nav-link menu-link menu-link-button dropdown-toggle"} data-bs-toggle="dropdown" aria-expanded="false">ADMIN</button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link to="/en-construction" className={isRouteArea ? "nav-link menu-link-dropdown actif" : "nav-link menu-link-dropdown"} aria-current="page" href="#">AREA</Link>
                                        </li>
                                        <li>
                                            <Link to="/admin-area-type" className={isRouteAreaType ? "nav-link menu-link-dropdown actif" : "nav-link menu-link-dropdown"} aria-current="page" href="#">AREA TYPE</Link>
                                        </li>
                                        <li>
                                            <Link to="/admin-area-zone" className={isRouteAreaZone ? "nav-link menu-link-dropdown actif" : "nav-link menu-link-dropdown"} aria-current="page" href="#">AREA ZONE</Link>
                                        </li>

                                        <hr />
                                        <li>
                                            <Link to="/en-construction" className={isRouteArea ? "nav-link menu-link-dropdown actif" : "nav-link menu-link-dropdown"} aria-current="page" href="#">USER</Link>
                                        </li>
                                        <li>
                                            <Link to="/en-construction" className={isRouteArea ? "nav-link menu-link-dropdown actif" : "nav-link menu-link-dropdown"} aria-current="page" href="#">USER FAVORITE</Link>
                                        </li>
                                        <li>
                                            <Link to="/en-construction" className={isRouteArea ? "nav-link menu-link-dropdown actif" : "nav-link menu-link-dropdown"} aria-current="page" href="#">USER RATING</Link>
                                        </li>
                                    </ul>
                                </li>                            
                            }
                        </ul>
                    </div>
                </nav>
                {!isUser && !isAdmin ?
                ( // L'utilisateur n'est pas authentifié
                    <Link className="btn-connect d-flex align-items-center" to="/connect" aria-current="page" href="#">
                        <img src={imgLogin} alt="Login" /> Connexion
                    </Link>
                )
                :
                ( // L'utilisateur est authentifié
                    <div className="menu-logout d-flex align-items-center" >
                        <span>{pseudo}</span>
                        <button className="btn-logout" onClick={handleLogoutClick}><img src={imgLogout} alt="Logout" /></button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Menu