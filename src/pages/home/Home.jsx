import Menu from "../../layout/menu/Menu"
import HomeBandeau from "./components/HomeBandeau"
import HomeTypeSortie from "./components/HomeTypeSortie"

import { useEffect } from "react"

const Home = () => {
    useEffect(() => window.scrollTo(0,0),[])

    return (
        <main>
            <Menu />
            <HomeBandeau />
            <HomeTypeSortie />
        </main>
    )
}

export default Home