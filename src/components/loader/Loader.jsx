import "./loader.scss"
import Spinner from "./Spinner"

const Loader = () => {
    return (
        <div className="loader">
            <p>Chargement en cours...</p>
            <Spinner />
        </div>    
    )
}

export default Loader