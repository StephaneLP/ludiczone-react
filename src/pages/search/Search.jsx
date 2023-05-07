import Menu from "../../layout/menu/Menu"
import SearchResult from "./components/SearchResult"

import { useParams, useLocation } from 'react-router-dom'

const Search = () => {
    const location = useLocation()
    const type = (location.state===null ? 0 : location.state.type)

    return (
        <main>
            <Menu />
            <SearchResult type={type}/>
        </main>
    )
}

export default Search