import Menu from "../../layout/menu/Menu"
import HomeBandeau from "./components/HomeBandeau"
import HomeTypeSortie from "./components/HomeTypeSortie"
import HomeZoneSortie from "./components/HomeZoneSortie"

import { useEffect } from "react"

const Home = () => {
    useEffect(() => window.scrollTo(0,0),[])

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