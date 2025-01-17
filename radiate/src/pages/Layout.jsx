import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { CartProvider } from "../Components/CartContext";

const Layout = ({ children }) => {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Outlet />
          {children}
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Layout;
