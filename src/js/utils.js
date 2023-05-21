const colorMsg = {
    success: "#77a366",
    error: "#b65d5d",
}

const formatDate = (dateString, mode) => {
    const optionsShort = { year: "numeric", month: "long", day: "numeric" }
    const optionsLong = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }

    return new Date(dateString).toLocaleDateString("fr-FR", (mode === "short" ? optionsShort : optionsLong))
}

const getRole = (token) => {
    return(
        fetch("http://localhost:3001/api/user/role",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            return res.json()          
        })
        .then((res) => {
            if(res.success) {
                return res.data
            }
            else {
                return ""
            }
        })
    )   
}

export { colorMsg, formatDate, getRole }