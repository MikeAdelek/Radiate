import React, { useState } from "react";
import Home from "../Components/Home";
import { ProductCard, BestsellerProducts } from "../Components/ProductDetail";
import { Link } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import { FiShoppingCart } from "react-icons/fi";

//Define the categories
const CATEGORIES = ["All", "Bestsellers", "Body", "Hair", "Scent", "Skin"];

const ShopAll = () => {
  // state to manage the selected category
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isHovered, setIsHovered] = useState(null);
  const { addToCart } = useCart();

  // Filter the products based on the selected category
  const filteredProducts =
    selectedCategory === "All"
      ? ProductCard
      : selectedCategory === "Bestsellers"
      ? BestsellerProducts
      : ProductCard.filter((product) => product.category === selectedCategory);

  return (
    <>
      <Home title="Shop" />
      <section className="bg-white w-full min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-2">
          {/* category filter Button */}
          <div className="flex justify-center flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? "bg-[#4A4539] text-white"
                    : "bg-[#F8F3F1] text-[#4A4539] hover:bg-[#4A4539] hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-start md:items-center p-20">
            {filteredProducts.map((product) => (
              <Link
                to={`/product/${product.id}`}
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
                        $ {product.price.toFixed(2)} USD
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

          {/* No Products Message */}
          {filteredProducts.length === 0 && (
            <div className="text-center text-gray-500 mt-12">
              No Products found in this category
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ShopAll;
