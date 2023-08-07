/* Import du style */
import "./header.scss"

/* Import des composants */
import Bandeau from "./components/Bandeau"

const Header = () => {
    return (
        <header>
            <Bandeau />
        </header>
    )
}

export default Header