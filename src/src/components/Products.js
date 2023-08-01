import React, {useState} from "react";
import {useCart} from "../Context/CartContext";
import {toast} from "react-hot-toast";
import Modal from "react-bootstrap/Modal";

function Products({item}) {
  const [cart, setCart] = useCart();
  //   const [quantity, setQuantity] = useState(1);
  //   const [varient, setVarient] = useState("small");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center ">
          <div className="md-8">
            <div className="card cards border-0 shadow-lg">
              <img
                onClick={handleShow}
                className="card-img"
                style={{backgroundSize: "cover"}}
                height="150px"
                // width="100px"
                src={item.thumbnail}
                alt="Vans"
              />
              <div className="card-body">
                <h6 className="card-title">{item.title.slice(0, 30)}</h6>
                <h6 className="card-subtitle mb-2">
                  {item.brand} | Stock : {item.stock}
                </h6>
                <h6 className="card-subtitle mb-2 text-muted">
                  {item.category}
                </h6>
                <p className="card-text">{item.description.slice(0, 40)}</p>
                {/* <div className="options d-flex flex-fill">
                  <select className="custom-select mr-1">
                    <option selected>Color</option>
                    <option value={1}>Green</option>
                    <option value={2}>Blue</option>
                    <option value={3}>Red</option>
                  </select>
                  <select className="custom-select ml-1">
                    <option selected>Size</option>
                    <option value={1}>41</option>
                    <option value={2}>42</option>
                    <option value={3}>43</option>
                  </select>
                </div> */}
                <div className="buy d-flex justify-content-between align-items-center">
                  <div className="price text-success">
                    <h5 className="mt-2" style={{fontSize: "0.8rem"}}>
                      Price : $ {item.price}
                      <br />
                      Discount: $ {item.discountPercentage}
                    </h5>
                  </div>
                  <button
                    onClick={() => {
                      setCart([...cart, item]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, item])
                      );
                      toast.success("Item added to cart");
                    }}
                    className="btn btn-danger mt-3">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show}>
        <Modal.Header onClick={handleClose} closeButton>
          <Modal.Title>{item.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body className=" d-flex flex-column justify-content-around ">
          <img height="200px" src={item.thumbnail} alt="" />
          <p> {item.description} </p>
          <p>Rating : ⭐ {item.rating} </p>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between align-items-center">
          <button
            onClick={() => {
              setCart([...cart, item]);
              localStorage.setItem("cart", JSON.stringify([...cart, item]));
              toast.success("Item added to cart");
            }}
            className="btn btn-danger mt-3">
            Add to Cart
          </button>
          <button onClick={handleClose} className="btn">
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Products;
