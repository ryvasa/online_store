import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import Footer from "../components/Footer";
import { MdDeleteForever, MdMode } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import { refreshToken } from "../utils/refreshToken";
import { useEffect } from "react";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Product = () => {
  const [stocks, setStocks] = useState([]);
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const getProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/products/${id}`);
      setProduct(res.data);
      setStocks(res.data.stock);
    } catch (error) {
      console.log(error);
    }
  };
  const uniqueSizes = [...new Set(stocks?.map((stock) => stock.size))];
  const uniqueColors = [...new Set(stocks?.map((stock) => stock.color))];
  useEffect(() => {
    refreshToken().then(() => {
      getProduct();
    });
  }, []);
  return (
    <>
      <Layout>
        <div className="flex-[5] overflow-y-auto h-screen pb-16 pt-3 w-full">
          <div className="bg-white">
            <div className="">
              {/* Image gallery */}
              <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                {product.img?.map((img, index) => (
                  <div
                    key={index}
                    className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block"
                  >
                    <img
                      src={img}
                      alt={img}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>

              {/* Product info */}
              <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                <div className="lg:col-span-2 lg:pr-8">
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

                  {/* Reviews */}
                  <div className="mt-6">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              reviews.average > rating
                                ? "text-gray-900"
                                : "text-gray-200",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">
                        {reviews.average} out of 5 stars
                      </p>
                      <a
                        href={reviews.href}
                        className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        {reviews.totalCount} reviews
                      </a>
                    </div>
                  </div>

                  <form className="mt-10">
                    {/* Colors */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        Color
                      </h3>

                      <RadioGroup
                        // value={selectedColor}
                        // onChange={setSelectedColor}
                        className="mt-4"
                      >
                        <RadioGroup.Label className="sr-only">
                          {" "}
                          Choose a color{" "}
                        </RadioGroup.Label>
                        <div className="flex items-center space-x-3">
                          {uniqueColors?.map((color, index) => (
                            <RadioGroup.Option
                              key={index}
                              value={color}
                              className={({ active, checked }) =>
                                classNames(
                                  color,
                                  active && checked ? "ring ring-offset-1" : "",
                                  !active && checked ? "ring-2" : "",
                                  "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                )
                              }
                            >
                              <RadioGroup.Label as="span" className="sr-only">
                                {" "}
                                {color}{" "}
                              </RadioGroup.Label>
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  color,
                                  "h-8 w-8 rounded-full border border-black border-opacity-10"
                                )}
                              />
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Sizes */}
                    <div className="mt-10">
                      <RadioGroup
                        // value={selectedSize}
                        // onChange={setSelectedSize}
                        className="mt-4"
                      >
                        <RadioGroup.Label className="sr-only">
                          {" "}
                          Choose a size{" "}
                        </RadioGroup.Label>
                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                          {uniqueSizes?.map((size, index) => (
                            <RadioGroup.Option
                              key={index}
                              value={size}
                              disabled={!size}
                              className={({ active }) =>
                                classNames(
                                  size
                                    ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                    : "cursor-not-allowed bg-gray-50 text-gray-200",
                                  active ? "ring-2 ring-indigo-500" : "",
                                  "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                )
                              }
                            >
                              {({ active, checked }) => (
                                <>
                                  <RadioGroup.Label as="span">
                                    {size}
                                  </RadioGroup.Label>
                                  {size ? (
                                    <span
                                      className={classNames(
                                        active ? "border" : "border-2",
                                        checked
                                          ? "border-indigo-500"
                                          : "border-transparent",
                                        "pointer-events-none absolute -inset-px rounded-md"
                                      )}
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <span
                                      aria-hidden="true"
                                      className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                    >
                                      <svg
                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                        viewBox="0 0 100 100"
                                        preserveAspectRatio="none"
                                        stroke="currentColor"
                                      >
                                        <line
                                          x1={0}
                                          y1={100}
                                          x2={100}
                                          y2={0}
                                          vectorEffect="non-scaling-stroke"
                                        />
                                      </svg>
                                    </span>
                                  )}
                                </>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                    <div className=" flex py-6 w-full ">
                      <div className="flex-1 w-full flex  justify-start">
                        <Link
                          to={`/products/${product.uuid}/edit`}
                          className="flex gap-3 w-11/12 items-center justify-center rounded-md border-none bg-green-500 p-2 text-base font-medium text-white shadow-xl hover:bg-green-600"
                        >
                          <MdMode />
                          <span>Edit Product</span>
                        </Link>
                      </div>
                      <div className="flex-1 w-full flex justify-end">
                        <Link
                          onClick={(e) => setOpen(false)}
                          to={"/products/:id"}
                          className="flex gap-3 w-11/12 items-center justify-center rounded-md border-none bg-red-600 p-2 text-base font-medium text-white shadow-xl hover:bg-red-700"
                        >
                          <MdDeleteForever />
                          <span>Delete Product</span>
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1  lg:pt-6 lg:pb-16 lg:pr-8">
                  {/* Description and details */}
                  <div className="my-5">
                    <h3 className="text-md font-medium">Stock</h3>
                    <div className="flex flex-col p-3">
                      {product.stock?.map((stock) => (
                        <div
                          key={stock.uuid}
                          className="flex gap-5 items-center border-b p-2"
                        >
                          <div className="w-1/5 ">
                            <div className="flex gap-1 w-full justify-between">
                              <span
                                className={classNames(
                                  stock.color,
                                  "h-6 w-6 rounded-full border shadow-lg"
                                )}
                              />
                              <span>{stock.color.split("-")[1]}</span>
                            </div>
                          </div>
                          <div className="border-x px-3 border-gray-300">
                            <div className="border flex p-2 h-9 w-9 rounded-md justify-center items-center">
                              <div className="">{stock.size}</div>
                            </div>
                          </div>
                          <div className="flex justify between w-1/2 gap-3 ">
                            <div className="flex justify-between w-1/2">
                              <span>Total stock</span>
                              <span>:</span>
                            </div>
                            <div className="flex items-end justify-center gap-1">
                              <span className="font-semibold text-lg">
                                {stock.stock}
                              </span>{" "}
                              <span className="text-md font-light">pcs</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-md font-semibold py-2">Description</h3>

                    <div className="space-y-6">
                      <p className="text-base text-gray-900">{product.desc}</p>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-sm font-medium text-gray-900">
                      Highlights
                    </h3>

                    <div className="mt-4">
                      <ul
                        role="list"
                        className="list-disc space-y-2 pl-4 text-sm"
                      >
                        {product.categories?.map((cat, index) => (
                          <li key={index} className="text-gray-400">
                            <span className="text-gray-600">{cat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">
                      Details
                    </h2>

                    <div className="mt-4 space-y-6">
                      <p className="text-sm text-gray-600">{product.detail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    </>
  );
};
export default Product;
