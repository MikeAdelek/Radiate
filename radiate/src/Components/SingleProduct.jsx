import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ProductCard, productImage, reviews } from "./ProductDetail";
import { FiHeart, FiShoppingCart, FiArrowLeft, FiStar } from "react-icons/fi";

import { useCart } from "./CartContext";

const SingleProduct = ({ productId }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  //Find the Specific product  based pn productId
  const product = useMemo(
    () => ProductCard.find((p) => p.id === productId) || ProductCard[0],
    [productId]
  );

  // Dynamically generate product details
  const productDetails = useMemo(() => {
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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, Math.min(product.quantity, quantity + change)));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 lg:pt-32 lg:pb-16">
      <Link to="/" className="flex items-center gap-4 mb-6">
        <FiArrowLeft className="text-gray-600" />
        <h1 className="text-gray-600 text-lg">Product</h1>
      </Link>

      {/* Product Image */}
      <div className="mb-6">
        <div className="flex justify-center">
          <img
            src={productImage[currentImageIndex]}
            alt={product.name}
            className="w-80 h-80 object-cover rounded-lg shadow-lg mb-4"
          />
        </div>
        <div className="flex justify-center gap-4">
          {productImage.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`w-20 h-24 object-cover rounded cursor-pointer ${
                currentImageIndex === index ? "border-2 border-[#635C4C]" : ""
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="mb-6">
        <h2 className="text-xl font-[Instrument Serif] font-semibold text-[#635C4C] mb-4">
          {product.name}
        </h2>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-semibold text-black mb-6">
              $ {product.price.toFixed(2)} USD
            </span>
            <p className="text-orange-500 text-sm">Almost Sold Out</p>
          </div>
          <button className="flex gap-3">
            <FiShoppingCart
              onClick={() => addToCart(product)}
              className="text-amber-600"
              size={24}
            />
            <FiHeart className="text-[#635C4C]" size={24} />
          </button>
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center space-x-4 mb-6">
        <span className="text-sm font-medium text-black">Quantity</span>
        <div className="flex items-center border rounded-lg">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="px-3 py-1 text-black hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-4 py-1 text-gray-800">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="px-3 py-1 text-black hover:bg-gray-100"
          >
            +
          </button>
        </div>
        <span className="text-sm text-gray-600">
          {product.quantity} items left
        </span>
      </div>

      {/* Product details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Product Details</h3>
        <ul className="list-disc list-inside text-black space-y-2">
          {productDetails.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-lg text-gray-600 mb-4">Customer's Review</h3>
        {reviews.map((review, index) => (
          <div key={index} className="mb-3">
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
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <Link
        to={`/checkout/${product.id}`}
        className="bg-[#635C4C] flex justify-center p-4 text-white rounded-lg"
      >
        Place Order
      </Link>
    </div>
  );
};

export default SingleProduct;
