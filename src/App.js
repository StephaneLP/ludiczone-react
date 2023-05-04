// STYLES : BOOTSTRAP, SCSS
import "bootstrap/dist/css/bootstrap.css"
import "./assets/scss/app.scss"

// ROUTES
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
