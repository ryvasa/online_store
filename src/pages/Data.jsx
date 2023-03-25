import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { MdPersonAdd, MdSearch, MdStoreMallDirectory } from "react-icons/md";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { refreshToken } from "../utils/refreshToken";
import { useSelector } from "react-redux";

const Users = () => {
  const [data, setData] = useState([]);
  const urlPath = window.location.pathname;
  const path = urlPath.substring(urlPath.lastIndexOf("/") + 1);
  const [search, setSearch] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [result, setResult] = useState("");
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(null);
  const alert = useSelector((state) => state.alert.alertStatus);

  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/${path}?search=${search}&page=${page}`
      );
      setData(res.data.result);
      setResult(res.data.totalRows);
      setTotalPage(res.data.totalPage);
      setLimit(res.data.limit);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refreshToken().then(() => {
      getData();
    });

    if (path === "users") {
      setPlaceholder("username or email");
    } else if (path === "products") {
      setPlaceholder("product name");
    } else if (path === "orders") {
      setPlaceholder("username, address, city or country");
    } else {
      setPlaceholder("username");
    }
  }, [path, search, page, alert]);
  return (
    <Layout>
      <div className="flex-[5] overflow-y-auto h-screen pb-16 pt-3 w-full">
        <div className="w-full flex justify-between px-5">
          <div className="flex w-1/2 py-2 justify-between border-b-2 border-indigo-600">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="outline-none border-none w-full"
              placeholder={`Find ${path} with ${placeholder}`}
            />
            <MdSearch className="text-indigo-600 w-6 h-6" />
          </div>
          {(path === "products" && (
            <Link
              to={"/products/add"}
              className="flex items-center justify-center"
            >
              <button className="btn btn-sm bg-green-500 border-none  hover:bg-green-500 text-white">
                <>
                  <MdStoreMallDirectory className="w-6 h-6 pr-1" />
                  Add Product
                </>
              </button>
            </Link>
          )) ||
            (path == "users" && (
              <Link
                to={"/add/user"}
                className="flex items-center justify-center"
              >
                <button className="btn btn-sm bg-green-500 border-none  hover:bg-green-500 text-white">
                  <>
                    <MdPersonAdd className="w-6 h-6 pr-1" />
                    Add User
                  </>
                </button>
              </Link>
            ))}
        </div>
        <div className="m-5">
          <Table
            color={"indigo-600"}
            from={path}
            data={data}
            page={page}
            limit={limit}
          />
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 pb-5 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={(e) => {
                setPage(page - 1);
              }}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={(e) => {
                setPage(page + 1);
              }}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {page === 0 ? 1 : 1 + page * limit}
                </span>{" "}
                to <span className="font-medium">{data.length}</span> of{" "}
                <span className="font-medium">{result}</span> results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={(e) => {
                    setPage(page - 1);
                  }}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>

                <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  {page - 1 < 0 ? "" : page}
                </button>
                <button
                  aria-current="page"
                  className={`relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {page + 1}
                </button>
                <button className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">
                  {page + 1 === totalPage ? "" : page + 2}
                </button>
                <button
                  onClick={(e) => {
                    setPage(page + 1);
                  }}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
