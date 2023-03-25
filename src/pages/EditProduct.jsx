import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Footer from "../components/Footer";
import { MdImage, MdOutlineUpload } from "react-icons/md";
import Layout from "../components/Layout";
import { handleClickUpdateProduct } from "../utils/imageUpload";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const categories = [
  "men",
  "women",
  "hat",
  "shoes",
  "casual",
  "tshirt",
  "sport",
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
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

const AddProduct = () => {
  const [product, setProduct] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedCat, setSelectedCat] = useState([]);
  const [files, setFiles] = useState([]);
  const [inputs, setInputs] = useState({});
  const [inputsStock, setInputsStock] = useState(null);
  const [previews, setPreviews] = useState([]);
  const [message, setMessage] = useState("");
  const [stockMessage, setStockMessage] = useState("");
  const [stock, setStock] = useState([]);
  const { id } = useParams();
  const loadImage = (e) => {
    const images = e.target.files;
    setFiles([...files, ...images]);
    const previewsArray = Array.from(images).map((image) =>
      URL.createObjectURL(image)
    );
    setPreviews([...previews, ...previewsArray]);
  };
  const handleCat = (event) => {
    const value = event.target.value;
    const currentIndex = selectedCat.indexOf(value);
    const newSelectedCheckboxes = [...selectedCat];
    if (currentIndex === -1) {
      newSelectedCheckboxes.push(value);
    } else {
      newSelectedCheckboxes.splice(currentIndex, 1);
    }
    setSelectedCat(newSelectedCheckboxes);
  };
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const addStock = () => {
    const existingStockIndex = stock.findIndex(
      (item) => item.color === selectedColor && item.size === selectedSize
    );

    if (existingStockIndex >= 0) {
      const existingStock = stock[existingStockIndex];
      const updatedStock = {
        ...existingStock,
        stock: existingStock.stock + parseInt(inputsStock),
      };
      if (inputsStock && selectedColor && selectedSize) {
        setStock([
          ...stock.slice(0, existingStockIndex),
          updatedStock,
          ...stock.slice(existingStockIndex + 1),
        ]);
        setStockMessage("");
      } else {
        setStockMessage("Color, size and stock is required");
        return;
      }
    } else {
      // Kombinasi warna dan ukuran belum ada di dalam daftar stock
      if (inputsStock && selectedColor && selectedSize) {
        setStock([
          ...stock,
          {
            stock: parseInt(inputsStock),
            color: selectedColor,
            size: selectedSize,
          },
        ]);
        setStockMessage("");
      } else {
        setStockMessage("Color, size and stock is required");
        return;
      }
    }
  };
  const price = inputs.price ? parseInt(inputs.price) : product.price;
  const selectedCategories =
    selectedCat.length !== 0 ? selectedCat : product.categories;
  const data = {
    ...inputs,
    price: price,

    categories: selectedCategories,
  };
  const handleClick = () => {
    const endpoint = "products";
    handleClickUpdateProduct(endpoint, files, data, handleCallback, id, stock);
  };
  const handleCallback = (response) => {
    setMessage(response.data.message);
  };
  const getProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      setProduct(response.data);
      setStock(response.data.stock);
      console.log(response.data.stock);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
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
                    src={
                      previews[0]
                        ? previews[0]
                        : product.img
                        ? product.img[0]
                        : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                    }
                    alt=""
                    className="w-96 h-96  object-cover"
                  />
                  <div className="flex w-full px-10 py-5 justify-center absolute bottom-0 backdrop-blur-sm rounded-t-full shadow-lg">
                    <div className="flex-1 w-full flex  justify-center">
                      <input
                        type="file"
                        onChange={loadImage}
                        id="img"
                        style={{ display: "none" }}
                        multiple
                      />
                      <label
                        htmlFor="img"
                        className="flex gap-1 btn btn-sm justify-center border-none bg-indigo-600  text-white shadow-xl hover:bg-indigo-600"
                      >
                        <MdImage />
                        <span>Change Image</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block relative">
                  <img
                    src={
                      previews[1]
                        ? previews[1]
                        : product.img
                        ? product.img[1]
                        : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                    }
                    alt=""
                    className="w-96 h-96  object-cover"
                  />
                  <div className="flex w-full px-10 py-5 justify-center absolute bottom-0 backdrop-blur-sm rounded-t-full shadow-lg">
                    <div className="flex-1 w-full flex  justify-center">
                      <input
                        type="file"
                        onChange={loadImage}
                        id="img"
                        style={{ display: "none" }}
                      />
                      <label
                        htmlFor="img"
                        className="flex gap-1 btn btn-sm justify-center border-none bg-indigo-600  text-white shadow-xl hover:bg-indigo-600"
                      >
                        <MdImage />
                        <span>Change Image</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4 relative">
                  <img
                    src={
                      previews[2]
                        ? previews[2]
                        : product.img
                        ? product.img[2]
                        : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                    }
                    alt=""
                    className="w-96 h-96  object-cover"
                  />
                  <div className="flex w-full px-10 py-5 justify-center absolute bottom-0 backdrop-blur-sm rounded-t-full shadow-lg">
                    <div className="flex-1 w-full flex  justify-center">
                      <input
                        type="file"
                        onChange={loadImage}
                        id="img"
                        style={{ display: "none" }}
                      />
                      <label
                        htmlFor="img"
                        className="flex gap-1 btn btn-sm justify-center border-none bg-indigo-600  text-white shadow-xl hover:bg-indigo-600"
                      >
                        <MdImage />
                        <span>Change Image</span>
                      </label>
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
                      name="name"
                      onChange={handleChange}
                      type="text"
                      placeholder={product.name}
                      className="bg-transparent outline-none border-b flex-1"
                    />
                  </div>
                  <div className="flex w-full gap-3">
                    <div className="flex justify-between  text-md font-medium border-b border-transparent flex-1">
                      <span>Price</span>
                      <span>:</span>
                    </div>
                    <input
                      name="price"
                      onChange={handleChange}
                      type="number"
                      placeholder={`$ ${product.price}`}
                      className="bg-transparent outline-none border-b flex-1"
                    />
                  </div>
                  <div className="flex w-full gap-3">
                    <div className="flex justify-between  text-md font-medium border-b border-transparent flex-1">
                      <span>Description</span>
                      <span>:</span>
                    </div>
                    <input
                      name="desc"
                      onChange={handleChange}
                      type="text"
                      placeholder={product.desc}
                      className="bg-transparent outline-none border-b flex-1"
                    />
                  </div>
                  <div className="flex w-full gap-3">
                    <div className="flex justify-between  text-md font-medium border-b border-transparent flex-1">
                      <span>Detail</span>
                      <span>:</span>
                    </div>
                    <input
                      name="detail"
                      onChange={handleChange}
                      type="text"
                      placeholder={product.detail}
                      className="bg-transparent outline-none border-b flex-1"
                    />
                  </div>
                  <div className="flex flex-col w-full gap-3">
                    <div className="flex justify-between  text-md font-medium border-b border-transparent flex-1">
                      <span>Category</span>
                    </div>
                    <div className="w-full grid grid-cols-2">
                      {categories.map((cat, index) => (
                        <div className="flex gap-3" key={index}>
                          <input
                            type="checkbox"
                            onChange={handleCat}
                            value={cat}
                            multiple
                            name="categories"
                            id="categories"
                            className="checkbox"
                          />
                          <label className="p-1">{cat}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Stock */}
                <div className="flex-1 p-2 border-x">
                  <div className="flex justify-between gap-2">
                    <div className="flex justify-between w-full text-md font-medium ">
                      <span>Total Stock</span>
                      <span>:</span>
                    </div>
                    <div className="flex gap-2 ">
                      <span className="font-bold text-lg">
                        {stock?.reduce((total, item) => {
                          return total + item.stock;
                        }, 0)}
                      </span>
                      <span className="text md font-light">pcs</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    {stock.map((s, index) => (
                      <div
                        className="flex gap-5 items-center border-b p-1"
                        key={index}
                      >
                        <div className="flex-1 flex w-full justify-center">
                          <div className="flex gap-1 w-full justify-between">
                            <span
                              className={classNames(
                                s.color,
                                "h-5 w-5 rounded-full border border-black border-opacity-10"
                              )}
                            />
                            <span>{s.color.split("-")[1]}</span>
                          </div>
                        </div>
                        <div className="border-x px-3 border-gray-300 flex-1 flex w-full justify-center">
                          <div className="border flex p-2 h-9 w-9 rounded-md justify-center items-center">
                            <div className="">{s.size}</div>
                          </div>
                        </div>
                        <div className="justify between  gap-3 flex-1 flex w-full justify-center">
                          <div className="flex justify-between w-1/2">
                            <span>Stock</span>
                            <span>:</span>
                          </div>
                          <div className="flex items-end justify-center gap-1">
                            <span className="font-semibold text-lg">
                              {s.stock}
                            </span>
                            <span className="text-md font-light">pcs</span>
                          </div>
                        </div>
                      </div>
                    ))}
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
                        {colors.map((color, index) => (
                          <RadioGroup.Option
                            key={index}
                            value={color}
                            className={({ active, checked }) =>
                              classNames(
                                color,
                                active && checked ? "ring ring-offset-1" : "",
                                !active && checked ? "ring-2" : "",
                                "relative -m-0.5 flex cursor-pointer items-center h-fit w-fit justify-center rounded-full p-0.5 focus:outline-none"
                              )
                            }
                          >
                            <RadioGroup.Label as="span" className="sr-only">
                              {color}
                            </RadioGroup.Label>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                color.split("-")[1],
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
                        {sizes.map((size, index) => (
                          <RadioGroup.Option
                            key={index}
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
                                  {size}
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
                        onChange={(e) => setInputsStock(e.target.value)}
                        name="stock"
                        type="number"
                        className="bg-transparent outline-none flex-1 border-b"
                        placeholder="stock"
                      />
                    </div>
                  </div>
                  {stockMessage && (
                    <div className="w-full  flex justify-center items-center py-5">
                      <div className="w-11/12 rounded-lg p-2 flex justify-center items-center bg-red-300">
                        <div className="text-red-700">{stockMessage}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex w-full px-10 pt-5 justify-center">
                    <button
                      onClick={addStock}
                      className="flex border-none bg-indigo-600  btn btn-sm font-medium text-white shadow-xl hover:bg-indigo-600"
                    >
                      <MdOutlineUpload className="h-5 w-5" />
                      <span>Add to Stock</span>
                    </button>
                  </div>
                </div>
              </div>
              {message && (
                <Link
                  to={`/products`}
                  className="w-full  flex justify-center items-center py-5"
                >
                  <div className="w-11/12 rounded-lg p-2 flex justify-center items-center bg-green-300">
                    <div className="text-green-700">
                      {message}, <u>Back to products list</u>
                    </div>
                  </div>
                </Link>
              )}
              <div className="flex w-full px-10 pb-5 justify-center">
                <button
                  onClick={handleClick}
                  className="flex gap-1 border-none bg-indigo-600 p-3 btn font-medium text-white shadow-xl hover:bg-indigo-600"
                >
                  <MdOutlineUpload className="h-5 w-5" />
                  <span>Update product</span>
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
export default AddProduct;
