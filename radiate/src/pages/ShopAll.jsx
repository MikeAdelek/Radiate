import React, { useState } from "react";
import Home from "../Components/Home";
import { ProductCard, BestsellerProducts } from "../Components/ProductDetail";
import { Link } from "react-router-dom";
import { useCart } from "../Components/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import { Animation_Variants } from "../Components/AnimationVariants";

// Define the categories
const CATEGORIES = ["All", "Bestsellers", "Body", "Hair", "Scent", "Skin"];

const ShopAll = () => {
  // State to manage the selected category
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const categoryVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (custom) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        delay: custom * 0.05
      }
    })
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      <Home title="Shop" />
      <section className="bg-white w-full min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-2">
          {/* Category filter buttons with animation */}
          <motion.div
            className="flex justify-center flex-wrap gap-2"
            initial="hidden"
            animate="visible"
            variants={Animation_Variants.containerVariants}
          >
            {CATEGORIES.map((category, index) => (
              <motion.button
                key={category}
                custom={index}
                variants={Animation_Variants.categoryVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? "bg-[#4A4539] text-white"
                    : "bg-[#F8F3F1] text-[#4A4539] hover:bg-[#4A4539] hover:text-white"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Products Grid with animation */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-start md:items-center p-20"
            variants={Animation_Variants.containerVariants}
            initial="hidden"
            animate="visible"
            key={selectedCategory} // Remount component when category changes for fresh animations
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={Animation_Variants.itemVariants}
                layout
                className="group relative"
              >
                <Link
                  to={`/singleproduct/${product.id}`}
                  className="group relative bg-white rounded-lg overflow-hidden transition-transform duration-200 hover:translate-y-1"
                >
                  {/* Product Image with container */}
                  <motion.div
                    className="bg-white rounded-md shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg"
                    onMouseEnter={() => setIsHovered(product.id)}
                    onMouseLeave={() => setIsHovered(null)}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <div className="relative">
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full rounded-3xl"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        className="absolute text-sm bottom-4 right-4 bg-[#635C4C] text-white px-3 py-2 rounded-full flex item-center gap-2 hover:bg-[#4A4539] transition-colors"
                        variants={Animation_Variants.buttonVariants}
                        initial="idle"
                        whileHover="hover"
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiShoppingCart size={18} />
                        Add to Cart
                      </motion.button>
                    </div>

                    {/* Product Details */}
                    <motion.div
                      className="p-4 pt-6 bg-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <motion.h3
                        className="text-lg font-[Instrument Serif] font-semibold text-[#635C4C] mb-1"
                        whileHover={{ x: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {product.name}
                      </motion.h3>
                      <motion.p className="text-sm text-gray-600 mb-2">
                        {product.description}
                      </motion.p>
                      <motion.div className="flex items-center justify-between">
                        <span className="text-base font-normal text-gray-600">
                          $ {product.price.toFixed(2)} USD
                        </span>
                        <motion.span
                          className="text-sm text-gray-50"
                          whileHover={{ scale: 1.05 }}
                        >
                          {product.quantity} left
                        </motion.span>
                      </motion.div>
                    </motion.div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200 pointer-events-none" />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* No Products Message with animation */}
          {filteredProducts.length === 0 && (
            <motion.div
              className="text-center text-gray-500 mt-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              No Products found in this category
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default ShopAll;
