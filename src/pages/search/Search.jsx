//////////////////////////////////////////////////////////
// IMPORTS                                              //
//////////////////////////////////////////////////////////

/* Import des composants */
import Menu from "../../layout/menu/Menu"
import SearchResult from "./components/SearchResult"

/* Import des Hooks & composants react-rooter */
import { useEffect } from "react"
import { useLocation } from 'react-router-dom'

//////////////////////////////////////////////////////////
// PARTIE JAVASCRIPT                                    //
//////////////////////////////////////////////////////////

const Search = () => {
    const location = useLocation()

    useEffect(() => window.scrollTo(0,0),[])

    /* Filtre optionnel : type de loisir ou zone */    
    let params = {filter: "", id: 0}
    if(location.state !== null) {
        params = location.state.params
    } 

    //////////////////////////////////////////////////////////
    // PARTIE JSX                                           //
    //////////////////////////////////////////////////////////

    return (
        <main>
            <Menu />
            <SearchResult params={params}/>
        </main>
    )
}

export default Search