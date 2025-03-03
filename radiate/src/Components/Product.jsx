import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductDetail";
import { useCart } from "./CartContext";
import { FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import { Animation_Variants } from "./AnimationVariants";
import { Button } from "./Home";

const Product = () => {
  // Limit to first 4 product
  const featuredProducts = ProductCard.slice(0, 4);
  const [isHovered, setIsHovered] = useState(null);
  const { addToCart } = useCart();

  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    e.stopPropagation(); // stop event propagation
    addToCart(product);
  };

  return (
    <section className="bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-32 sm:pt-20 md:pt-28 pb-14">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-serif text-2xl md:text-3xl lg:text-4xl w-full sm:w-auto sm:text-left text-center"
          >
            New Arrivals !
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full sm:w-auto sm:text-right text-center"
          >
            <Link
              to="/shopall"
              className="inline-block px-4 md:px-6 py-2.5 md:py-3 bg-[#635C4C] text-white rounded hover:bg-[#4A4539] transition-colors duration-200"
            >
              Shop all
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={Animation_Variants.containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-start md:items-center py-12 p-20"
        >
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={Animation_Variants.productVariants}
              whileHover="hover"
              className="relative"
            >
              <Link
                to={`singleproduct/${product.id}`}
                className="group relative bg-white rounded-lg overflow-hidden block"
              >
                <div className="bg-white rounded-md shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="relative">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full rounded-3xl"
                      whileHover="hover"
                    />
                    <motion.button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="absolute text-sm bottom-4 right-4 bg-[#635C4C] text-white px-3 py-2 rounded-full flex items-center gap-2 hover:bg-[#4A4539] transition-colors"
                      variants={Animation_Variants.buttonVariants}
                      initial="hidden"
                      animate="visible"
                      whileTap="tap"
                    >
                      <FiShoppingCart size={18} />
                      Add to Cart
                    </motion.button>
                  </div>

                  <motion.div
                    className="p-4 pt-6 bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
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
                      <span className="text-sm text-gray-500">
                        {product.quantity} left
                      </span>
                    </div>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Product;
