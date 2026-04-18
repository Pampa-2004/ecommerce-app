import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProducts, getCategories } from "../services/api";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
    }

    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Loading & Error
  if (loading) return <h2 className="text-center mt-10">Loading products...</h2>;
  if (error) return <h2 className="text-center mt-10 text-red-500">{error}</h2>;

  return (

    <>
    <Navbar />
    
    <div className="p-5 font-sans">

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">
        Products Page
      </h1>

      {/* Top Controls */}
      <div className="flex justify-center gap-3 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-52"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <Link to="/cart">
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Go to Cart
          </button>
        </Link>
      </div>
      

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-5">
        {products
          .filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          )
          .filter((item) =>
            selectedCategory ? item.category === selectedCategory : true
          )
          .map((item) => (
            <div
              key={item.id}
              className="border p-4 rounded-lg shadow-md text-center transition-all duration-300 hover:scale-105 hover:shadow-xl"
>"
            
              <img src={item.image} className="w-28 mx-auto transition-transform duration-300 hover:scale-110" />

              <Link to={`/product/${item.id}`}>
                <h3 className="text-blue-600 cursor-pointer text-sm mt-2">
                  {item.title}
                </h3>
              </Link>

              <p className="text-green-600 font-bold text-lg">
                ₹{item.price}
              </p>

              <button
                className="bg-blue-500 text-white px-3 py-2 rounded mt-2 transition-all duration-200 hover:scale-105 active:scale-95"
                onClick={() => {
                  addToCart(item);
                  alert("Added to cart");
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
      </div>

    </div>
    </>
  );
}

export default Products;