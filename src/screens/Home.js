import React, {useState, useEffect} from "react";
import Products from "../components/Products";
import axios from "axios";

// const url = "/api/product/getallproducts";
function Home() {
  const [product, setProduct] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await axios.get("/api/product/getallproducts");
      // const data = await response.json();
      setProduct(response.data);
      // console.log(pizzas);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="container bg-img">
      <div style={{width: "100%", marginTop: "50px", marginBottom: "0px"}}>
        <h3
          style={{
            textAlign: "center",
            padding: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            fontWeight: "600",
          }}>
          Our Most Popular Deals
        </h3>
      </div>
      <div className="row justify-content-center">
        {product.map((item) => {
          return (
            <div className=" col-md-4 col-lg-3 p-3 card-item" key={item._id}>
              <div>
                <Products item={item} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
