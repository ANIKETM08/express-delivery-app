import React from "react";
import {Link} from "react-router-dom";

function Footer() {
  return (
    <footer className="text-center text-lg-start bg-dark text-light">
      <section className="d-flex  justify-content-center justify-content-lg-between p-4 border-bottom">
        <div>
          <Link className="me-4 text-reset">
            <i className="fab fa-facebook-f" />
          </Link>
          <Link className="me-4 text-reset">
            <i className="fab fa-twitter" />
          </Link>
          <Link className="me-4 text-reset">
            <i className="fab fa-google" />
          </Link>
          <Link className="me-4 text-reset">
            <i className="fab fa-instagram" />
          </Link>
          <Link className="me-4 text-reset">
            <i className="fab fa-linkedin" />
          </Link>
          <Link className="me-4 text-reset">
            <i className="fab fa-github" />
          </Link>
        </div>
      </section>

      <section className>
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3" />
                Express Delivery
              </h6>
              <p>
                Express is the best Online product selling service with more
                than 100+ brands.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <Link className="text-reset">Smart Phone</Link>
              </p>
              <p>
                <Link className="text-reset">Clothing</Link>
              </p>
              <p>
                <Link className="text-reset">Perfumes</Link>
              </p>
              <p>
                <Link className="text-reset">Home Decore</Link>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <Link className="text-reset">Pricing</Link>
              </p>
              <p>
                <Link className="text-reset">Settings</Link>
              </p>
              <p>
                <Link to="/order" className="text-reset">
                  Orders
                </Link>
              </p>
              <p>
                <Link className="text-reset">Help</Link>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-3" /> Mumbai, IN
              </p>
              <p>
                <i className="fas fa-envelope me-3" />
                aniketmalviya08@gmail.com
              </p>
              <p>
                <i className="fas fa-phone me-3" /> + 98 933 138 09
              </p>
              <p>
                <i className="fas fa-print me-3" /> + 01 234 567 89
              </p>
              <p>
                <i class="fa-brands fa-github" />
                <Link
                  to="https://github.com/ANIKETM08/mern-ecom-app.git"
                  className="text-reset">
                  GitHub
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
        © 2021 Copyright:
        <Link className="text-reset fw-bold">Express.com</Link>
      </div>
    </footer>
  );
}

export default Footer;
