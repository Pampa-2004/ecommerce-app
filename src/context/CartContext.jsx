import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);




  const addToCart = (product) => {
  setCart((prev) => {
    const existing = prev.find((item) => item.id === product.id);

    if (existing) {
      return prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      return [...prev, { ...product, quantity: 1 }];
    }
  });
};



const updateQuantity = (id, type) => {
  setCart((prev) =>
    prev.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity:
              type === "inc"
                ? item.quantity + 1
                : item.quantity > 1
                ? item.quantity - 1
                : 1
          }
        : item
    )
  );
};





  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart,updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};