import React from "react";
import logo from "../img/logo.png";
import {NavLink, Link} from "react-router-dom";
import {useAuth} from "../Context/Auth";
import {toast} from "react-hot-toast";
import {useCart} from "../Context/CartContext";
import {Badge} from "antd";
import SearchInput from "./SearchInput";

const Navbar = () => {
  // const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  const logout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow-lg fixed-top  mb-2 w-100 bg-light">
        <div className="container-fluid nav-con">
          <Link to="/">
            <img src={logo} alt="" className="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse my-auto" id="navbarNav">
            <div className="w-100 d-flex justify-content-center">
              <SearchInput className="w-75" />
            </div>
            <ul className="navbar-nav ms-auto">
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <div className="nav-item dropdown float-right mx-1">
                    <NavLink
                      className="nav-link dropdown-toggle "
                      role="button"
                      id="navbarDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      {!!auth.user ? <>{auth.user.name}</> : ""}
                    </NavLink>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown">
                      <li>
                        <NavLink className="dropdown-item" to="/">
                          Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/profile">
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink className="dropdown-item" to="/order">
                          My Order
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/login"
                          onClick={logout}
                          className="dropdown-item">
                          logout
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </>
              )}

              <li className="nav-item my-auto ">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link">
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
