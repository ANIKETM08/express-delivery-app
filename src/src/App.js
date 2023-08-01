import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./Dashboard";
import {Route, Routes} from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import {Toaster} from "react-hot-toast";
import axios from "axios";
import PrivateRoute from "./components/routes/Private";
import ForgotPassword from "./components/ForgotPassword";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import Order from "./components/Order";
import Error from "./components/Error";
import Search from "./components/Search";

function App() {
  axios.defaults.baseURL = "http://localhost:8000";
  axios.defaults.withCredentials = true;

  return (
    <>
      <Navbar />
      <Toaster position="top-center" toastOptions={{duration: 4000}} />
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/private" element={<PrivateRoute />}></Route>
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
