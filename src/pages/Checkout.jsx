import axios from "axios";
import React, { useState, useEffect } from "react";
import { MdAddBox, MdIndeterminateCheckBox } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { refreshToken } from "../utils/refreshToken";
import StripeCheckout from "react-stripe-checkout";

const KEY = import.meta.env.VITE_API_KEY;
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Checkout = ({ from }) => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [color, setColor] = useState("");
  const [inputs, setInputs] = useState({});
  const [carts, setCarts] = useState([]);
  const [message, setMessage] = useState("");
  const getOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/orders/${id}`);
      console.log(response);
      setOrder(response.data);
      if (response.data.status === "success") {
        setColor("success");
      } else if (response.data.status === "proccess") {
        setColor("info");
      } else if (response.data.status === "failed") {
        setColor("error");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const getProductCart = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cart");
      console.log(response);
      setCarts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setMessage("");

    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  useEffect(() => {
    if (from === "orders") {
      refreshToken().then(() => {
        getOrder();
      });
    } else if (from === "checkout") {
      refreshToken().then(() => {
        getProductCart();
      });
    }
  }, []);
  const handleDelete = async (uuid) => {
    try {
      refreshToken().then(async () => {
        const response = await axios.delete(
          `http://localhost:5000/cart/${uuid}`
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantity = async (uuid, data) => {
    refreshToken().then(async () => {
      try {
        const response = await axios.put(`http://localhost:5000/cart/${uuid}`, {
          operation: data,
        });
        setMessage("");
        getProductCart();
      } catch (error) {
        console.log(error);
        setMessage(error.response.data.message);
      }
    });
  };
  const uuidArray = [];

  for (let i = 0; i < carts.length; i++) {
    uuidArray.push(carts[i].uuid);
  }
  const handleClick = async (token) => {
    refreshToken().then(async () => {
      try {
        const data = {
          ...inputs,
          postal_code: parseInt(inputs.postal_code),
          tokenId: token.id,
          cartId: uuidArray,
        };
        const response = await axios.post("http://localhost:5000/orders", data);
        console.log(response);
        navigate(`/orders`);
      } catch (error) {
        console.log(error);
      }
    });
  };
  console.log(inputs);
  return (
    <>
      <Navbar />
      <div className="w-full pt-20 h-full bg-gradient-to-b from-white to-gray-100">
        {from === "orders" && (
          <div
            className={`flex w-full justify-center items-center bg-info bg-${color}`}
          >
            <div className="flex items-center justify-between w-full px-2">
              <span className="text-white text-md font-medium">
                Order status
              </span>
              <div className={`m-2 p-1 rounded-sm px-2 bg-white text-${color}`}>
                {order.status}
              </div>
            </div>
          </div>
        )}
        <div className="flex h-full flex-col overflow-y-scroll">
          <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
            <div className="lg:flex-row flex flex-col">
              <div className=" flex-1">
                <div className="flex pb-5 items-center justify-center">
                  <h1 className="text-lg font-medium text-teal-600">
                    Products
                  </h1>
                </div>
                <div className="flow-root">
                  {from === "orders" ? (
                    <ul role="list" className="-my-6">
                      {order.cart?.map((cart) => (
                        <li key={cart.uuid} className="flex py-6 border-b-2">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={cart.product.img[0]}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <Link to={`/products/${cart.product.uuid}`}>
                                    {cart.product.name}
                                  </Link>
                                </h3>
                                <p className="ml-4">$ {cart.price}</p>
                              </div>
                              <div className="flex gap-2">
                                <div
                                  className={classNames(
                                    cart.stock?.color,
                                    "h-6 w-6 rounded-full border shadow-lg"
                                  )}
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                  {cart.stock?.color.split("-")[1]}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500">
                                Qty {cart.quantity}
                              </p>

                              <div className="flex">
                                <button
                                  type="button"
                                  className="font-medium text-red-600 hover:text-red-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul role="list" className="-my-6">
                      {carts.map((cart) => (
                        <li key={cart.uuid} className="flex py-6 border-b-2">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={cart.product?.img[0]}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <Link to={`/products/${cart.product.uuid}`}>
                                    {cart.product.name}
                                  </Link>
                                </h3>
                                <p className="ml-4">$ {cart.price}</p>
                              </div>
                              <div className="flex gap-2">
                                <div
                                  className={classNames(
                                    cart.stock?.color,
                                    "h-6 w-6 rounded-full border shadow-lg"
                                  )}
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                  {cart.stock?.color.split("-")[1]}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="flex gap-5">
                                <MdIndeterminateCheckBox
                                  className="w-6 h-6"
                                  onClick={(e) => {
                                    handleQuantity(cart.uuid, "reduce");
                                  }}
                                />
                                <p className="text-gray-500">
                                  Qty {cart.quantity}
                                </p>
                                <MdAddBox
                                  className="w-6 h-6"
                                  onClick={(e) => {
                                    handleQuantity(cart.uuid, "add");
                                  }}
                                />
                              </div>
                              <div className="flex">
                                <button
                                  onClick={(e) => handleDelete(cart.uuid)}
                                  type="button"
                                  className="font-medium text-red-600 hover:text-red-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className=" py-6 pt-10 ">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>
                      ${" "}
                      {from === "orders"
                        ? order.totalPrice
                        : carts.reduce(function (acc, dataItem) {
                            return acc + dataItem.price;
                          }, 0)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-center items-center">
                  <h1 className="text-lg font-medium  text-teal-600">
                    Recipient Address
                  </h1>
                </div>
                <div className="lg:px-7 px-2 py-3 lg:py-5">
                  <div className="w-full justify-center py-10 flex border rounded-lg bg-white shadow-sm">
                    <ul className="w-full flex-col justify-centerf flex gap-5 ">
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 lg:w-4/5">
                          <div className="flex-1">Name</div>
                          {from === "checkout" ? (
                            <div className="flex gap-1 border-b">
                              :
                              <input
                                name="name"
                                onChange={handleChange}
                                type="text"
                                className=" border-none outline-none"
                                placeholder="username"
                              />
                            </div>
                          ) : (
                            <div className="flex flex-1 gap-1 justify-start">
                              :<span>{order.name}</span>
                            </div>
                          )}
                        </div>
                      </li>
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 lg:w-4/5">
                          <div className="flex-1">Phone</div>
                          {from === "checkout" ? (
                            <div className="flex gap-1 border-b">
                              :
                              <input
                                name="phone"
                                onChange={handleChange}
                                type="number"
                                className=" border-none outline-none"
                                placeholder="+123 456 789"
                              />
                            </div>
                          ) : (
                            <div className="flex flex-1 gap-1 justify-start">
                              :<span>{order.user?.phone}</span>
                            </div>
                          )}
                        </div>
                      </li>
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 lg:w-4/5">
                          <div className="flex-1">Code Pos</div>
                          {from === "checkout" ? (
                            <div className="flex gap-1 border-b">
                              :
                              <input
                                name="postal_code"
                                onChange={handleChange}
                                type="number"
                                className=" border-none outline-none"
                                placeholder="446"
                              />
                            </div>
                          ) : (
                            <div className="flex flex-1 gap-1 justify-start">
                              :<span>{order.postal_code}</span>
                            </div>
                          )}
                        </div>
                      </li>
                      {from === "checkout" && (
                        <>
                          <li className="w-full justify-center flex">
                            <div className="flex justify-between w-11/12 lg:w-4/5">
                              <div className="flex-1">Country</div>
                              <div className="flex gap-1 border-b">
                                :
                                <input
                                  name="country"
                                  onChange={handleChange}
                                  type="text"
                                  className=" border-none outline-none"
                                  placeholder="country"
                                />
                              </div>
                            </div>
                          </li>
                          <li className="w-full justify-center flex">
                            <div className="flex justify-between w-11/12 lg:w-4/5">
                              <div className="flex-1">City</div>
                              <div className="flex gap-1 border-b">
                                :
                                <input
                                  name="city"
                                  onChange={handleChange}
                                  type="text"
                                  className=" border-none outline-none"
                                  placeholder="city"
                                />
                              </div>
                            </div>
                          </li>
                        </>
                      )}
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 lg:w-4/5">
                          <div className="flex-1">Address</div>
                          {from === "checkout" ? (
                            <div className="flex gap-1 border-b">
                              :
                              <input
                                name="address"
                                onChange={handleChange}
                                type="text"
                                className=" border-none outline-none"
                                placeholder="address"
                              />
                            </div>
                          ) : (
                            <div className="flex flex-1 gap-1 justify-start">
                              :
                              <span>
                                {order.country},{order.city},{order.address}
                              </span>
                            </div>
                          )}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {from === "checkout" && (
              <>
                {message && (
                  <div className="flex w-full justify-center">
                    <div className="w-1/2 flex bg-red-300 p-2 justify-center rounded-lg">
                      <div className="text-red-700">{message}</div>
                    </div>
                  </div>
                )}
                <div className="flex justify-center">
                  <div className="max-w-xl">
                    <div className="mt-6">
                      {from === "checkout" && (
                        <StripeCheckout
                          stripeKey={KEY}
                          name="Pay With Credit Card"
                          billingAddress
                          shippingAddress
                          amount={
                            carts.reduce(function (acc, dataItem) {
                              return acc + dataItem.price;
                            }, 0) * 100
                          }
                          description={`Your total is $ ${carts.reduce(
                            function (acc, dataItem) {
                              return acc + dataItem.price;
                            },
                            0
                          )}`}
                          token={handleClick}
                        >
                          <button className="w-full flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700">
                            Pay
                          </button>
                        </StripeCheckout>
                      )}
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or
                        <button
                          type="button"
                          className="font-medium text-teal-600 hover:text-teal-500"
                          onClick={() => setOpen(false)}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
