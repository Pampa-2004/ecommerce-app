import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (

    <>
    <Navbar />

    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Cart Page</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                margin: "10px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "15px"
              }}
            >
              <img src={item.image} width="80" />

              <div>
                <h3>{item.title}</h3>
                <p>₹{item.price}</p>

                <div>
                  <button onClick={() => updateQuantity(item.id, "dec")}>-</button>
                  <span style={{ margin: "0 10px" }}>
                    {item.quantity}
                  </span>
                  <button onClick={() => updateQuantity(item.id, "inc")}>+</button>
                </div>

                <button onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2>Total: ₹{total.toFixed(2)}</h2>
        </>
      )}
    </div>
    </>
  );
}

export default Cart;