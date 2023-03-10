import React from "react";
import Chart from "../components/Chart";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { products, users, orders } from "../dummyData";

const Statistics = () => {
  return (
    <Layout>
      <div className="flex-[5] overflow-y-auto relative pt-3 w-full h-screen flex-col flex pb-16">
        <div className=" w-full h-full py-3">
          <div className="text-center w-full flex justify-center pb-3">
            <span className="text-2xl font-bold text-indigo-600">Income</span>
          </div>
          <div className="lg:flex-row flex-col flex w-full justify-center full h-full pb-20">
            <div className="h-full flex-1 w-full">
              <div className="text-xl w-full text-center font-bold text-gray-800 pb-5">
                Income Statistics
              </div>
              <div className="h-4/5 w-full">
                <Chart from={"income"} />
              </div>
            </div>
            <div className="flex-1 h-full overflow-hidden">
              <div className="text-xl w-full text-center font-bold text-gray-800">
                Last transaction
              </div>
              <Table
                color={"indigo-600"}
                from={"smalltableincome"}
                data={orders}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="border w-full mx-5" />{" "}
        </div>
        <div className=" w-full h-full py-3">
          <div className="text-center w-full flex justify-center pb-3">
            <span className="text-2xl font-bold text-red-600">Orders</span>
          </div>
          <div className="lg:flex-row-reverse flex-col flex w-full justify-center full h-full pb-20">
            <div className="h-full flex-1 w-full ">
              <div className="text-xl w-full text-center font-bold text-gray-800 pb-5">
                Order Statistics
              </div>
              <div className="h-4/5 w-full">
                <Chart from={"orders"} />
              </div>
            </div>
            <div className="flex-1 h-full overflow-hidden">
              <div className="text-xl w-full text-center font-bold text-gray-800">
                Last incomming orders
              </div>
              <Table
                color={"red-600"}
                from={"smalltableorders"}
                data={orders}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="border w-full mx-5" />{" "}
        </div>
        <div className=" w-full h-full py-3">
          <div className="text-center w-full flex justify-center pb-3">
            <span className="text-2xl font-bold text-green-500">Products</span>
          </div>
          <div className="lg:flex-row flex-col flex w-full justify-center full h-full pb-20">
            <div className="h-full flex-1 w-full ">
              <div className="text-xl w-full text-center font-bold text-gray-800 pb-5">
                Product Statistics
              </div>
              <div className="h-4/5 w-full">
                <Chart from={"products"} />
              </div>
            </div>
            <div className="flex-1 h-full overflow-hidden">
              <div className="text-xl w-full text-center font-bold text-gray-800">
                Best Seller Products
              </div>
              <Table
                color={"green-500"}
                from={"smalltableproducts"}
                data={products}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="border w-full mx-5" />{" "}
        </div>
        <div className=" w-full h-full py-3">
          <div className="text-center w-full flex justify-center pb-3">
            <span className="text-2xl font-bold text-amber-400">Users</span>
          </div>
          <div className="lg:flex-row-reverse flex-col flex w-full justify-center full h-full pb-20">
            <div className="h-full flex-1 w-full ">
              <div className="text-xl w-full text-center font-bold text-gray-800 pb-5">
                Users Statistics
              </div>
              <div className="h-4/5 w-full">
                <Chart from={"users"} />
              </div>
            </div>
            <div className="flex-1 h-full overflow-hidden">
              <div className="text-xl w-full text-center font-bold text-gray-800">
                Latest join users
              </div>
              <Table
                color={"amber-400"}
                from={"smalltableusers"}
                data={users}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default Statistics;
