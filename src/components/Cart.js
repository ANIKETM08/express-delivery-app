import React, {useState, useEffect} from "react";
import {useCart} from "../Context/CartContext";
import {useAuth} from "../Context/Auth";
import DropIn from "braintree-web-drop-in-react";
// import {useNavigate} from "react-router-dom";
import Navbar from "./Navbar";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();

  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  //Total amount
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        return (total = total + item.price);
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.error("Error calculating total price:", error);
      return "0.00"; // Return default value in case of errors or empty cart
    }
  };

  //delete item
  const removeCartItem = (itemId) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === itemId);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // get payment gateway token
  const getToken = async () => {
    try {
      const {data} = await axios.get("/api/products/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const {nonce} = await instance.requestPaymentMethod();
      const {data} = await axios.post("/api/products/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/");
      toast.success("Payment Successfull");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-12 margin">
            <h1 className="text-center bg-light p-2 mb-1">{`Hello ${
              auth?.token && auth?.user?.name
            }`}</h1>
            <h4 className="text-center">
              {cart?.length > 0
                ? `you have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please login to ckeckout!"
                  }`
                : "Your cart is empty"}
            </h4>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-7 mx-5">
            {cart?.map((item) => (
              <div
                className="row mb-3 mt-4 card flex-row border-0 shadow-lg p-3 mb-5 bg-body rounded"
                key={item._id}>
                <div className="col-md-3 d-flex align-items-center">
                  <img
                    src={item.thumbnail}
                    alt=""
                    height="100px"
                    width="100px"
                  />
                </div>
                <div className="col-md-9 p-2">
                  <h6> {item.title} </h6>
                  <p className="mb-1">{item.description.substring(0, 68)}...</p>
                  <h6 className="d-flex flex-row">Price : $ {item.price}</h6>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 mt-4 h-50 text-center border-0 shadow-lg p-3 mb-5 bg-body rounded">
            <h4>Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h6>Total : {totalPrice()} </h6>
            {auth?.user?.address ? (
              <>
                <div className="" mb-3>
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/profile")}>
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/profile")}>
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/login", {state: "/cart"})}>
                    Please Login To Checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={!auth?.user}
                    // disabled={!loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
