import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
