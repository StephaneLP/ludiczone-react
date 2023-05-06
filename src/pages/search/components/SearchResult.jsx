import "./searchResult.scss"

const searchResult = () => {
    const retourner = (id) => {
        console.log(id)
        document.getElementById(id).classList.add("active")
    }

    const quitter = (id) => {
        console.log(id)
        document.getElementById(id).classList.remove("active")
    }

    return (
        <section className="container-fluid search">
            <h2>Recherche Avancée</h2>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 search-box" onClick={() => retourner('1')} onMouseLeave={() => quitter('1')}>
                        <div className="col-12 search-box-inner" id="1">
                            <div className="search-box-recto" style={{backgroundImage: `url(${require("../../../assets/images/area/virtual-room.jpg")})`}}>
                                <h3>Virtual Room</h3>
                            </div>                              
                            <div className="search-box-verso d-flex flex-column justify-content-center align-items-center">
                                <h3>Virtual Room</h3>
                                <p>VR Games</p>
                                <p>Bordeaux Lac</p>
                                <button className="btn">Ouvrir la fiche</button>

                                {/* <p>Virtual Room, 1ère salle de réalité virtuelle collaborative à Bordeaux, propose des expériences originales et accessibles à tous en équipe de 2 à 4 joueurs.</p>
                                <p>À la croisée des chemins entre l’escape game et le cinéma, embarquez pour une aventure virtuelle unique en son genre alliant réflexion, communication et esprit d’équipe !</p>
                                <p>+33 (0)5 57 13 11 60</p>
                                <p>3 Sente de la Nancy
                                <br />33300 Bordeaux</p> */}
                            </div>                            
                        </div>
                    </div>

                    <div className="col-12 col-md-6 search-box" onClick={() => retourner('2')} onMouseLeave={() => quitter('2')}>
                        <div className="col-12 search-box-inner" id="2">
                            <div className="search-box-recto" style={{backgroundImage: `url(${require("../../../assets/images/area/vortex-experience.jpg")}`}}>
                                <h3>Vortex Experience</h3>
                            </div>                              
                            <div className="search-box-verso d-flex flex-column justify-content-center align-items-center">
                                <h3>Vortex Experience</h3>
                                <p>VR Games</p>
                                <p>Bordeaux Lac</p>
                                <button className="btn">Ouvrir la fiche</button>
                            </div>                            
                        </div>
                    </div>

                    <div className="col-12 col-md-6 search-box" onClick={() => retourner('3')} onMouseLeave={() => quitter('3')}>
                        <div className="col-12 search-box-inner" id="3">
                            <div className="search-box-recto" style={{backgroundImage: `url(${require("../../../assets/images/area/eva.jpg")}`}}>
                                <h3>E.V.A.</h3>
                            </div>                              
                            <div className="search-box-verso d-flex flex-column justify-content-center align-items-center">
                            <h3>E.V.A.</h3>
                                <p>VR Games</p>
                                <p>Bordeaux Lac</p>
                                <button className="btn">Ouvrir la fiche</button>
                            </div>                            
                        </div>
                    </div>

                    <div className="col-12 col-md-6 search-box"  onClick={() => retourner('4')} onMouseLeave={() => quitter('4')}>
                        <div className="col-12 search-box-inner" id="4">
                            <div className="search-box-recto" style={{backgroundImage: `url(${require("../../../assets/images/area/dreamaway.jpg")}`}}>
                                <h3>Dream Away</h3>
                            </div>                              
                            <div className="search-box-verso d-flex flex-column justify-content-center align-items-center">
                            <h3>Dream Away</h3>
                                <p>VR Games</p>
                                <p>Bordeaux Lac</p>
                                <button className="btn">Ouvrir la fiche</button>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>            
        </section>        
    )
}

export default searchResult