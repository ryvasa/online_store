import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoInformationCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { refreshToken } from "../utils/refreshToken";
import dayjs from "dayjs";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const getOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/orders/find`);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    refreshToken().then(() => {
      getOrder();
    });
  }, []);
  return (
    <>
      <Navbar />
      <div className="w-full bg-gradient-to-b from-white to-gray-100">
        <div className="overflow-x-auto py-20 px-2 lg:px-20">
          <table className="table w-full relative z-[0]">
            <thead>
              <tr>
                <th></th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.uuid}>
                  <th>{index + 1}</th>
                  <td>{order.uuid}</td>
                  <td>
                    {dayjs(order.createdAt)
                      .locale("id")
                      .format("dddd, DD MMMM YYYY, HH:mm:ss")}
                  </td>
                  <td>
                    {order.status === "success" && (
                      <div className="badge badge-success text-white">
                        {order.status}
                      </div>
                    )}
                    {order.status === "failed" && (
                      <div className="badge badge-error text-white">
                        {order.status}
                      </div>
                    )}
                    {order.status === "proccess" && (
                      <div className="badge badge-info text-white">
                        {order.status}
                      </div>
                    )}
                  </td>
                  <td>{order.totalQantity} pcs</td>
                  <td>$ {order.totalPrice}</td>
                  <td>
                    <Link
                      to={`/orders/${order.uuid}`}
                      className="badge bg-teal-600 border-none text-white flex gap-1"
                    >
                      <IoInformationCircleSharp />
                      <span>detail</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
