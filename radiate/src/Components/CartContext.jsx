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

  // Product inventory seperate from the cart
  const [productInventory, setProductInventory] = useState({});

  // calculate total price whenever cart price changes
  useEffect(() => {
    const calculateTotal = () => {
      return cartItems.reduce((total, item) => {
        // Ensure price and quantity are parsed as floats
        const price = parseFloat(item.price);
        const quantity = parseInt(item.cartQuantity || 1, 10);
        // Multiply and add to total, then fix to 2 decimal places
        return total + price * quantity;
      }, 0);
    };

    // Set the total price with proper decimal precision
    const total = calculateTotal();
    setTotalPrice(Number(total.toFixed(2)));
  }, [cartItems]);

  const addToCart = (product) => {
    //check if we have this product in our inventory
    if (!productInventory[product.id]) {
      // use the product original stock
      setProductInventory((prev) => ({
        ...prev,
        [product.id]: product.quantity
      }));
    }

    // Get current inventory of this product
    const currentStock = productInventory[product.id] || product.quantity;

    // if no stock is left, alert and return
    if (currentStock <= 0) {
      alert("Sorry, Item is out of stock!");
      return;
    }

    // update inventory by reducing 1 from stock
    setProductInventory((prev) => ({
      ...prev,
      [product.id]: prev[product.id] - 1 || product.quantity - 1
    }));

    setCartItems((prevItems) => {
      // check if the item already exists in the cart
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // If item exists, increment quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, cartQuantity: (item.cartQuantity || 1) + 1 }
            : item
        );
      }
      // If items does not exists, add it with quantity 1
      return [...prevItems, { ...product, cartQuantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    // Get the item we're removing to restore inventory
    const itemToRemove = cartItems.find((item) => item.id === productId);

    if (itemToRemove) {
      // restore inventory when removing from cart
      setProductInventory((prev) => ({
        ...prev,
        [productId]: prev[productId] || 0 + (itemToRemove.cartQuantity || 1)
      }));
    }

    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    // Find current item
    const currentItem = cartItems.find((item) => item.id === productId);
    if (!currentItem) return;

    const quantityDifference = newQuantity - currentItem.cartQuantity || 1;

    // if increasing quantity, check if we have enough inventory
    if (quantityDifference > 0) {
      const availableStock = productInventory[productId] || 0;

      if (availableStock < quantityDifference) {
        alert(`Sorry, only${availableStock} more units availabe in the stock`);
        return;
      }

      // update Inventory
      setProductInventory((prev) => ({
        ...prev,
        [productId]: prev[productId] - quantityDifference
      }));
    } else if (quantityDifference < 0) {
      // restore inventory if decreasing
      setProductInventory((prev) => ({
        ...prev,
        [productId]: (prev[productId] || 0) + Math.abs(quantityDifference)
      }));
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, cartQuantity: newQuantity } : item
      )
    );
  };

  const handleChange = (product) => {
    if ((product.cartQuantity || 1) === 1) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, (product.cartQuantity || 1) - 1);
    }
  };

  const clearCart = () => {
    // Restore all inventory when clearing cart
    const inventoryUpdates = {};

    cartItems.forEach((item) => {
      inventoryUpdates[item.id] =
        (productInventory[item.id] || 0) + (item.cartQuantity || 1);
    });

    setProductInventory((prev) => ({
      ...prev,
      ...inventoryUpdates
    }));

    setCartItems([]);
  };

  const toggleCart = () => {
    setShowCart((prev) => !prev);
  };

  // Get current available stock for a product
  const getAvailableStock = (productId) => {
    return productInventory[productId] !== undefined
      ? productInventory[productId]
      : null; // null means we haven't tracked it yet
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
    totalPrice,
    getAvailableStock
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext };
