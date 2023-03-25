import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdLocalShipping, MdWarning } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import { refreshToken } from "../utils/refreshToken";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Order = () => {
  const [order, setOrder] = useState({});
  const { id } = useParams();
  const getOrder = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/orders/${id}`);
      setOrder(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    refreshToken().then(() => {
      getOrder();
    });
  }, []);
  dayjs.extend(relativeTime);
  return (
    <Layout>
      <div className="flex-[5] overflow-y-auto h-screen pb-16 w-full relative">
        <div className="flex relative h-full flex-col overflow-y-scroll">
          <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 ">
            <div className="lg:flex-row flex flex-col  border-y py-5 border-gray-400">
              <div className=" flex-1">
                <div className="flex pb-5 items-center justify-center">
                  <h1 className="text-xl font-semibold  text-indigo-600">
                    Products
                  </h1>
                </div>
                <div className="flow-root">
                  <ul role="list" className="-my-6">
                    {order.cart?.map((cart) => (
                      <li key={cart.uuid} className="flex py-6 border-b-2">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={cart.product?.img[1]}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link to={`/products/${cart.product?.uuid}`}>
                                  {cart.product?.name}
                                </Link>
                              </h3>
                              <p className="ml-4">
                                ${" "}
                                <span className="font-semibold text-lg">
                                  {cart.product?.price}
                                </span>
                              </p>
                            </div>
                            <div className="w-full flex gap-2 items-center ">
                              <div
                                className={classNames(
                                  cart.stock?.color,
                                  "h-6 w-6 rounded-full border shadow-lg"
                                )}
                              />
                              <div className=" w-8 h-8 border rounded-md justify-center flex items-center">
                                <div>{cart.stock?.size}</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-700 font-semibold text-lg">
                              {cart.quantity}{" "}
                              <span className="font-light text-sm">pcs</span>
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className=" py-6 pt-10 ">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total</p>
                    <p>
                      ${" "}
                      <span className="font-semibold text-lg">
                        {order.totalPrice}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-center items-center">
                  <h1 className="text-xl font-semibold  text-indigo-600">
                    Recipient Address
                  </h1>
                </div>
                <div className="lg:px-7 px-2 py-3 lg:py-5 ">
                  <div className="w-full justify-center py-10 flex border shadow-xl rounded-lg bg-white ">
                    <ul className="w-full flex-col justify-centerf flex gap-5 ">
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 ">
                          <div className="flex-1">Name</div>

                          <div className="flex flex-[2] gap-1 justify-start">
                            :<span>{order.name}</span>
                          </div>
                        </div>
                      </li>
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 ">
                          <div className="flex-1">Phone</div>

                          <div className="flex flex-[2] gap-1 justify-start">
                            :<span>{order.user?.phone}</span>
                          </div>
                        </div>
                      </li>
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 ">
                          <div className="flex-1">Code Pos</div>

                          <div className="flex flex-[2] gap-1 justify-start">
                            :<span>{order.postal_code}</span>
                          </div>
                        </div>
                      </li>
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 ">
                          <div className="flex-1">Address</div>

                          <div className="flex flex-[2] gap-1 justify-start">
                            :
                            <span>
                              {order.country}, {order.city}, {order.address}
                            </span>
                          </div>
                        </div>
                      </li>
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 ">
                          <div className="flex-1">Date</div>

                          <div className="flex flex-[2] gap-1 justify-start">
                            :
                            <span>
                              {dayjs(order.createdAt)
                                .locale("id")
                                .format("dddd, DD MMMM YYYY, HH:mm:ss")}
                            </span>
                          </div>
                        </div>
                      </li>
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 ">
                          <div className="flex-1">Total</div>

                          <div className="flex flex-[2] gap-1 justify-start">
                            :
                            <span>
                              ${" "}
                              <span className="font-semibold text-lg">
                                {order.totalPrice}
                              </span>
                            </span>
                          </div>
                        </div>
                      </li>
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 ">
                          <div className="flex-1">Total Quantity</div>

                          <div className="flex flex-[2] gap-1 justify-start">
                            :
                            <span className=" font-semibold text-lg">
                              {order.totalQuantity}
                              <span className="font-light text-sm"> pcs</span>
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full flex justify-end">
                    <div className="flex justify-center">
                      <div className="max-w-xl">
                        <div className="mt-6 flex gap-5">
                          <button className="flex gap-2 shadow-lg items-center justify-center rounded-md border border-transparent bg-green-500 px-3 py-2 text-base font-medium text-white hover:bg-green-600">
                            <MdLocalShipping className="h-5 w-5" />
                            <span>Confirm</span>
                          </button>
                          <button className="flex gap-2 shadow-lg items-center justify-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-base font-medium text-white hover:bg-red-700">
                            <MdWarning className="h-5 w-5" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </Layout>
  );
};

export default Order;
