import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import Navbar from "../components/Navbar";
import ProduckQuickView from "../components/ProductQuickView";
import { Link } from "react-router-dom";
import { IoEyeSharp, IoSearchSharp } from "react-icons/io5";
import axios from "axios";

const sortOptions = [
  { name: "Top Product", value: "soldDesc" },
  { name: "Price: Low to High", value: "priceAsc" },
  { name: "Price: High to Low", value: "priceDesc" },
];

const categories = [
  "men",
  "women",
  "hat",
  "shoes",
  "casual",
  "tshirt",
  "sport",
];
const colors = [
  "bg-white",
  "bg-gray-200",
  "bg-green-500",
  "bg-red-600",
  "bg-blue-600",
  "bg-yellow-400",
  "bg-purple-600",
  "bg-black",
];
const sizes = ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"];

const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: false },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: false },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Products = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/products/store?search=${search}${
          category && `&category=${category}`
        }${size && `&size=${size}`}${color && `&color=${color}`}${
          sort && `&sort=${sort}`
        }`
      );
      setProducts(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, [search, size, color, category, sort]);
  return (
    <>
      <Navbar />
      <div className="bg-white lg:fixed lg:w-full">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pt-20  relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className="mt-4 border-t border-gray-200 ">
                      <h3 className="sr-only">Categories</h3>
                      <ul
                        role="list"
                        className="px-2 py-3 font-medium text-gray-900"
                      >
                        {categories.map((category) => (
                          <li key={category.name}>
                            <Link
                              to={category.href}
                              className="block px-2 py-3"
                            >
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        onChange={(e) =>
                                          setSize(e.target.value)
                                        }
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto w-full ">
            <div className="flex items-baseline justify-between border-b-2 shadow-sm pt-20 pb-5 px-5">
              <h1 className="text-4xl font-bold tracking-tight text-teal-600 hidden lg:block">
                New Arrivals
              </h1>

              <div className="flex lg:w-auto w-full justify-between items-center">
                <div className="flex items-center border rounded-lg mr-5">
                  <div className="form-control h-8 ">
                    <input
                      name="search"
                      onChange={(e) => setSearch(e.target.value)}
                      type="text"
                      placeholder="Search"
                      className="input "
                    />
                  </div>
                  <Link
                    to={`/products?search=`}
                    className="hover:bg-teal-600 rounded-lg hover:text-white "
                  >
                    <IoSearchSharp className="w-6 h-6 m-1" />
                  </Link>
                </div>
                <div className="w-full flex ">
                  <select
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full font-medium border-teal-600 border-2 text-gray-900 select "
                  >
                    <option selected value={""}>
                      Newest
                    </option>
                    {sortOptions.map((sOption, index) => (
                      <>
                        <option key={index} value={sOption.value}>
                          {sOption.name}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className=" pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-4 lg:h-screen">
                {/* Filters */}
                <form className="hidden lg:flex bg-white  border-r-2 lg:overflow-y-auto h-[500px] p-5  lg:flex-col gap-5">
                  <div className="w-full flex flex-col gap-2 ">
                    <span>Category</span>
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full font-medium border-teal-600 border-2 text-gray-900 select "
                    >
                      <option selected value={""}>
                        All Categories
                      </option>
                      {categories.map((category, index) => (
                        <>
                          <option key={index} value={category}>
                            {category}
                          </option>
                        </>
                      ))}
                    </select>
                  </div>
                  <div className="w-full flex flex-col gap-2 border-t-2 pt-2 ">
                    <span>Size</span>
                    <select
                      onChange={(e) => setSize(e.target.value)}
                      className="w-full font-medium border-teal-600 border-2 text-gray-900 select "
                    >
                      <option selected value={""}>
                        All Sizes
                      </option>
                      {sizes.map((size, index) => (
                        <>
                          <option key={index} value={size}>
                            {size}
                          </option>
                        </>
                      ))}
                    </select>
                  </div>
                  <div className="w-full flex flex-col gap-2 border-t-2 pt-2 ">
                    <span>Color</span>
                    <select
                      onChange={(e) => setColor(e.target.value)}
                      className="w-full font-medium border-teal-600 border-2 text-gray-900 select "
                    >
                      <option selected value={""}>
                        Select color
                      </option>
                      {colors.map((color, index) => (
                        <>
                          <option value={color}>{color.split("-")[1]}</option>
                        </>
                      ))}
                    </select>
                  </div>
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3 lg:overflow-y-auto lg:h-[500px] lg:py-10 bg-gradient-to-b from-gray-200 to-gray-100 px-5">
                  <div className=" grid grid-cols-2 gap-y-10 gap-x-6 lg:grid-cols-3 xl:gap-x-8 ">
                    {products.map((product) => (
                      <div
                        key={product.uuid}
                        className="group relative shadow-lg rounded-lg bg-white"
                      >
                        <Link
                          className="relative"
                          to={`/products/${product.uuid}`}
                        >
                          <div className=" min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-50 lg:aspect-none lg:h-80 ">
                            <img
                              src={product.img[0]}
                              alt=""
                              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                          </div>
                          <div className="hidden absolute lg:group-hover:block transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <div className="btn border-none hover:border-none text-white flex items-center gap-1 rounded-lg bg-teal-600 hover:bg-teal-500 p-2 shadow-lg justify-center">
                              <IoEyeSharp />
                              <span>Show Detail</span>
                            </div>
                          </div>
                        </Link>
                        <div className="mt-4 flex p-2 justify-between">
                          <div className="flex-1 flex gap-1 flex-col">
                            <h3 className="text-sm text-gray-700">
                              <Link to={`/products/${product.uuid}`}>
                                <span aria-hidden="true" className="" />
                                {product.name}
                              </Link>
                            </h3>
                            <div className="flex gap-1">
                              {product.stock?.map((ps) => (
                                <div
                                  className={classNames(
                                    ps.color,
                                    "h-5 w-5 rounded-full border border-black border-opacity-10"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="items-end flex-1 flex-col flex justify-center  text-end">
                            <p className="lg:text-lg lg:font-semibold  text-gray-900">
                              $ {product.price}
                            </p>
                            <div className="flex text-center justfy-center items-center">
                              <ProduckQuickView uuid={product.uuid} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};
export default Products;
