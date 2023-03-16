import React, { useEffect, useState } from "react";
import { MdPersonAdd, MdSearch, MdStoreMallDirectory } from "react-icons/md";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import { users, products, orders } from "../dummyData";

const Users = () => {
  const [data, setData] = useState([]);
  const urlPath = window.location.pathname;
  const path = urlPath.substring(urlPath.lastIndexOf("/") + 1);
  const [color, setColor] = useState("");
  useEffect(() => {
    // Assign different border color class based on the path
    if (path === "users") {
      setData(users);
    } else if (path === "products") {
      setData(products);
    } else if (path === "orders") {
      setData(orders);
    } else if (path === "income") {
      setData(orders);
    }
  }, [path]);
  return (
    <Layout>
      <div className="flex-[5] overflow-y-auto h-screen pb-16 pt-3 w-full">
        <div className="w-full flex justify-between px-5">
          <div className="flex w-1/3 py-2 justify-between border-b-2 border-indigo-600">
            <input
              type="text"
              className="outline-none border-none"
              placeholder={`Search ${path}`}
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
                to={"/users/add"}
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
        <Table color={"indigo-600"} from={path} data={data} />
        <Pagination color={color} />
        <Footer />
      </div>
    </Layout>
  );
};

export default Users;
