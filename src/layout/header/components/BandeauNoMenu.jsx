import "../header.scss"
import logoMenu from "../../../assets/images/logo/logo-menu.png"

const Bandeau = () => {
    return (
        <section className="container bandeau-no-menu">
            <div className="d-flex d-row justify-content-center align-items-center bandeau-logo">
                <a className="navbar-brand bandeau-logo-titre" href="http://localhost:3000/">
                    <img src={logoMenu} alt="Logo LudicZone"/>
                    <span >L</span>udic<span>Z</span>one
                </a>
            </div>
        </section>        
    )
}

export default Bandeau