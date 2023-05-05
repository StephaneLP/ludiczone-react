import Header from "../../layout/header/Header"
import Menu from "../../layout/menu/Menu"
import HomeBandeau from "./HomeBandeau"
import HomeTypeSortie from "./HomeTypeSortie"
import Footer from "../../layout/footer/Footer"

const Home = () => {
    return (
        <>
            <Header />            
            <main>
                <Menu />
                <HomeBandeau />
                <HomeTypeSortie />
                <Footer />
            </main>
        </>
    )
}

export default Home