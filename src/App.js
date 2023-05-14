import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Search from "./pages/search/Search";
import AdminAreaType from "./pages/admin/AdminAreaType";
import PageError from "./components/errors/PageError"
import PageNotFound from "./components/errors/PageNotFound";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/admin-area-type" element={<AdminAreaType />} />
            <Route path="/erreur" element={<PageError />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </BrowserRouter> 
  );
}

export default App;
