/* Import des composants */
import Header from "../../layout/header/Header";
import Footer from "../../layout/footer/Footer";
import Menu from "../../layout/menu/Menu"
import HomeBandeau from "./components/HomeBandeau"
import HomeAreaType from "./components/HomeAreaType"
import HomeAreaZone from "./components/HomeAreaZone"

/* Import des Hooks & composants react-rooter */
import { useEffect } from "react"

const Home = () => {
    useEffect(() => window.scrollTo(0,0),[])

    return (
        <>
        <Header />
        <main>
            <Menu />
            <HomeBandeau />
            <HomeAreaType />
            <HomeAreaZone />
        </main>
        <Footer />
        </>
    )
}

export default Home