import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { refreshToken } from "../utils/refreshToken";
import { MdAddBox, MdIndeterminateCheckBox } from "react-icons/md";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const getProductCart = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cart");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    refreshToken().then(() => {
      getProductCart();
      setMessage("");
    });
  }, [open]);
  const handleDelete = async (id) => {
    try {
      refreshToken().then(async () => {
        const response = await axios.delete(`http://localhost:5000/cart/${id}`);
        getProductCart();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantity = async (id, data) => {
    refreshToken().then(async () => {
      try {
        const response = await axios.put(`http://localhost:5000/cart/${id}`, {
          operation: data,
        });
        setMessage("");
        getProductCart();
      } catch (error) {
        setMessage(error.response.data.message);
        console.log(error);
      }
    });
  };

  return (
    <>
      <div className="group">
        <button
          onClick={(e) => setOpen(true)}
          className="btn-sm  btn btn-ghost rounded-full flex hover:bg-white  text-white  gap-1 items-center bg-teal-600 border-2 border-transparent hover:border-teal-600"
        >
          <IoCart className="w-6 h-6 text-white group-hover:text-teal-600 " />
          <span className="normal-case hidden group-hover:text-teal-600  lg:block">
            Cart
          </span>
          <div className="flex w-4 h-4 rounded-full bg-white group-hover:bg-teal-600 justify-center items-center ml-1">
            <span className="text-teal-600 group-hover:text-white">
              {products?.length}
            </span>
          </div>
        </button>{" "}
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 pt-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300 sm:duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-300 sm:duration-300"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-xl">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {products?.map((product) => (
                                <li key={product.uuid} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.product?.img[0]}
                                      alt=""
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link
                                            to={`/products/${product.product_id}`}
                                          >
                                            {product.product?.name}
                                          </Link>
                                        </h3>
                                        <p className="ml-4">
                                          $ {product.price}
                                        </p>
                                      </div>
                                      <div className="mt-1 text-sm text-gray-500 flex gap-2">
                                        <div
                                          className={classNames(
                                            product.stock?.color,
                                            "h-5 w-5 rounded-full border border-black border-opacity-10"
                                          )}
                                        />
                                        <p>
                                          {product.stock?.color.split("-")[1]}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        Size : {product.stock?.size}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex gap-5">
                                        <MdIndeterminateCheckBox
                                          className="w-6 h-6 cursor-pointer"
                                          onClick={(e) => {
                                            handleQuantity(
                                              product.uuid,
                                              "reduce"
                                            );
                                          }}
                                        />
                                        <p className="text-gray-500">
                                          Qty {product.quantity}
                                        </p>
                                        <MdAddBox
                                          className="w-6 h-6 cursor-pointer"
                                          onClick={(e) => {
                                            handleQuantity(product.uuid, "add");
                                          }}
                                        />
                                      </div>
                                      <div className="flex">
                                        <button
                                          onClick={(e) =>
                                            handleDelete(product.uuid)
                                          }
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
                        </div>
                      </div>

                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        {message && (
                          <div className="w-full flex justify-center rounded-lg bg-red-300 p-2">
                            <div className="text-red-700">{message}</div>
                          </div>
                        )}
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>
                            ${" "}
                            {products.reduce(function (acc, dataItem) {
                              return acc + dataItem.price;
                            }, 0)}
                          </p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <Link
                            onClick={(e) => setOpen(false)}
                            to={"/checkout"}
                            className="flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-700"
                          >
                            Checkout
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
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
export default Cart;
