import Menu from "../../layout/menu/Menu"
import SearchResult from "./components/SearchResult"

import { useLocation } from 'react-router-dom'
import { useEffect } from "react"

const Search = () => {
    const location = useLocation()
    const type = (location.state===null ? 0 : location.state.type)

    useEffect(() => window.scrollTo(0,0),[])

    return (
        <main>
            <Menu />
            <SearchResult type={type}/>
        </main>
    )
}

export default Search