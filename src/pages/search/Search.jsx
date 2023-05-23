import Menu from "../../layout/menu/Menu"
import SearchResult from "./components/SearchResult"

import { useLocation } from 'react-router-dom'
import { useEffect } from "react"

const Search = () => {
    const location = useLocation()

    let params = {filter: "", id: 0}
    if(location.state !== null) {
        params = location.state.params
    } 

    useEffect(() => window.scrollTo(0,0),[])

    return (
        <main>
            <Menu />
            <SearchResult params={params}/>
        </main>
    )
}

export default Search