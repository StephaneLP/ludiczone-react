import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Search from "./pages/search/Search"
import AdminAreaType from "./pages/admin/AdminAreaType"
import AdminAreaTypeCreate from "./pages/admin/AdminAreaTypeCreate"
import AdminAreaTypeUpdate from "./pages/admin/AdminAreaTypeUpdate"
import AdminAreaZone from "./pages/admin/AdminAreaZone"
import AdminAreaZoneCreate from "./pages/admin/AdminAreaZoneCreate"
import AdminAreaZoneUpdate from "./pages/admin/AdminAreaZoneUpdate"
import Connect from "./pages/login/Connect"
import PageError from "./pages/errors/PageError"
import PageForbiden from "./pages/errors/PageForbiden"
import PageNotFound from "./pages/errors/PageNotFound"
import PageUnderConstruction from "./pages/errors/PageUnderConstruction"

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/admin-area-type" element={<AdminAreaType />} />
            <Route path="/admin-area-type-create" element={<AdminAreaTypeCreate />} />
            <Route path="/admin-area-type-update/:id" element={<AdminAreaTypeUpdate />} />
            <Route path="/admin-area-zone" element={<AdminAreaZone />} />
            <Route path="/admin-area-zone-create" element={<AdminAreaZoneCreate />} />
            <Route path="/admin-area-zone-update/:id" element={<AdminAreaZoneUpdate />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/erreur" element={<PageError />} />
            <Route path="/stop" element={<PageForbiden />} />
            <Route path="/en-construction" element={<PageUnderConstruction />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </BrowserRouter> 
  );
}

export default App;
