/* Import des composants */
import Menu from "../../layout/menu/Menu"
import SearchResult from "./components/SearchResult"

/* Import des Hooks & composants react-rooter */
import { useEffect } from "react"
import { useLocation, useSearchParams } from 'react-router-dom'

const Search = () => {
    const location = useLocation()
    const [queryParameters] = useSearchParams()
console.log(queryParameters.get("filter"))
    useEffect(() => window.scrollTo(0,0),[])

    /*********************************************************
    Si le composant est appelé depuis la page d'accueil,
    un paramètre type_id ou zone_id est transmis au composant
    SearchResult pour initialiser le filtre de la lsite des salles
    *********************************************************/
    let params = {filter: "", id: 0}
    if(location.state !== null) {
        params = location.state.params
    } 

    return (
        <main>
            <Menu />
            <SearchResult params={params}/>
        </main>
    )
}

export default Search