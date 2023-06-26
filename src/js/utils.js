/* Couleurs des messages affichés suite à la réponse d'une requête */
const colorMsg = {
    success: "#77a366",
    error: "#b65d5d",
}

/* Formatage des dates */
const formatDate = (dateString, mode) => {
    const optionsShort = { year: "numeric", month: "long", day: "numeric" }
    const optionsLong = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }

    return new Date(dateString).toLocaleDateString("fr-FR", (mode === "short" ? optionsShort : optionsLong))
}

/* Les données enregistrées dans le localStorage lors du login sont effacées */
const cleanLocalStorage = () => {
    localStorage.removeItem("jwt")
    localStorage.removeItem("pseudo")
}

/*********************************************************
Fonction qui retourne une route et des paramètres selon le statut,
pour une éventuelle redirection si erreur :
- 401 : authentification => page reconnexion
- 403 : droits => page erreur
- 500 : erreur interne serveur => page erreur
- autre (200) : pas de redirection
*********************************************************/
const checkStatus = (status, route) => {
    let navParams = {}

    switch(status ) {
        case 401:
            navParams.route = "/connect"
            navParams.state =  {reconnect: true, route: route}
            break
        case 403:
            navParams.route = "/erreur"
            navParams.state =  {message: "Vous n'avez pas les droits requis. Veuillez vous reconnecter S.V.P."}
            break
        case 500:
            navParams.route = "/erreur"
            navParams.state =  {message: "Une erreur interne au serveur est survenue (Erreur 500)."}
            break
        default:
            navParams.route = ""
            navParams.state =  ""
    }

    return navParams
}

export { colorMsg, formatDate, cleanLocalStorage, checkStatus }