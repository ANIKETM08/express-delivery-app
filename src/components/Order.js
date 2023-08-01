import axios from "axios";
import React, {useState, useEffect} from "react";
import {useAuth} from "../Context/Auth";
import moment from "moment";

function Order() {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const {data} = await axios.get("/api/user/orders");
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <>
      <div className="container">
        <div
          className="row d-flex justify-content-center"
          style={{minHeight: "100vh"}}>
          <div className="col-md-10 margin">
            <h1 className="text-center">All orders</h1>
            <h4 className="text-center">
              {orders?.length > 0
                ? `Your Total No. of Orders are ${orders.length} ${
                    auth?.token ? "" : ""
                  }`
                : "You Don't Have any orders"}
            </h4>
            {orders?.map((order, index) => {
              return (
                <div className="row border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">status</th>
                        {/* <th scope="col">buyers</th> */}
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{order?.status}</td>
                        {/* <td>{order?.buyer?.name}</td> */}
                        <td>{moment(order?.createAt).fromNow()}</td>
                        <td>{order?.payment.success ? "Success" : "Failed"}</td>
                        <td>{order?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container row d-flex mx-auto justify-content-center w-100">
                    {order?.products?.map((item, i) => (
                      <div className="row col-md-10 mb-3 mt-1 card flex-row border-0 shadow-lg p-3 mb-1 bg-body  rounded">
                        <div
                          className="col-md-2 d-flex justify-content-center mx-auto align-items-center"
                          key={item._id}>
                          <img
                            src={item.thumbnail}
                            alt=""
                            height="100px"
                            width="100px"
                          />
                        </div>
                        <div className="col-md-9 p-2">
                          <h6> {item.title} </h6>
                          <p className="mb-1">
                            {item.description.substring(0, 68)}...
                          </p>
                          <h6 className="d-flex flex-row">
                            Price : $ {item.price}
                          </h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
