/* Import des composants : Accueil et Recherche avancée */
import Home from "./pages/home/Home"
import Search from "./pages/search/Search"

/* Import des composants : Login */
import Connect from "./pages/login/Connect"
import ConnectInfos from "./pages/login/ConnectInfos"
import ForgotPassword from "./pages/login/ForgotPassword"
import ForgotPasswordConfirm from "./pages/login/ForgotPasswordConfirm"
import SignUp from "./pages/login/SignUp"
import SignUpConfirm from "./pages/login/SignUpConfirm"
import SignUpRetry from "./pages/login/SignUpRetry"

/* Import des composants : Administration */
import AdminAreaType from "./pages/admin/area-type/AdminAreaType"
import AdminAreaTypeCreate from "./pages/admin/area-type/AdminAreaTypeCreate"
import AdminAreaTypeUpdate from "./pages/admin/area-type/AdminAreaTypeUpdate"
import AdminAreaZone from "./pages/admin/area-zone/AdminAreaZone"
import AdminAreaZoneCreate from "./pages/admin/area-zone/AdminAreaZoneCreate"
import AdminAreaZoneUpdate from "./pages/admin/area-zone/AdminAreaZoneUpdate"

/* Import des composants : Erreurs */
import PageError from "./pages/errors/PageError"
import PageNotFound from "./pages/errors/PageNotFound"
import PageUnderConstruction from "./pages/errors/PageUnderConstruction"

/* Import des Hooks & composants react-rooter */
import { BrowserRouter, Routes, Route } from "react-router-dom"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Pages : Accueil et Recherche avancée */}
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />

                {/* Pages Login & SignUp*/}
                <Route path="/connect" element={<Connect />} />
                <Route path="/connect/:reason" element={<Connect />} />
                <Route path="/connect-info" element={<ConnectInfos />} />
                <Route path="/connect-mdp" element={<ForgotPassword />} />
                <Route path="/connect-mdp-confirm/:token" element={<ForgotPasswordConfirm />} />
                <Route path="/inscription" element={<SignUp />} />
                <Route path="/inscription-confirm/:token" element={<SignUpConfirm />} />
                <Route path="/inscription-relance" element={<SignUpRetry />} />

                {/* Pages d'administration */}
                <Route path="/admin-area-type" element={<AdminAreaType />} />
                <Route path="/admin-area-type-create" element={<AdminAreaTypeCreate />} />
                <Route path="/admin-area-type-update/:id" element={<AdminAreaTypeUpdate />} />
                <Route path="/admin-area-zone" element={<AdminAreaZone />} />
                <Route path="/admin-area-zone-create" element={<AdminAreaZoneCreate />} />
                <Route path="/admin-area-zone-update/:id" element={<AdminAreaZoneUpdate />} />

                {/* Pages d'erreur */}
                <Route path="/erreur" element={<PageError />} />
                <Route path="/en-construction" element={<PageUnderConstruction />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter> 
    )
}

export default App;
