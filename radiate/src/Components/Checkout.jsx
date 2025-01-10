import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@mui/material";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { FiArrowLeft } from "react-icons/fi";
import { ProductCard } from "./ProductDetail";

const CheckoutPage = () => {
  const { productId } = useParams();
  const product = ProductCard.find((p) => p.id === productId || ProductCard[0]);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const [step, setStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In MVP, just show success message
    setStep(3);
  };

  return (
    <div className="w-full">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 mt-24 lg:mt-0 md:mt-24 py-6 md:py-2 lg:pt-28">
        <Link
          to={`/singleproduct/${product.id}`}
          className="flex items-center gap-4 mb-6"
        >
          <FiArrowLeft className="text-gray-600" />
          <h1 className="text-gray-600 text-lg">Product</h1>
        </Link>
        <div className="flex items-center justify-between relative">
          {/* Progress Indicator */}
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2">
            <div className="h-1 bg-gray-200">
              <div
                className="h-full bg-[#635C4C] transition-all duration-300"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
            </div>
          </div>

          {/* Steps  */}
          {[1, 2, 3].map((number) => (
            <div
              key={number}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center 
                  ${
                    step >= number
                      ? "bg-[#635C4C] text-white"
                      : "bg-gray-200 text-gray-600"
                  }
                  transition-colors duration-300 text-sm md:text-base font-medium`}
              >
                {number}
              </div>
              <span className="mt-2 text-xs md:text-sm text-gray-600 hidden md:block">
                {number === 1
                  ? "Information"
                  : number === 2
                  ? "Payment"
                  : "Confirmation"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Right Side Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Order Summary</h2>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex item-center space-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-gray-600">
                        ${product.price.toFixed(2)} USD
                      </p>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span>Subtotal</span>
                      <span>${product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Shipping</span>
                      <span>$5.00</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t pt-2">
                      <span>Total</span>
                      <span>${(product.price + 5).toFixed(2)} USD</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Left side Form */}
          <div>
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">
                  {step === 1
                    ? "Contact Information"
                    : step === 2
                    ? "Payment Details"
                    : "Order Confirmed!"}
                </h2>
              </CardHeader>
              <CardContent>
                {step === 1 && (
                  <form className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                      <Input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <Input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                      <Input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                      />
                    </div>
                    <button
                      className="w-full bg-[#635C4C] text-white"
                      onClick={() => setStep(2)}
                    >
                      Continue to Payment
                    </button>
                  </form>
                )}

                {step === 2 && (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <Input
                      type="text"
                      name="CardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                      />
                      <Input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.CVV}
                        onChange={handleInputChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#635C4C] text-white"
                    >
                      Place Order
                    </button>
                  </form>
                )}

                {step === 3 && (
                  <div className="text-center space-y-4">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-xl font-medium">
                      Thank you for your Order!
                    </h3>
                    <p className="text-gray-600">
                      We'll send you an email confirmation with order details
                      and tracking information.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
{
  /* <div className="flex justify-center mb-8">
    <div className="flex item-center space-x-4">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          step >= 1 ? "bg-[#635C4C] text-white" : "bg-gray-200"
        }`}
      >
        1
      </div>
      <div
        className={`w-16 h-1 ${
          step >= 2 ? "bg-[#635C4C]" : "bg-gray-200"
        }`}
      />
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          step >= 1 ? "bg-[#635C4C] text-white" : "bg-gray-200"
        }`}
      >
        2
      </div>
      <div
        className={`w-16 h-1 ${
          step >= 2 ? "bg-[#635C4C]" : "bg-gray-200"
        }`}
      />
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          step >= 1 ? "bg-[#635C4C] text-white" : "bg-gray-200"
        }`}
      >
        3
      </div>
    </div>
  </div> */
}
