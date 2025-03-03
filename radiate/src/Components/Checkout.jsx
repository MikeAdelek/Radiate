import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@mui/material";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { FiArrowLeft } from "react-icons/fi";
import { useFormValidation } from "../utils/validateForm";
import { useCart } from "./CartContext";
import { FaCcPaypal, FaShopify, FaStripe, FaCcApplePay } from "react-icons/fa";

const CheckoutPage = () => {
  const { cartItems, totalPrice, removeFromCart } = useCart();
  const [giftCard, setGiftCard] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { errors, checkoutForm, setCheckoutForm, validateCheckoutForm } =
    useFormValidation({
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
    setCheckoutForm({
      ...checkoutForm,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // In MVP, just show success message
    setStep(3);

    if (validateCheckoutForm()) {
      try {
        setIsSubmitting(true);

        // fake api call
        await new Promise((resolve) => setTimeout(resolve, 2000)); //2s
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-4 pt-32 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* <Link
            to={`/singleproduct`}
            // className="flex items-center gap-4 mb-6"
          >
            <FiArrowLeft className="text-gray-600" />
            <h1 className="text-gray-600 text-lg">Product</h1>
          </Link> */}
          {/* Left side */}
          <div className="w-full md:w-3/4 lg:w-3/4">
            {/* Steps  */}
            <div className="flex space-x-4 pb-8">
              {[1, 2, 3].map((number) => (
                <div key={number} className="relative ">
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

            {/* Express Checkout  */}
            <div className="mb-8">
              <h2 className="text-lg font-medium mb-4 text-center">
                Express checkout
              </h2>
              <div className="grid grid-cols-4 gap-2">
                <button className="bg-[#635C4C] text-white p-3 rounded">
                  <span className="sr-only">Stripe</span>
                  <FaStripe className="w-full h-6" />
                </button>
                <button className="bg-[#635C4C] text-white p-3 rounded">
                  <span className="sr-only">Shopify</span>
                  <FaShopify className="w-full h-6" />
                </button>
                <button className="bg-[#635C4C] text-white p-3 rounded">
                  <span className="sr-only">PayPal</span>
                  <FaCcPaypal className="w-full h-6" />
                </button>
                <button className="bg-[#635C4C] text-white p-3 rounded">
                  <span className="sr-only">PayPal</span>
                  <FaCcApplePay className="w-full h-6" />
                </button>
              </div>
            </div>
            <div className="relative flex item-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">
                OR CONTINUE WITH A CREDIT CARD
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="mb-8">
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
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                          <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={checkoutForm.email}
                            onChange={handleInputChange}
                            className={`w-full p-3 ${
                              errors.email
                                ? "border-red-500"
                                : "border-[#635C4C]"
                            } `}
                            required
                          />
                          {errors.email && (
                            <p className="mt-1 text-red-500">{errors.email}</p>
                          )}
                        </div>
                        <div className="mb-4">
                          <Input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={checkoutForm.firstName}
                            onChange={handleInputChange}
                            className={`w-full p-3 ${
                              errors.firstName
                                ? "border-red-500"
                                : "border-[#635C4C]"
                            } `}
                            required
                          />
                          {errors.firstName && (
                            <p className="mt-1 text-red-500">
                              {errors.firstName}
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <Input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={checkoutForm.lastName}
                            onChange={handleInputChange}
                            className={`w-full p-3 ${
                              errors.lastName
                                ? "border-red-500"
                                : "border-[#635C4C]"
                            } `}
                            required
                          />
                          {errors.lastName && (
                            <p className="mt-1 text-red-500">
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <Input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={checkoutForm.address}
                            onChange={handleInputChange}
                            className={`w-full p-3 ${
                              errors.address
                                ? "border-red-500"
                                : "border-[#635C4C]"
                            } `}
                            required
                          />
                          {errors.address && (
                            <p className="mt-1 text-red-500">
                              {errors.address}
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <Input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={checkoutForm.city}
                            onChange={handleInputChange}
                            className={`w-full p-3 ${
                              errors.city
                                ? "border-red-500"
                                : "border-[#635C4C]"
                            } `}
                            required
                          />
                          {errors.city && (
                            <p className="mt-1 text-red-500">{errors.city}</p>
                          )}
                        </div>
                        <div className="mb-4">
                          <Input
                            type="text"
                            name="postalCode"
                            placeholder="Postal Code"
                            value={checkoutForm.postalCode}
                            onChange={handleInputChange}
                            className={`w-full p-3 ${
                              errors.postalCode
                                ? "border-red-500"
                                : "border-[#635C4C]"
                            } `}
                            required
                          />
                          {errors.postalCode && (
                            <p className="mt-1 text-red-500">
                              {errors.postalCode}
                            </p>
                          )}
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          aria-label="Submit Button"
                          className="w-full md:w-auto py-4 px-6 md:flex md:items-center md:justify-center tracking-wide rounded-lg bg-[#635C4C] text-white"
                          onClick={() => setStep(2)}
                        >
                          Continue to Payment
                        </button>
                      </div>
                    </form>
                  )}

                  {step === 2 && (
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                          <Input
                            type="text"
                            name="CardNumber"
                            placeholder="Card Number"
                            value={checkoutForm.cardNumber}
                            onChange={handleInputChange}
                            className={`w-full p-3 ${
                              errors.cardNumber
                                ? "border-red-500"
                                : "border-[#635C4C]"
                            } `}
                            // required
                          />
                          {errors.cardNumber && (
                            <p className="mt-1 text-red-500">
                              {errors.cardNumber}
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <Input
                            type="text"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={checkoutForm.expiryDate}
                            onChange={handleInputChange}
                            className={`w-full p-3 ${
                              errors.expiryDate
                                ? "border-red-500"
                                : "border-[#635C4C]"
                            } `}
                            // required
                          />
                          {errors.expiryDate && (
                            <p className="mt-1 text-red-500">
                              {errors.expiryDate}
                            </p>
                          )}
                        </div>
                        <div className="mb-4">
                          <Input
                            type="text"
                            name="cvv"
                            placeholder="CVV"
                            value={checkoutForm.cvv}
                            onChange={handleInputChange}
                            className={`w-full p-3 ${
                              errors.cvv ? "border-red-500" : "border-[#635C4C]"
                            } `}
                            // required
                          />
                          {errors.cvv && (
                            <p className="mt-1 text-red-500">{errors.cvv}</p>
                          )}
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-label="Submit Button"
                        className="w-full md:w-auto py-4 px-6 md:flex md:items-center md:justify-center tracking-wide rounded-lg bg-[#635C4C] text-white"
                      >
                        Place Order
                      </button>
                    </form>
                  )}

                  {step === 3 && (
                    <form action="#" className="space-y-4">
                      <div className="flex items-center justify-center">
                        <div className="text-9xl mb-4">🎉</div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-medium">
                          Thank you for your Order!
                        </h3>
                        <p className="text-gray-600">
                          We'll send you an email confirmation with order
                          details and tracking information.
                        </p>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* RightSide */}
          <div className="w-full md:w-3/12 lg:w-3/12">
            <Card>
              {/* <CardHeader>
                <h2 className="text-9xl z-50 font-semibold text-black">
                  Order Summary
                </h2>
              </CardHeader> */}
              <CardContent>
                <div className="max-h-96 overflow-y-auto mb-4">
                  {cartItems.map((item) => (
                    <>
                      <div className="flex pb-4 mb-4 mt-8 border-b border-gray-300">
                        <div className="ml-4 flex-grow">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                            {item.quantity > 1 && <div>{item.quantity}</div>}
                          </p>
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm font-medium text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                {/* Summary */}
                <div className="py-4 border-b border-gray-200">
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-700">Shipping: </p>
                    <p className="text-sm text-gray-500">
                      Calculated at next step
                    </p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-700">Tax: </p>
                    <p className="text-sm text-gray-500">
                      Calculated at next step
                    </p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm text-gray-700">Subtotal: </p>
                    <p className="text-sm font-medium text-gray-900">
                      ${totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    ** Expedited orders cannot be shipped or delivered on
                    weekends/holidays nor can they be shipped to P.O. box.
                  </p>
                </div>
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
