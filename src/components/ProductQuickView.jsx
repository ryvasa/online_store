import { Fragment, useState, useEffect } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import { FaCartPlus } from "react-icons/fa";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductQuicView = ({ uuid }) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [product, setProduct] = useState({});

  const handleStockSelection = (e) => {
    setSize(e.target.value.split(",")[0]);
    setColor(e.target.value.split(",")[1]);
  };
  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/products/${uuid}`
      );
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addCart = async () => {
    try {
      const data = {
        product_id: uuid,
        color: color,
        size: size,
        quantity: 1,
      };
      const response = await axios.post(`http://localhost:5000/cart`, data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    addCart();
  };
  useEffect(() => {
    if (open) {
      getProduct();
    }
  }, [open]);
  return (
    <>
      <div className="flex justify-center items-center w-full h-full">
        <button onClick={(e) => setOpen(true)} className="">
          <FaCartPlus className="text-teal-600 lg:w-6 lg:h-6" />
        </button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex pt-16 w-full h-3/4 transform text-left text-base transition  md:max-w-xl md:px-4 lg:max-w-3xl">
                  <div className="relative flex w-full items-center overflow-hidden rounded-lg bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                      <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                        {product && product.img && (
                          <img
                            src={product.img[0]}
                            alt=""
                            className="object-cover object-center"
                          />
                        )}
                      </div>
                      <div className="sm:col-span-8 lg:col-span-7">
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                          {product.name}
                        </h2>

                        <section
                          aria-labelledby="information-heading"
                          className="mt-2"
                        >
                          <h3 id="information-heading" className="sr-only">
                            Product information
                          </h3>

                          <p className="text-2xl text-gray-900">
                            $ {product.price}
                          </p>
                        </section>

                        <section
                          aria-labelledby="options-heading"
                          className="mt-10"
                        >
                          <h3 id="options-heading" className="sr-only">
                            Product options
                          </h3>

                          <form>
                            <div className="w-full flex-col flex">
                              <h3 className="text-xl font-semibold">
                                Select Option
                              </h3>
                              <form>
                                <div className="grid grid-cols-3 py-3 gap-4">
                                  {product.stock?.map((stock, index) => (
                                    <div className="" key={index}>
                                      {stock.size === size &&
                                      stock.color === color ? (
                                        <div className=" rounded-full outline outline-teal-600 flex items-center justify-center  bg-white p-1">
                                          <input
                                            onClick={handleStockSelection}
                                            type="radio"
                                            name="stock"
                                            value={[stock.size, stock.color]}
                                            id={[stock.size, stock.color]}
                                            className="hidden"
                                          />

                                          <label
                                            htmlFor={[stock.size, stock.color]}
                                            className="flex items-center w-full cursor-pointer"
                                          >
                                            <div className="flex-1">
                                              <div
                                                className={classNames(
                                                  stock.color,
                                                  "relative flex  items-center justify-center rounded-full w-7 h-7 border-2 "
                                                )}
                                              />
                                            </div>

                                            <div className="text-lg flex-1">
                                              {stock.size}
                                            </div>
                                          </label>
                                        </div>
                                      ) : (
                                        <div className=" rounded-full outline outline-gray-100 flex items-center justify-center  ml-2  bg-white p-1">
                                          <input
                                            onClick={handleStockSelection}
                                            type="radio"
                                            name="stock"
                                            value={[stock.size, stock.color]}
                                            id={[stock.size, stock.color]}
                                            className="hidden"
                                          />

                                          <label
                                            htmlFor={[stock.size, stock.color]}
                                            className="flex items-center w-full cursor-pointer"
                                          >
                                            <div className="flex-1">
                                              <div
                                                className={classNames(
                                                  stock.color,
                                                  "relative flex  items-center justify-center rounded-full w-7 h-7 border-2 "
                                                )}
                                              />
                                            </div>

                                            <div className="text-lg flex-1">
                                              {stock.size}
                                            </div>
                                          </label>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </form>
                            </div>
                            <button
                              onClick={handleClick}
                              type="submit"
                              className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-teal-600 py-3 px-8 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                            >
                              Add to bag
                            </button>
                          </form>
                        </section>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
export default ProductQuicView;
