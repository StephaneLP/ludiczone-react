// const[getAreaZone,setGetAreaZone] = useState(null)
// useEffect(() => {
//     fetch("http://localhost:3001/api/areazone")
//         .then((res) => {
//             return res.json()
//         })
//         .then((res) => {
//             if(res.success) {
//                 setGetAreaZone(res.data)
//             }
//             else {
//                 navigate('/erreur',{
//                     state: {message: res.message}
//                 })
//             }
//         })
//         .catch((error) => {
//             navigate('/erreur',{
//                 state: {erreur: error}
//             })
//         })
// },[])

{/* <div className="admin-alter-cellule">
    <label>
    <span className="label-libelle">Liste des zones</span>
        <select>
            <option value=""></option>
            {getAreaZone === null ?
            (
                <option value=""></option>
            )
            :
            (<>
                {getAreaZone.map((element) => {
                    return (
                        <option value="a">{element.name}</option>
                    )})
                    }
            </>)}
        </select>
    </label>                            
</div> */}