import React, { memo, useEffect, useState, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
// import logo from "../assets/logo.svg";
import { FiShoppingCart } from "react-icons/fi";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useCart } from "./CartContext";
import { ProductCard } from "./ProductDetail";
import { Animation_Variants } from "./AnimationVariants";
import { motion, AnimatePresence } from "framer-motion";

// Navigation links.
const navLinks = [
  { name: "Shop all", href: "/shopall" },
  { name: "Journal", href: "/journal" },
  { name: "Our story", href: "/ourstory" }
  // { name: "Contact", href: "/contact" }
];

const CartBadge = memo(({ count }) => {
  if (count === 0) return null;

  return (
    <motion.span
      className="absolute -top-1 -right-1 bg-[#635c4c] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
    >
      {count}
    </motion.span>
  );
});

const NavItem = memo(({ nav, index, isMobile = false, closeMenu }) => {
  const baseClasses = isMobile
    ? "block px-3 py-2 text-gray-900 hover:bg-[#e7e5df] rounded-md font-medium"
    : "text-gray-900 hover:bg-[#dcd8d1] p-2 rounded-md transition-colors duration-200 font-medium";

  return (
    <motion.div
      custom={index}
      variants={Animation_Variants.navItem}
      initial="hidden"
      animate="visible"
    >
      <NavLink
        to={nav.href}
        className={({ isActive }) =>
          `${baseClasses} ${
            isActive
              ? "bg-[#F8F3F1] text-[#4A4539] hover:text-black"
              : "text-[#4A4539] hover:bg-[#4A4539] hover:text-[#4A4539]"
          }`
        }
        onClick={isMobile ? closeMenu : undefined}
      >
        {nav.name}
      </NavLink>
    </motion.div>
  );
});

const MenuToggleIcon = memo(({ isOpen }) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.div
          key="close"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <IoMdClose className="h-6 w-6" />
        </motion.div>
      ) : (
        <motion.div
          key="menu"
          initial={{ rotate: 90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <HiMenuAlt4 className="h-6 w-6" />
        </motion.div>
      )}
    </AnimatePresence>
  );
});

const CartItem = memo(
  ({ item, index, removeFromCart, updateQuantity, addToCart }) => {
    return (
      <motion.li
        className="py-4"
        custom={index}
        variants={Animation_Variants.cartItem}
        initial="hidden"
        animate="visible"
      >
        <div className="flex justify-between">
          <p className="font-medium">{item.name}</p>
          <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={() => removeFromCart(item.id)}
            className="text-gray-500 hover:text-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Remove
          </motion.button>
        </div>
        {/* <div className="flex items-center space-x-2">
          <motion.button
            onClick={() => addToCart(item.id, item.price, 1)}
            className="text-gray-500 hover:text-gray-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            +
          </motion.button>
          <input
            type="number"
            value={item.quantity || 1}
            min="1"
            onChange={(e) =>
              updateQuantity(item.id, parseInt(e.target.value) || 1)
            }
            className="w-8 text-gray-500"
          />
          <motion.button
            onClick={() => removeFromCart(item.id, item.price, -1)}
            className="text-gray-500 hover:text-gray-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            -
          </motion.button>
        </div> */}
      </motion.li>
    );
  }
);

