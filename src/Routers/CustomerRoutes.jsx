import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../customer/Pages/HomePage/HomePage";
import Navigation from "../customer/Components/Navigation/Navigation";
import Footer from "../customer/Components/Footer/Footer";
import Cart from "../customer/Components/Cart/Cart";
import Product from "../customer/Components/Product/Product";
import ProductDetails from "../customer/Components/ProductDetails/ProductDetails";
import Checkout from "../customer/Components/Checkout/Checkout";
import Order from "../customer/Components/Order/Order";
import OrderDetails from "../customer/Components/Order/OrderDetails";
import PaymentSuccess from "../customer/Components/Payment/PaymentSuccess";
import Profile from "../customer/Profile/Profile";

const CustomerRoutes = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <Routes>
        <Route path="/login" element={<HomePage />}></Route>
        <Route path="/register" element={<HomePage />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route
          path="/:lavelOne/:lavelTwo/:levelThree"
          element={<Product />}
        ></Route>
        <Route path="/product/:productId" element={<ProductDetails />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/account/order/user/:userId" element={<Order />}></Route>
        <Route
          path="/account/order/:orderId"
          element={<OrderDetails />}
        ></Route>
        <Route path="/payment/:orderId" element={<PaymentSuccess />}></Route>

        <Route path="/profile/:userId" element={<Profile />}></Route>
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CustomerRoutes;
