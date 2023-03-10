import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import Footer from "../components/Footer";
import { MdImage, MdOutlineUpload } from "react-icons/md";
import Layout from "../components/Layout";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Green", class: "bg-green-500", selectedClass: "ring-green-500" },
    { name: "Red", class: "bg-red-600", selectedClass: "ring-red-600" },
    { name: "Blue", class: "bg-blue-600", selectedClass: "ring-blue-600" },
    {
      name: "Yellow",
      class: "bg-yellow-400",
      selectedClass: "ring-yellow-400",
    },
    {
      name: "Purple",
      class: "bg-purple-600",
      selectedClass: "ring-purple-600",
    },
    { name: "Black", class: "bg-black", selectedClass: "ring-black" },
  ],
  sizes: [
    { name: "XXS" },
    { name: "XS" },
    { name: "S" },
    { name: "M" },
    { name: "L" },
    { name: "XL" },
    { name: "2XL" },
    { name: "3XL" },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const EditProduct = () => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  return (
    <>
      <Layout>
        <div className="flex-[5] overflow-y-auto h-screen pb-16 pt-3 w-full">
          <div className="bg-white">
            <div className="">
              {/* Image gallery */}
              <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block relative">
                  <img
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    className="h-full w-full object-cover object-center relative"
                  />
                  <div className="flex w-full px-10 py-5 justify-center absolute bottom-0 backdrop-blur-sm rounded-t-full shadow-lg">
                    <div className="flex-1 w-full flex  justify-center">
                      <button className="flex gap-1 btn btn-sm justify-center border-none bg-indigo-600  text-white shadow-xl hover:bg-indigo-600">
                        <MdImage />
                        <span>Change Image</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block relative">
                  <img
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    className="h-full w-full object-cover object-center relative"
                  />
                  <div className="flex w-full px-10 py-5 justify-center absolute bottom-0 backdrop-blur-sm rounded-t-full shadow-lg">
                    <div className="flex-1 w-full flex  justify-center">
                      <button className="flex gap-1 btn btn-sm justify-center border-none bg-indigo-600  text-white shadow-xl hover:bg-indigo-600">
                        <MdImage />
                        <span>Change Image</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4 relative">
                  <img
                    src={product.images[3].src}
                    alt={product.images[3].alt}
                    className="h-full w-full object-cover object-center relative"
                  />
                  <div className="flex w-full px-10 py-5 justify-center absolute bottom-0 backdrop-blur-sm rounded-t-full shadow-lg">
                    <div className="flex-1 w-full flex  justify-center">
                      <button className="flex gap-1 btn btn-sm justify-center border-none bg-indigo-600  text-white shadow-xl hover:bg-indigo-600">
                        <MdImage />
                        <span>Change Image</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full p-10">
                <div className="flex-1 p-2 gap-5 flex flex-col">
                  <div className="flex w-full gap-3">
                    <div className="flex flex-1 justify-between  text-md font-medium border-b border-transparent">
                      <span>Product Name</span>
                      <span>:</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Product name"
                      className="bg-transparent outline-none border-b flex-1"
                    />
                  </div>
                  <div className="flex w-full gap-3">
                    <div className="flex justify-between  text-md font-medium border-b border-transparent flex-1">
                      <span>Price</span>
                      <span>:</span>
                    </div>
                    <input
                      type="number"
                      placeholder="$ 99"
                      className="bg-transparent outline-none border-b flex-1"
                    />
                  </div>
                  <div className="flex w-full gap-3">
                    <div className="flex justify-between  text-md font-medium border-b border-transparent flex-1">
                      <span>Description</span>
                      <span>:</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Description"
                      className="bg-transparent outline-none border-b flex-1"
                    />
                  </div>
                  <div className="flex w-full gap-3">
                    <div className="flex justify-between  text-md font-medium border-b border-transparent flex-1">
                      <span>Detail</span>
                      <span>:</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Detail"
                      className="bg-transparent outline-none border-b flex-1"
                    />
                  </div>
                  <div className="flex w-full gap-3">
                    <div className="flex justify-between  text-md font-medium border-b border-transparent flex-1">
                      <span>Category</span>
                      <span>:</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Category"
                      className="bg-transparent outline-none border-b flex-1"
                    />
                  </div>
                </div>
                <div className="flex-1 p-2 border-x">
                  <div className="flex justify-between gap-2">
                    <div className="flex justify-between w-full text-md font-medium flex-1">
                      <span>Total Stock</span>
                      <span>:</span>
                    </div>
                    <div className="flex gap-2 flex-1">
                      <span className="font-bold text-lg">58</span>
                      <span className="text md font-light">pcs</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-5 items-center border-b p-2">
                      <div className="w-1/5 ">
                        <div className="flex gap-1 w-full justify-between">
                          <span className="h-8 bg-red-600 w-8 rounded-full border border-black border-opacity-10" />
                          <span>red</span>
                        </div>
                      </div>
                      <div className="border-x px-3 border-gray-300">
                        <div className="border flex p-2 h-9 w-9 rounded-md justify-center items-center">
                          <div className="">L</div>
                        </div>
                      </div>
                      <div className="flex justify between w-1/2 gap-3 ">
                        <div className="flex justify-between w-1/2">
                          <span>Stock</span>
                          <span>:</span>
                        </div>
                        <div className="flex items-end justify-center gap-1">
                          <span className="font-semibold text-lg">76</span>
                          <span className="text-md font-light">pcs</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5 items-center border-b p-2">
                      <div className="w-1/5 ">
                        <div className="flex gap-1 w-full justify-between">
                          <span className="h-8 bg-red-600 w-8 rounded-full border border-black border-opacity-10" />
                          <span>red</span>
                        </div>
                      </div>
                      <div className="border-x px-3 border-gray-300">
                        <div className="border flex p-2 h-9 w-9 rounded-md justify-center items-center">
                          <div className="">L</div>
                        </div>
                      </div>
                      <div className="flex justify between w-1/2 gap-3 ">
                        <div className="flex justify-between w-1/2">
                          <span>Stock</span>
                          <span>:</span>
                        </div>
                        <div className="flex items-end justify-center gap-1">
                          <span className="font-semibold text-lg">76</span>
                          <span className="text-md font-light">pcs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 w-full p-2 flex flex-col">
                  {/* Colors */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a color
                      </RadioGroup.Label>
                      <div className="gap-3 grid grid-cols-4 px-10">
                        {product.colors.map((color) => (
                          <RadioGroup.Option
                            key={color.name}
                            value={color}
                            className={({ active, checked }) =>
                              classNames(
                                color.selectedClass,
                                active && checked ? "ring ring-offset-1" : "",
                                !active && checked ? "ring-2" : "",
                                "relative -m-0.5 flex cursor-pointer items-center h-fit w-fit justify-center rounded-full p-0.5 focus:outline-none"
                              )
                            }
                          >
                            <RadioGroup.Label as="span" className="sr-only">
                              {color.name}
                            </RadioGroup.Label>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                color.class,
                                "h-8 w-8 rounded-full border border-black border-opacity-10"
                              )}
                            />
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Sizes */}
                  <div className="mt-3">
                    <div className="border-t w-full p-2 " />
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a size
                      </RadioGroup.Label>
                      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                        {product.sizes.map((size) => (
                          <RadioGroup.Option
                            key={size.name}
                            value={size}
                            className={({ active }) =>
                              classNames(
                                active ? "ring-2 ring-indigo-500" : "",
                                "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="span">
                                  {size.name}
                                </RadioGroup.Label>
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
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="mt-5 border-t">
                    <div className=" w-full p-2 pt-5 flex justify-between">
                      <div className="text-sm font-medium text-gray-900 flex flex-1 justify-between border-b border-transparent">
                        <span className="flex-1">Stock</span>
                        <span className="flex-1">:</span>
                      </div>
                      <input
                        type="number"
                        className="bg-transparent outline-none flex-1 border-b"
                        placeholder="stock"
                      />
                    </div>
                  </div>
                  <div className="flex w-full px-10 pt-5 justify-center">
                    <button className="flex border-none bg-indigo-600  btn btn-sm font-medium text-white shadow-xl hover:bg-indigo-600">
                      <MdOutlineUpload className="h-5 w-5" />
                      <span>Add to Stock</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex w-full px-10 pb-5 justify-center">
                <button className="flex gap-1 border-none bg-indigo-600 p-3 btn font-medium text-white shadow-xl hover:bg-indigo-600">
                  <MdOutlineUpload className="h-5 w-5" />
                  <span>Update</span>
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    </>
  );
};
export default EditProduct;
