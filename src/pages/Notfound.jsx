import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <>
      <main className="grid  place-items-center bg-white py-24 px-6 sm:py-32 relative lg:px-8 h-screen w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute top-0 shadow-sm"
        >
          <path
            fill="#0D9488"
            fill-opacity="1"
            d="M0,256L12.6,245.3C25.3,235,51,213,76,170.7C101.1,128,126,64,152,80C176.8,96,202,192,227,240C252.6,288,278,288,303,240C328.4,192,354,96,379,58.7C404.2,21,429,43,455,42.7C480,43,505,21,531,58.7C555.8,96,581,192,606,224C631.6,256,657,224,682,181.3C707.4,139,733,85,758,85.3C783.2,85,808,139,834,170.7C858.9,203,884,213,909,192C934.7,171,960,117,985,85.3C1010.5,53,1036,43,1061,85.3C1086.3,128,1112,224,1137,240C1162.1,256,1187,192,1213,170.7C1237.9,149,1263,171,1288,176C1313.7,181,1339,171,1364,192C1389.5,213,1415,267,1427,293.3L1440,320L1440,0L1427.4,0C1414.7,0,1389,0,1364,0C1338.9,0,1314,0,1288,0C1263.2,0,1238,0,1213,0C1187.4,0,1162,0,1137,0C1111.6,0,1086,0,1061,0C1035.8,0,1011,0,985,0C960,0,935,0,909,0C884.2,0,859,0,834,0C808.4,0,783,0,758,0C732.6,0,707,0,682,0C656.8,0,632,0,606,0C581.1,0,556,0,531,0C505.3,0,480,0,455,0C429.5,0,404,0,379,0C353.7,0,328,0,303,0C277.9,0,253,0,227,0C202.1,0,177,0,152,0C126.3,0,101,0,76,0C50.5,0,25,0,13,0L0,0Z"
          ></path>
        </svg>
        <div className="w-full h-full items-center relative z-10 flex justify-center">
          <div className="text-center">
            <p className="text-base font-semibold text-teal-600">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to={"/"}
                className="rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                Go back home
              </Link>
              <Link to={"/"} className="text-sm font-semibold text-gray-900">
                Contact support <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Notfound;
