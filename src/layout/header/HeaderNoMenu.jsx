/* Import du style */
import "./header.scss"

/* Import des composants */
import Bandeau from "./components/BandeauNoMenu"

const Header = () => {
    return (
        <header>
            <Bandeau />
        </header>
    )
}

export default Header