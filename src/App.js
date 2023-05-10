import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Search from "./pages/search/Search";
import AdminAreaType from "./pages/admin/AdminAreaType";
import NotFound from "./pages/notfound/NotFound";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/admin-area-type" element={<AdminAreaType />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter> 
  );
}

export default App;
