import "./header.scss"

/* Import des fonctions, variables & images */
import logoMenu from "../../assets/images/logo/logo-menu.png"

const Header = () => {
    return (
        <header>
            <section className="container header-bandeau">
                <div className="d-flex d-row justify-content-between align-items-center">
                    <div className="d-flex d-row align-items-center header-logo">
                        <img src={logoMenu} alt="Logo LudicZone"/>
                        <a className="navbar-brand header-logo-titre" href="http://localhost:3000/"><span >L</span>udic<span>Z</span>one</a>
                    </div>
                    <div className="header-titre"><span >S</span>orties <span >L</span>udiques à <span >B</span>ordeaux</div>              
                </div>
            </section>
        </header>
    )
}

export default Header