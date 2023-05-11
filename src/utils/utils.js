const formatDate = (dateString, mode) => {
    const optionsShort = { year: "numeric", month: "long", day: "numeric" }
    const optionsLong = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }

    return new Date(dateString).toLocaleDateString("fr-FR", (mode === "short" ? optionsShort : optionsLong))
}

export {formatDate}