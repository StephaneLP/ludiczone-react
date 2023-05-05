import Header from "../../layout/header/Header"
import Menu from "../../layout/menu/Menu"
import Footer from "../../layout/footer/Footer"
import SearchResult from "./components/SearchResult"

const Search = () => {
    return (
        <>
            <Header />            
            <main>
                <Menu />
                <SearchResult />
                <Footer />
            </main>
        </>
    )
}

export default Search