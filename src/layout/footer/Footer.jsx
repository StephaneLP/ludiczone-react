import "./footer.scss"
import logoFooter from "../../assets/images/logo/logo-footer.png"

const Footer = () => {
    return (
        <footer>
            <section className="container footer-bandeau d-flex d-row justify-content-between align-items-center">
                <div className="d-flex align-items-center footer-logo">
                    <img src={logoFooter} alt="Logo LudicZone"/>
                    <a className="navbar-brand footer-logo-titre" href="http://localhost:3000/"><span >L</span>udic<span>Z</span>one</a>
                </div>
                <div className="footer-titre">
                    <span >© Stéphane Le Pajolec | 2023</span>
                </div>              
            </section>
        </footer>   
    )
}

export default Footer