import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // calculate total price whenever cart price changes
  useEffect(() => {
    const calculateTotal = () => {
      return cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    };

    setTotalPrice(calculateTotal());
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // check if the item already exists in the cart
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // If item exists, increment quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      // If items does not exists, add it with quantity 1
      return [...prevItems, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleChange = (product) => {
    if (product.quantity === 1) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, product.quantity - 1);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => {
    setShowCart((prev) => !prev);
  };

  const value = {
    cartItems,
    showCart,
    setShowCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    handleChange,
    totalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext };
