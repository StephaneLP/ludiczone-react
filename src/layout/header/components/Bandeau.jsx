import "../header.scss"
import logoMenu from "../../../assets/images/logo/logo-menu.png"

const Bandeau = () => {
    return (
        <section className="container bandeau">
            <div className="d-flex d-row justify-content-between align-items-center">
                <div className="d-flex d-row align-items-center bandeau-logo">
                    <img src={logoMenu} alt="Logo LudicZone"/>
                    <a className="navbar-brand bandeau-logo-titre" href="http://localhost:3000/"><span >L</span>udic<span>Z</span>one</a>
                </div>
                <div className="bandeau-titre"><span >S</span>orties <span >L</span>udiques à <span >B</span>ordeaux</div>              
            </div>
        </section>        
    )
}

export default Bandeau