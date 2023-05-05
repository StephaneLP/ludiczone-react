import "./homeTypeSortie.scss"
import imgVrGames from "../../assets/images/type-sortie/vr-games.jpg"
import imgEscapeGames from "../../assets/images/type-sortie/escape-games.jpg"
import imgLaserGames from "../../assets/images/type-sortie/laser-games.jpg"
import imgSociete from "../../assets/images/type-sortie/societe.jpg"
import imgKarting from "../../assets/images/type-sortie/karting.jpg"
import imgBowling from "../../assets/images/type-sortie/bowling.jpg"

const HomeTypeSortie = () => {
    return (
        <>
            <section className="container-fluid home-type">
                <h2>Recherche par type de loisir</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 type-section">
                            <div className="col-12 d-flex flex-row section-all">
                                <div className="d-flex flex-column justify-content-center align-items-center type-section-left">
                                    <h3>VR Games</h3>
                                </div>
                                <div className="type-section-right">
                                    <img src={imgVrGames} />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 type-section">
                            <div className="col-12 d-flex flex-row section-all">
                                <div className="d-flex flex-column justify-content-center align-items-center type-section-left">
                                    <h3>Escape Games</h3>
                                </div>
                                <div className="type-section-right">
                                    <img src={imgEscapeGames} />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 type-section">
                            <div className="col-12 d-flex flex-row section-all">
                                <div className="d-flex flex-column justify-content-center align-items-center type-section-left">
                                    <h3>Laser Games</h3>
                                </div>
                                <div className="type-section-right">
                                    <img src={imgLaserGames} />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 type-section">
                            <div className="col-12 d-flex flex-row section-all">
                                <div className="d-flex flex-column justify-content-center align-items-center type-section-left">
                                    <h3>Jeux de société</h3>
                                </div>
                                <div className="type-section-right">
                                    <img src={imgSociete} />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 type-section">
                            <div className="col-12 d-flex flex-row section-all">
                                <div className="d-flex flex-column justify-content-center align-items-center type-section-left">
                                    <h3>Karting</h3>
                                </div>
                                <div className="type-section-right">
                                    <img src={imgKarting} />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 type-section">
                            <div className="col-12 d-flex flex-row section-all">
                                <div className="d-flex flex-column justify-content-center align-items-center type-section-left">
                                    <h3>Bowling</h3>
                                </div>
                                <div className="type-section-right">
                                    <img src={imgBowling} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>            
            </section>        
        </>
    )
}

export default HomeTypeSortie