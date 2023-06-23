//////////////////////////////////////////////////////////
// IMPORTS                                              //
//////////////////////////////////////////////////////////

/* Import des composants */
import Menu from "../../layout/menu/Menu"
import HomeBandeau from "./components/HomeBandeau"
import HomeTypeSortie from "./components/HomeTypeSortie"
import HomeZoneSortie from "./components/HomeZoneSortie"

/* Import des Hooks & composants react-rooter */
import { useEffect } from "react"

//////////////////////////////////////////////////////////
// PARTIE JAVASCRIPT                                    //
//////////////////////////////////////////////////////////

const Home = () => {
    useEffect(() => window.scrollTo(0,0),[])

    //////////////////////////////////////////////////////////
    // JSX                                                 
    //////////////////////////////////////////////////////////
    
    return (
        <main>
            <Menu />
            <HomeBandeau />
            <HomeTypeSortie />
            <HomeZoneSortie />
        </main>
    )
}

export default Home