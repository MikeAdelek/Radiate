import React, { useState, useMemo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductCard, productImage, reviews } from "./ProductDetail";
import { FiHeart, FiShoppingCart, FiArrowLeft, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";
import { useCart } from "./CartContext";
import { Animation_Variants } from "./AnimationVariants";

const SingleProduct = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Find the specific product based on productId
  useEffect(() => {
    const foundProduct = ProductCard.find((p) => p.id === productId);
    setProduct(foundProduct);
    setLoading(false);
    setCurrentImageIndex(0);
    setQuantity(1);
  }, [productId]);

  // Dynamically generate product details
  const productDetails = useMemo(() => {
    if (!product) return [];

    const details = [
      `Category: ${product.category}`,
      "Ethically Sourced",
      "Cruelty-Free",
      "Sustainable Packaging"
    ];

    // Add category-specific details
    switch (product.category) {
      case "Hair":
        details.push("Suitable for All Hair Types");
        break;
      case "Skin":
        details.push("Dermatologist Tested");
        break;
      case "Body":
        details.push("Nourishing Formula");
        break;
      case "Scent":
        details.push("Long-Lasting Fragrance");
        break;
      default:
        break;
    }

    return details;
  }, [product]);

  const handleQuantityChange = (change) => {
    if (!product) return;
    setQuantity(Math.max(1, Math.min(product.quantity, quantity + change)));
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, quantity });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          className="w-16 h-16 border-4 border-[#635C4C] border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!product) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xl mb-4">Product not found</p>
        <Link
          to="/"
          className="text-black hover:underline mt-4 inline-block px-6 py-2 border border-emerald-700 rounded-lg transition-colors hover:bg-emerald-50"
        >
          Back to Home
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={Animation_Variants.fadeIn}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16"
    >
      <motion.div
        variants={Animation_Variants.slideUp}
        className="flex items-center mb-6 text-gray-600 hover:text-emerald-700 transition-colors"
      >
        <Link to="/" className="flex items-center gap-4 mb-6">
          {/* <FiArrowLeft className="text-gray-600" /> */}
          <h1 className="text-gray-600 text-lg">Product</h1>
        </Link>
      </motion.div>

      {/* Product Image and Thumbnails */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Main image */}
        <motion.div
          variants={Animation_Variants.fadeIn}
          className="flex flex-col gap-4"
        >
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />

          {/* Thumbnails */}
          {/* <div className="grid grid-cols-4 gap-2">
            {ProductCard.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="overflow-hidden rounded-lg shadow-md"
              >
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  src={image.image}
                  alt={image.name}
                  className={`w-full h-auto object-cover cursor-pointer ${
                    currentImageIndex === index
                      ? "border-2 border-[#635C4C]"
                      : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              </motion.div>
            ))}
          </div> */}
        </motion.div>

        {/* Product Details */}
        <motion.div
          variants={Animation_Variants.slideUp}
          className="flex flex-col"
        >
          <h2 className="text-2xl font-[Instrument Serif] font-semibold text-[#635C4C] mb-4">
            {product.name}
          </h2>

          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-2xl font-semibold text-black mb-2 block">
                ${product.price.toFixed(2)} USD
              </span>
              <p className="text-orange-500 text-sm">Almost Sold Out</p>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <FiShoppingCart className="text-amber-600" size={24} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <FiHeart className="text-[#635C4C]" size={24} />
              </motion.button>
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <span className="text-sm font-medium text-black block mb-2">
              Quantity
            </span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-lg">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-1 text-black hover:bg-gray-100"
                >
                  -
                </motion.button>
                <span className="px-4 py-1 text-gray-800">{quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-1 text-black hover:bg-gray-100"
                >
                  +
                </motion.button>
              </div>
              <span className="text-sm text-gray-600">
                {product.quantity} items left
              </span>
            </div>
          </div>

          {/* Product details */}
          <motion.div variants={Animation_Variants.slideUp} className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Product Details</h3>
            <ul className="list-disc list-inside text-black space-y-2">
              {productDetails.map((detail, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {detail}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Reviews */}
          {/* <motion.div variants={slideUp} className="mb-8">
            <h3 className="text-lg text-gray-600 mb-4">Customer's Review</h3>
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                className="mb-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="font-medium mb-1">{review.name}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      size={16}
                      className={
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div> */}
          <motion.div
            variants={Animation_Variants.itemVariants}
            className="mt-8 p-6 bg-gray-50 rounded-lg"
          >
            <h3 className="text-lg font-medium mb-3">Product Details</h3>
            <p className="text-gray-700 font-medium">
              Category: <span className="font-normal">{product.category}</span>
            </p>
            <p className="text-gray-700 mt-3 leading-relaxed">
              This {product.name} is part of our Radiate collection. Perfect for
              everyday use with premium quality materials.
            </p>
          </motion.div>

          {/* Action Buttons */}
          {/* <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-auto"
          >
            <Link
              to={`/checkout/${product.id}`}
              className="bg-[#635C4C] flex justify-center p-4 text-white rounded-lg w-full"
            >
              Place Order
            </Link>
          </motion.div> */}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SingleProduct;