// Main Components
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const { cartItems, showCart, setShowCart, removeFromCart, updateQuantity } =
    useCart();

  // Calculate total price for cart Items
  const totalPrice = cartItems
    .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
    .toFixed(2);

  // Convert callbacks to memo funtions to prevent unnecessary re-renders
  const toggleMenu = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  const handleCartClick = useCallback(() => {
    setShowCart((prevState) => !prevState);
  }, [setShowCart]);

  const closeBanner = useCallback(() => {
    setShowBanner(false);
  });

  // Handle scroll locking
  useEffect(() => {
    const body = document.body;
    if (isOpen || showCart) {
      const scrollY = window.scrollY;
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";
    } else {
      const scrollY = body.style.top;
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    }

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
    };
  }, [isOpen, showCart]);

  return (
    <>
      {/* Banner with AnimatePresence for proper exit animations */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            className="bg-[#635c4c] w-full fixed z-50 text-white py-3 text-sm hover:bg-opacity-70 transition-all duration-200"
            variants={Animation_Variants.banner}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-center cursor-pointer">
              <div className="flex-1"></div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                50% discount sales on every product!
              </motion.p>
              <div className="flex-1 flex justify-end">
                <motion.button
                  onClick={closeBanner}
                  className="text-white"
                  aria-label="Close Banner"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IoMdClose className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        className={`w-full z-50 fixed bg-white ${
          showBanner ? "top-10" : "top-0"
        }`}
        animate={{
          top: showBanner ? 40 : 0,
          transition: { duration: 0.4, ease: "easeInOut" }
        }}
      >
        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo name */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/" className="text-xl font-bold text-gray-900">
                <motion.span
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  Radiate
                </motion.span>
              </Link>
            </motion.div>

            {/* Navigation and Cart Desktop */}
            <div className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2">
              {/* Desktop Navigation */}
              <nav className="flex space-x-8">
                {navLinks.map((nav, i) => (
                  <NavItem key={nav.name} nav={nav} index={i} />
                ))}
              </nav>
            </div>

            {/* Cart Icon - Right */}
            <div className="flex items-center justify-between">
              {/* Cart Icons - Desktop */}
              <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.button
                  onClick={handleCartClick}
                  className="relative p-2 text-gray-900 hover:text-gray-700"
                  aria-label="Shopping cart"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiShoppingCart className="h-6 w-6" />
                  <AnimatePresence>
                    <CartBadge count={cartItems.length} />
                  </AnimatePresence>
                </motion.button>
              </motion.div>

              {/* Mobile menu and cart button */}
              <motion.div
                className="lg:hidden flex items-center space-x-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {/* Cart Icon mobile */}
                <motion.button
                  onClick={handleCartClick}
                  className="relative p-2 text-gray-900 hover:text-gray-700"
                  aria-label="Shopping cart"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiShoppingCart className="h-6 w-6" />
                  <AnimatePresence>
                    <CartBadge count={cartItems.length} />
                  </AnimatePresence>
                </motion.button>

                {/* Mobile Menu Button */}
                <motion.button
                  onClick={toggleMenu}
                  className="p-2 text-gray-900 hover:text-gray-700"
                  aria-label="Menu"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MenuToggleIcon isOpen={isOpen} />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden fixed z-50 inset-x-0 bg-white"
              variants={Animation_Variants.mobileMenu}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map((nav, i) => (
                  <NavItem
                    key={nav.name}
                    nav={nav}
                    index={i}
                    isMobile={true}
                    closeMenu={() => setIsOpen(false)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cart Sidebar */}
        <AnimatePresence>
          {showCart && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-50"
                variants={Animation_Variants.backdrop}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={handleCartClick}
              />
              <motion.div
                className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50"
                variants={Animation_Variants.cartSidebar}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="p-4 h-full flex flex-col">
                  <div className="flex justify-between items-center">
                    <motion.h2
                      className="text-lg font-medium"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Shopping Cart
                    </motion.h2>
                    <motion.button
                      onClick={handleCartClick}
                      className="text-gray-500 hover:text-gray-700"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IoMdClose className="h-6 w-6" />
                    </motion.button>
                  </div>

                  {/* Cart items */}
                  <div className="mt-4 flex-grow overflow-y-auto">
                    {cartItems.length === 0 ? (
                      <motion.p
                        className="text-gray-500 text-center py-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        Your cart is empty
                      </motion.p>
                    ) : (
                      <ul>
                        {cartItems.map((item, i) => (
                          <>
                            <CartItem
                              key={item.id}
                              item={item}
                              index={i}
                              removeFromCart={removeFromCart}
                              // updateQuantity={updateQuantity}
                              addToCart={item}
                            />
                            <img
                              src={item.image}
                              className="h-14 w-14 object-cover rounded"
                            />
                          </>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Cart footer */}
                  {cartItems.length > 0 && (
                    <div className="mt-auto pt-4 border-t">
                      <motion.div
                        className="flex justify-between items-center font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <p>Total</p>
                        <span>${totalPrice}</span>
                      </motion.div>
                      <motion.div
                        className="flex justify-end mt-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Link
                          to="/checkout"
                          className="text-white bg-[#4A4539] px-4 py-2 rounded-md hover:bg-[#33322E]"
                        >
                          <motion.span
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Checkout
                          </motion.span>
                        </Link>
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Header;
