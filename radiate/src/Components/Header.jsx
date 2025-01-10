import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FiShoppingCart } from "react-icons/fi";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useCart } from "./CartContext";
import { ProductCard } from "./ProductDetail";

const Header = ({ productId }) => {
  const product = ProductCard.find((p) => p.id === productId || ProductCard[0]);

  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const {
    cartItems,
    showCart,
    setShowCart,
    handleChange,
    removeFromCart,
    updateQuantity
  } = useCart();

  // Handle scroll locking
  useEffect(() => {
    const body = document.body;
    if (isOpen || showCart) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "unset";
    }

    // cleanup after
    return () => {
      body.style.overflow = "unset";
    };
  }, [isOpen, showCart]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  const navLinks = [
    { name: "Shop all", href: "/shopall" },
    // { name: "Bestseller", href: "/bestseller" },
    { name: "Journal", href: "/journal" },
    { name: "Our story", href: "/ourstory" }
    // { name: "Contact", href: "/contact" }
  ];

  return (
    <>
      {/* Banner*/}
      {showBanner && (
        <div className="bg-[#635c4c] w-full fixed z-50 text-white py-3 text-sm hover:bg-opacity-70 transition-all duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-center cursor-pointer">
            <div className="flex-1"></div>
            <p> 50% discount sales on every product!</p>
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => setShowBanner(false)}
                className="text-white"
                aria-label="Close Banner"
              >
                <IoMdClose className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Header  */}
      <div
        className={`w-full z-50 fixed bg-white ${
          showBanner ? "top-10" : "top-0"
        }`}
      >
        {/* main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo name */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-bold text-gray-900">
                Radiate
              </Link>
            </div>

            {/* Navigation and Cart Desktop */}
            <div className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2">
              {/* Desktop Navigation */}
              <nav className="flex space-x-8">
                {navLinks.map((nav) => (
                  <NavLink
                    key={nav.name}
                    to={nav.href}
                    className={({ isActive }) =>
                      `text-gray-900 hover:bg-[#dcd8d1] p-2 rounded-md transition-colors duration-200 font-medium ${
                        isActive
                          ? "bg-[#F8F3F1] text-[#4A4539] hover:text-black"
                          : "text-[#4A4539] hover:bg-[#4A4539] hover:text-[#4A4539]"
                      }`
                    }
                  >
                    {nav.name}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/*Cart Icon - Right*/}
            <div className="flex items-center">
              {/* Cart Icons - Desktop */}
              <div className="hidden lg:block">
                <button
                  onClick={handleCartClick}
                  className="relative p-2 text-gray-900 hover:text-gray-700"
                  aria-label="Shopping cart"
                >
                  <FiShoppingCart className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#635c4c] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile menu  and cart button */}
              <div className="lg:hidden flex items-center space-x-4">
                {/* Cart Icon mobile */}
                <button
                  onClick={handleCartClick}
                  className="relative p-2 text-gray-900 hover:text-gray-700"
                  aria-label="Shopping cart"
                >
                  <FiShoppingCart className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#635c4c] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={toggleMenu}
                  className="p-2 text-gray-900 hover:text-gray-700"
                  aria-label="Menu"
                >
                  {isOpen ? (
                    <IoMdClose className="h-6 w-6" />
                  ) : (
                    <HiMenuAlt4 className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden fixed z-50 inset-x-0 bg-white transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((nav) => (
              <NavLink
                key={nav.name}
                to={nav.href}
                className={({ isActive }) =>
                  `block px-3 py-2 text-gray-900 hover:bg-[#e7e5df] rounded-md font-medium ${
                    isActive ? "bg-[#F8F3F1] text-[#4A4539]" : ""
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {nav.name}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">Shopping Cart</h2>
                  <button
                    onClick={handleCartClick}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <IoMdClose className="h-6 w-6" />
                  </button>
                </div>
                {/* Cart items */}
                <ul className="mt-4">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-4">
                      <div className="flex justify-between">
                        {/* <img src={item.image} alt={item.name} className="" /> */}
                        <p className="font-medium">{item.name}</p>
                        <span>
                          ${item.price * (item.quantity || 1).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => addToCart(item.id, item.price, 1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          +
                        </button>
                        <input
                          type="number"
                          value={item.quantity || 1}
                          min="1"
                          onChange={(e) =>
                            updateQuantity(item.id, e.target.value)
                          }
                          className="w-8 text-gray-500"
                        />
                        <button
                          onClick={() => addToCart(item.id, item.price, -1)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          -
                        </button>
                      </div>
                    </li>
                  ))}
                  <div className="flex justify-between items-center">
                    <p>Total</p>
                    <span>$12.99</span>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Link
                      to={`/checkout/${product.id}`}
                      className="text-white bg-[#4A4539] px-4 py-2 rounded-md hover:bg-[#33322E]"
                    >
                      Checkout
                    </Link>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
