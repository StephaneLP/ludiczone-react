/* Import des composants */
import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/Footer";
import Menu from "../../layout/menu/Menu"
import SearchResult from "./components/SearchResult"

/* Import des Hooks & composants react-rooter */
import { useEffect } from "react"
import { useSearchParams } from 'react-router-dom'

const Search = () => {
    useEffect(() => window.scrollTo(0,0),[])

    /*********************************************************
    Si le composant est appelé depuis la page d'accueil,
    un paramètre typeId ou zoneId est transmis au composant
    SearchResult pour initialiser le filtre de la liste des salles
    *********************************************************/
    const [queryParameters] = useSearchParams()
    const typeId = (queryParameters.get("filter") === "type" ? queryParameters.get("id") : "")
    const zoneId = (queryParameters.get("filter") === "zone" ? queryParameters.get("id") : "")

    return (
        <>
        <Header />
        <main>
            <Menu />
            <SearchResult typeId={typeId} zoneId={zoneId} />
        </main>
        <Footer />
        </>
    )
}

export default Search