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
const Transaction = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState({});

  const getTransaction = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/transactions/${id}`);
      console.log(res.data);
      setTransaction(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    refreshToken().then(() => {
      getTransaction();
    });
  }, []);
  dayjs.extend(relativeTime);

  return (
    <Layout>
      <div className="flex-[5] h-screen pb-16 w-full relative">
        <div className="flex relative h-full flex-col ">
          <div className="flex-1  py-6 px-4 sm:px-6 ">
            <div className="lg:flex-row flex flex-col  border-y py-5 border-gray-400">
              <div className=" flex-1">
                <div className="flex pb-5 items-center justify-center">
                  <h1 className="text-xl font-semibold  text-indigo-600">
                    Products
                  </h1>
                </div>
                <div className="flow-root overflow-auto h-[380px] rounded-lg px-5 border">
                  <ul role="list" className="-my-6 py-5">
                    {transaction.order?.cart?.map((cart) => (
                      <li key={cart.id} className="flex py-6 border-b-2">
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
                    <span>
                      ${" "}
                      <span className="font-semibold text-lg">
                        {transaction.order?.totalPrice}
                      </span>
                    </span>
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
                  <div className="w-full justify-center py-5 flex border shadow-xl rounded-lg bg-white ">
                    <ul className="w-full flex-col justify-centerf flex gap-5 ">
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12">
                          <div className="flex-1">Transaction ID</div>

                          <div className="flex flex-[3] gap-1 justify-start">
                            :<span>{transaction.uuid}</span>
                          </div>
                        </div>
                      </li>
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12">
                          <div className="flex-1">Order ID</div>

                          <div className="flex flex-[3] gap-1 justify-start">
                            :<span>{transaction.order?.uuid}</span>
                          </div>
                        </div>
                      </li>
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12">
                          <div className="flex-1">User ID</div>

                          <div className="flex flex-[3] gap-1 justify-start">
                            :<span>{transaction.order?.user_id}</span>
                          </div>
                        </div>
                      </li>
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 ">
                          <div className="flex-1">Name</div>

                          <div className="flex flex-[3] gap-1 justify-start">
                            :<span>{transaction.name}</span>
                          </div>
                        </div>
                      </li>
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 ">
                          <div className="flex-1">Phone</div>

                          <div className="flex flex-[3] gap-1 justify-start">
                            :<span>{transaction.order?.user?.phone}</span>
                          </div>
                        </div>
                      </li>
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 ">
                          <div className="flex-1">Code Pos</div>

                          <div className="flex flex-[3] gap-1 justify-start">
                            :<span>{transaction.order?.postal_code}</span>
                          </div>
                        </div>
                      </li>
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 ">
                          <div className="flex-1">Address</div>

                          <div className="flex flex-[3] gap-1 justify-start">
                            :
                            <span>
                              {transaction.order?.country},{" "}
                              {transaction.order?.city},{" "}
                              {transaction.order?.address}
                            </span>
                          </div>
                        </div>
                      </li>
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 ">
                          <div className="flex-1">Date</div>

                          <div className="flex flex-[3] gap-1 justify-start">
                            :
                            <span>
                              {dayjs(transaction.createdAt)
                                .locale("id")
                                .format("dddd, DD MMMM YYYY, HH:mm:ss")}
                            </span>
                          </div>
                        </div>
                      </li>
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 ">
                          <div className="flex-1">Total</div>

                          <div className="flex flex-[3] gap-1 justify-start">
                            :
                            <span>
                              ${" "}
                              <span className="font-semibold text-lg">
                                {transaction.order?.totalPrice}
                              </span>
                            </span>
                          </div>
                        </div>
                      </li>
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 ">
                          <div className="flex-1">Total Quantity</div>

                          <div className="flex flex-[3] gap-1 justify-start">
                            :
                            <span className=" font-semibold text-lg">
                              {transaction.order?.totalQuantity}
                              <span className="font-light text-sm"> pcs</span>
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
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

export default Transaction;
