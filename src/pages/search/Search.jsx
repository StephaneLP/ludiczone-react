/* Import des composants */
import Menu from "../../layout/menu/Menu"
import SearchResult from "./components/SearchResult"

/* Import des Hooks & composants react-rooter */
import { useEffect } from "react"
import { useLocation } from 'react-router-dom'

const Search = () => {
    const location = useLocation()

    useEffect(() => window.scrollTo(0,0),[])


    let params = {filter: "", id: 0} // Filtre optionnel provenant de la page d'accueil (type de loisir ou zone)
    if(location.state !== null) {
        params = location.state.params
    } 

    //////////////////////////////////////////////////////////
    // JSX                                                 
    //////////////////////////////////////////////////////////
    return (
        <main>
            <Menu />
            <SearchResult params={params}/>
        </main>
    )
}

export default Search