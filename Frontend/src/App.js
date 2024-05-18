import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./Pages/NotFound/NotFound";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Login/Signup";
import Cart from "./Pages/Cart/Cart";
import Billing from "./Pages/Billing/Billing";
import Profile from "./Pages/Profile/Profile";
import Contact from "./Pages/Contact/Contact";
import Success from "./Pages/Success/success";
import Cencle from "./Pages/Cencle/Cencle";
import About from "./Pages/About/About";
import SingleProduct from "./Pages/SigleProduct/SingleProduct";
import Customization from "./Pages/Customization/Customization";
import { Provider } from 'react-redux';
import { store } from "./App/store";
import Whishlist from "./Pages/Wishlist/Whishlist";
import ShoeSelector from "./Pages/CustomShoes/ShoeSelector";
import ShoesCateg from "./Pages/ShoesCateg/ShoesCateg"
import Order from "./Pages/Order/Order";
import OrderDetails from "./Pages/Order/OrderDetails";
import Unauthorized from "./Pages/Unauthorized";

function App() {
  return (
    <Provider store={store}>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Whishlist />} />
          <Route path="/custom" element={<Customization />} />
          <Route path="/select" element={<ShoeSelector />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/order/details/:id" element={<OrderDetails />} />
          <Route path="/cate" element={<ShoesCateg />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cencle" element={< Cencle />} />
          <Route path="/403" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
