import "./loader.scss"

const Loader = () => {
 return (
    <div className="loader">
        <p>Chargement en cours...</p>
        <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>    
 )
}

export default Loader