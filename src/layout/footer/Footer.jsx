import "./footer.scss"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer>
            <section className="container footer-bandeau">
                <Link className="navbar-brand footer-logo" to="/">
                    <div className="footer-img"></div>
                    <span >L</span>udic<span>Z</span>one
                </Link>
                <div className="footer-titre">
                    <span >© Stéphane Le Pajolec | 2023</span>
                </div>              
            </section>
        </footer>   
    )
}

export default Footer