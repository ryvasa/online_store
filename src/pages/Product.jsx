import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Product = () => {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [product, setProduct] = useState({});
  const { id } = useParams();

  const handleStockSelection = (e) => {
    setSize(e.target.value.split(",")[0]);
    setColor(e.target.value.split(",")[1]);
  };
  const getProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addCart = async () => {
    try {
      const data = {
        product_id: id,
        color: color,
        size: size,
        quantity: 1,
      };
      const response = await axios.post(`http://localhost:5000/cart`, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = (e) => {
    e.preventDefault();
    addCart();
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-white to-gray-100">
        <div className="pt-20">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            {product.img?.map((img, index) => (
              <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src={img}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ))}
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                $ {product.price}
              </p>

              <form className="mt-10">
                <div className="w-full flex-col flex">
                  <h3 className="text-xl font-semibold">Select Option</h3>
                  <form>
                    <div className="grid grid-cols-4 py-3">
                      {product.stock?.map((stock, index) => (
                        <div className="" key={index}>
                          {stock.size === size && stock.color === color ? (
                            <div className=" rounded-full outline outline-teal-600 flex items-center justify-center  ml-2  bg-white p-1">
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
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-teal-600 py-3 px-8 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                >
                  Add to bag
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{product.desc}</p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Categories
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.categories?.map((category) => (
                      <li key={category} className="text-gray-400">
                        <span className="text-gray-600">{category}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.detail}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Product;
