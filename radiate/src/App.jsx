import "./index.css";
import Home from "./Components/Home";
import Article from "./Components/Article";
import Product from "./Components/Product";
import Brand from "./Components/Brand";

import { Routes, Route } from "react-router-dom";
import { Bestseller, ShopAll, Contact, Ourstory, Journal } from "./pages";

import Layout from "./pages/Layout";
import SingleProduct from "./Components/SingleProduct";
import Checkout from "./Components/Checkout";

// App component that renders the Layout component and its children routes
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Home page route */}
        <Route
          path="/"
          element={
            <>
              <Home title="A New Skin Care" />
              <Product path="/product" />
              <Brand />
              <Article />
            </>
          }
        />

        {/* Other routes */}
        <Route path="shopall" element={<ShopAll />} />
        {/* <Route path="bestseller" element={<Bestseller />} /> */}
        <Route path="ourstory" element={<Ourstory />} />
        {/* <Route path="contact" element={<Contact />} /> */}
        <Route path="journal" element={<Journal />} />
        <Route path="/singleproduct/:productId" element={<SingleProduct />} />
        <Route path="/checkout/:productId" element={<Checkout />} />

        {/* Add a catch-all route for 404 errors */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen">
              <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
