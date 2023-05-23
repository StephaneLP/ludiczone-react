import "./searchResult.scss"

// import { useEffect, useState } from "react"

const SearchResult = (props) => {
    const params = props.params

    // Prévoir pour le responsive :
    //
    // const goBoxVerso = (event) => {
    //     event.currentTarget.classList.add("active")
    // }
    //
    // const backBoxRecto = (event) => {
    //     event.currentTarget.classList.remove("active")
    // }
    //
    // Avec : onClick={() => goBoxVerso('1')} onMouseLeave={() => backBoxRecto('1')}

    return (
        <section className="container-fluid search">
            <h2>Recherche Avancée : (filter = {params.filter} & id = {params.id})</h2>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 search-box">
                        <div className="col-12 search-box-inner">
                            <div className="search-box-recto d-flex justify-content-center align-items-end" style={{backgroundImage: `url(${require("../../../assets/images/area/virtual-room.jpg")})`}}>
                                <h3>Virtual Room</h3>
                            </div>                              
                            <div className="search-box-verso" style={{backgroundImage: `url(${require("../../../assets/images/area/virtual-room.jpg")})`}}>
                                <div className="d-flex flex-column justify-content-center align-items-center search-box-verso-filter">
                                    <h3>Virtual Room</h3>
                                    <p>VR Games</p>
                                    <p>Bordeaux Lac</p>
                                    <button className="btn">Ouvrir la fiche</button>                                    
                                </div>
                            </div>                            
                        </div>
                    </div>

                    <div className="col-12 col-md-6 search-box">
                    <div className="col-12 search-box-inner">
                            <div className="search-box-recto d-flex justify-content-center align-items-end" style={{backgroundImage: `url(${require("../../../assets/images/area/vortex-experience.jpg")}`}}>
                                <h3>Vortex Experience</h3>
                            </div>                              
                            <div className="search-box-verso" style={{backgroundImage: `url(${require("../../../assets/images/area/vortex-experience.jpg")}`}}>
                                <div className="d-flex flex-column justify-content-center align-items-center search-box-verso-filter">
                                    <h3>Vortex Experience</h3>
                                    <p>VR Games</p>
                                    <p>Bordeaux Lac</p>
                                    <button className="btn">Ouvrir la fiche</button>
                                </div>
                            </div>                            
                        </div>
                    </div>

                    <div className="col-12 col-md-6 search-box">
                    <div className="col-12 search-box-inner">
                            <div className="search-box-recto d-flex justify-content-center align-items-end" style={{backgroundImage: `url(${require("../../../assets/images/area/eva.jpg")}`}}>
                                <h3>E.V.A.</h3>
                            </div>                              
                            <div className="search-box-verso" style={{backgroundImage: `url(${require("../../../assets/images/area/eva.jpg")}`}}>
                                <div className="d-flex flex-column justify-content-center align-items-center search-box-verso-filter">
                                    <h3>E.V.A.</h3>
                                    <p>VR Games</p>
                                    <p>Bordeaux Lac</p>
                                    <button className="btn">Ouvrir la fiche</button>
                                </div>
                            </div>                            
                        </div>
                    </div>

                    <div className="col-12 col-md-6 search-box">
                        <div className="col-12 search-box-inner">
                            <div className="search-box-recto d-flex justify-content-center align-items-end" style={{backgroundImage: `url(${require("../../../assets/images/area/dreamaway.jpg")}`}}>
                                <h3>Dream Away</h3>
                            </div>                              
                            <div className="search-box-verso" style={{backgroundImage: `url(${require("../../../assets/images/area/dreamaway.jpg")}`}}>
                                <div className="d-flex flex-column justify-content-center align-items-center search-box-verso-filter">
                                    <h3>Dream Away</h3>
                                    <p>VR Games</p>
                                    <p>Bordeaux Lac</p>
                                    <button className="btn">Ouvrir la fiche</button>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>            
        </section>        
    )
}

// <p>Virtual Room, 1ère salle de réalité virtuelle collaborative à Bordeaux, propose des expériences originales et accessibles à tous en équipe de 2 à 4 joueurs.</p>
// <p>À la croisée des chemins entre l’escape game et le cinéma, embarquez pour une aventure virtuelle unique en son genre alliant réflexion, communication et esprit d’équipe !</p>
// <p>+33 (0)5 57 13 11 60</p>
// <p>3 Sente de la Nancy
// <br />33300 Bordeaux</p>

export default SearchResult