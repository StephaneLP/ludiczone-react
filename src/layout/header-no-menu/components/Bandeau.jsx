import "../header.scss"
import logoMenu from "../../../assets/images/logo/logo-menu.png"

const Bandeau = () => {
    return (
        <section className="container bandeau">
            <div className="d-flex d-row justify-content-center align-items-center">
                <div className="d-flex d-row align-items-center bandeau-logo">
                    <img src={logoMenu} alt="Logo LudicZone"/>
                    <a className="navbar-brand bandeau-logo-titre" href="http://localhost:3000/"><span >L</span>udic<span>Z</span>one</a>
                </div>
            </div>
        </section>        
    )
}

export default Bandeau