import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 4,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];

const ProductsComponent = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-300 w-full lg:pt-5">
      <div className="mx-auto max-w-2xl lg:py-10 px-4  sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex pb-5 justify-center items-center">
          <h2 className="text-2xl  font-bold tracking-tight text-gray-900">
            New Product
          </h2>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative shadow-lg rounded-lg bg-white"
            >
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex p-2 justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <div className="">
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                  <Link
                    to={`/products/:id`}
                    className="tooltip tooltip-bottom flex items-center justify-center text-teal-600"
                    data-tip="show detail"
                  >
                    <IoEyeSharp />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProductsComponent;
