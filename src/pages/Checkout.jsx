import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];
const Checkout = ({ from }) => {
  console.log(from);
  return (
    <>
      <Navbar />
      <div className="w-full pt-20 h-full bg-gradient-to-b from-white to-gray-100">
        {from === "orders" && (
          <div className="flex w-full justify-center items-center bg-info">
            <div className="flex items-center justify-between w-full px-2">
              <span className="text-white text-md font-medium">
                Order status
              </span>
              <div className="m-2 rounded-sm px-2 bg-white text-info">
                Proccess
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
                  <ul role="list" className="-my-6">
                    {products.map((product) => (
                      <li key={product.id} className="flex py-6 border-b-2">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>{product.name}</a>
                              </h3>
                              <p className="ml-4">{product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">
                              Qty {product.quantity}
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
                </div>

                <div className=" py-6 pt-10 ">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$262.00</p>
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
                        <div className="flex justify-between w-11/12 lg:w-1/2">
                          <div className="flex-1">Name</div>
                          {from === "checkout" ? (
                            <div className="flex gap-1 border-b">
                              :
                              <input
                                type="text"
                                className=" border-none outline-none"
                                placeholder="username"
                              />
                            </div>
                          ) : (
                            <div className="flex flex-1 gap-1 justify-start">
                              :<span>Username</span>
                            </div>
                          )}
                        </div>
                      </li>
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 lg:w-1/2">
                          <div className="flex-1">Phone</div>
                          {from === "checkout" ? (
                            <div className="flex gap-1 border-b">
                              :
                              <input
                                type="number"
                                className=" border-none outline-none"
                                placeholder="+123 456 789"
                              />
                            </div>
                          ) : (
                            <div className="flex flex-1 gap-1 justify-start">
                              :<span>Phone</span>
                            </div>
                          )}
                        </div>
                      </li>
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 lg:w-1/2">
                          <div className="flex-1">Code Pos</div>
                          {from === "checkout" ? (
                            <div className="flex gap-1 border-b">
                              :
                              <input
                                type="number"
                                className=" border-none outline-none"
                                placeholder="446"
                              />
                            </div>
                          ) : (
                            <div className="flex flex-1 gap-1 justify-start">
                              :<span>Code Pos</span>
                            </div>
                          )}
                        </div>
                      </li>
                      <li className="w-full justify-center flex">
                        <div className="flex justify-between w-11/12 lg:w-1/2">
                          <div className="flex-1">Address</div>
                          {from === "checkout" ? (
                            <div className="flex gap-1 border-b">
                              :
                              <input
                                type="text"
                                className=" border-none outline-none"
                                placeholder="+123 456 789"
                              />
                            </div>
                          ) : (
                            <div className="flex flex-1 gap-1 justify-start">
                              :<span>Address</span>
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
              <div className="flex justify-center">
                <div className="max-w-xl">
                  <div className="mt-6">
                    <Link
                      to={"/checkout"}
                      className="flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700"
                    >
                      Pay now
                    </Link>
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
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
