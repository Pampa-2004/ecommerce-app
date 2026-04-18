import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.trim() === "") {
      alert("Enter username");
      return;
    }

    localStorage.setItem("user", username);
    navigate("/products");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      
      <div className="bg-white p-8 rounded-xl shadow-lg w-80 text-center">
        
        <h1 className="text-2xl font-bold mb-5 text-gray-700">
          Login
        </h1>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border w-full px-3 py-2 rounded mb-4"
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;