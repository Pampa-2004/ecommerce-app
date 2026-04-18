import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white">

        {/* 🌙 DARK MODE BUTTON */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 m-2 bg-black text-white rounded"
        >
          Toggle Dark Mode
        </button>

        {/* YOUR EXISTING ROUTES (DO NOT CHANGE) */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </BrowserRouter>

      </div>
    </div>
  );
}

export default App;