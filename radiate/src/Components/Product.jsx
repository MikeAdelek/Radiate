import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductDetail";
import { useCart } from "./CartContext";
import { FiShoppingCart } from "react-icons/fi";

const Product = () => {
  // Limit to first 4 product
  const featuredProducts = ProductCard.slice(0, 4);
  const [isHovered, setIsHovered] = useState(null);
  const { addToCart, cartItems } = useCart();

  return (
    <section className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl w-full sm:w-auto sm:text-left text-center">
            New Arrivals !
          </h2>
          <div className="w-full sm:w-auto sm:text-right text-center">
            <Link
              to="/shopall"
              className="inline-block px-4 md:px-6 py-2.5 md:py-3 bg-[#635C4C] text-white rounded hover:bg-[#4A4539] transition-colors duration-200"
            >
              Shop all
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-start md:items-center py-12 p-20">
          {featuredProducts.map((product) => (
            <Link
              to={`/singleproduct/${product.id}`}
              key={product.id}
              className="group relative bg-white rounded-lg overflow-hidden transition-transform duration-200 hover:translate-y-1"
            >
              {/* Product Image */}
              <div
                className="bg-white rounded-md shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg"
                onMouseEnter={() => setIsHovered(product.id)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 rounded-3xl"
                  />
                  <button
                    onClick={() => addToCart(product)}
                    className="absolute text-sm bottom-4 right-4 bg-[#635C4C] text-white px-3 py-2 rounded-full flex item-center gap-2 hover:bg-[#4A4539] transition-colors"
                  >
                    <FiShoppingCart size={18} />
                    Add to Cart
                  </button>
                  {/* {isHovered === product.id && (
                    <button
                      onClick={() => addToCart(product)}
                      className="absolute text-sm bottom-4 right-4 bg-[#635C4C] text-white px-3 py-2 rounded-full flex item-center gap-2 hover:bg-[#4A4539] transition-colors"
                    >
                      <FiShoppingCart size={18} />
                      Add to Cart
                    </button>
                  )} */}
                </div>

                {/* Product Details */}
                <div className="p-4 pt-6 bg-white">
                  <h3 className="text-lg font-[Instrument Serif] font-semibold text-[#635C4C] mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-normal text-gray-600">
                      $ {product.price} USD
                    </span>
                    <span className="text-sm text-gray-50">
                      {product.quantity} left
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200 pointer-events-none" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;
