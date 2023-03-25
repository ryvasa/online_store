import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const [catPreview, setCatPreview] = useState([]);
  const getCatPreview = async () => {
    try {
      const response = await axios.get("http://localhost:5000/cat_preview");
      localStorage.setItem("catprev", JSON.stringify(response.data.result));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCatPreview();
    setCatPreview(JSON.parse(localStorage.getItem("catprev")));
  }, []);
  return (
    <div className="bg-gradient-to-b pb-10 from-gray-300 to-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <div className="flex justify-center items-center">
            <h2 className="text-2xl font-bold text-gray-900">Category</h2>
          </div>
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {catPreview?.map((cat) => (
              <div key={cat.uuid} className="group relative w-full shadow-lg">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-25 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <img
                    src={cat.img}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="hidden group-hover:block absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  <div className=" text-md text-gray-800">
                    <Link
                      className="btn border-none bg-teal-600 hover:bg-teal-500 text-white"
                      to={`/products`}
                    >
                      {cat.title}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Category;
