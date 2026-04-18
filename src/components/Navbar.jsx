import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-gray-800 text-white px-5 py-3">
      
      <h1 className="text-lg font-bold">My Store</h1>

      <div className="flex gap-3">
        <Link to="/products">
          <button className="bg-blue-500 px-3 py-1 rounded">
            Products
          </button>
        </Link>

        <Link to="/cart">
          <button className="bg-green-500 px-3 py-1 rounded">
            Cart
          </button>
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;