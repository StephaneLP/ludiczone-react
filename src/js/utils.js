/* Couleurs des messages affichés suite à la réponse d'une requête */
const colorMsg = {
    success: "#77a366",
    error: "#c51313",
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

export { colorMsg, formatDate, cleanLocalStorage }