import Menu from "../../layout/menu/Menu"
import HomeBandeau from "./components/HomeBandeau"
import HomeTypeSortie from "./components/HomeTypeSortie"

const Home = () => {
    return (
        <main>
            <Menu />
            <HomeBandeau />
            <HomeTypeSortie />
        </main>
    )
}

export default Home