import "./menu.scss"

const Menu = () => {
    return (
        <section className="container-fluid menu">
            <div className="container d-flex d-row justify-content-between align-items-center">
                <nav className="navbar navbar-expand-lg menu-navbar">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav d-flex align-items-center">
                                <a className="nav-link menu-link actif" aria-current="page" href="index.html">ACCUEIL</a>
                            <i className="fa-solid fa-circle"></i>
                                <a className="nav-link menu-link" href="recherche.html">RECHERCHE AVANCÉE</a>
                            <i className="fa-solid fa-circle"></i>
                            <a className="nav-link menu-link" href="#">MON ESPACE</a>
                            <i className="fa-solid fa-circle"></i>
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