import { useState } from "react";

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const [checkoutForm, setCheckoutForm] = useState({
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

  // validate checkout form
  const validateCheckoutForm = () => {
    const newErrors = {};

    //email Validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(checkoutForm.email)) {
      newErrors.email = "Please enter valid email address";
    }

    // firstName Validation
    if (!checkoutForm.firstName) {
      newErrors.firstName = "firstName is required";
    }
    // lastName Validation
    if (!checkoutForm.lastName) {
      newErrors.lastName = "lastName is required";
    }
    // address validation
    if (!checkoutForm.address) {
      newErrors.address = "Address is required";
    }
    // city validation
    if (!checkoutForm.city) {
      newErrors.city = "City is required";
    }
    // country validation
    if (!checkoutForm.country) {
      newErrors.country = "Country is required";
    }
    // postal code validation
    if (!checkoutForm.postalCode) {
      newErrors.postalCode = "PostalCode is required";
    }
    // card number validation
    if (!checkoutForm.cardNumber) {
      newErrors.cardNumber = "CardNumber is required";
    }
    // expiry date validation
    if (!checkoutForm.expiryDate) {
      newErrors.expiryDate = "ExpiryDate is required";
    }
    // cvv validation
    if (!checkoutForm.cvv) {
      newErrors.cvv = "CVV is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    errors,
    checkoutForm,
    setCheckoutForm,
    validateCheckoutForm
  };
};
