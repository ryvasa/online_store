import React from "react";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Chart from "../components/Chart";
import { MdLocalAtm, MdPerson, MdStoreMallDirectory } from "react-icons/md";
import Table from "../components/Table";
import { orders, products } from "../dummyData";

const Home = () => {
  return (
    <>
      <Layout>
        <div className="flex-[5] overflow-y-auto h-screen pb-16 pt-3 w-full">
          <div className="flex w-full justify-center h-2/3">
            <Chart from={"home"} />
          </div>
          <div className="flex gap-5 justify-center py-5 ">
            <div className="stats shadow-lg">
              <div className="stat bg-indigo-600 text-white">
                <div className="stat-figure text-white">
                  <MdLocalAtm className="w-8 h-8" />
                </div>
                <div className="text-white stat-title">Income</div>
                <div className="text-white stat-value">31K</div>
                <div className="text-white stat-desc">Jan 1st - Feb 1st</div>
              </div>

              <div className="stat bg-amber-400">
                <div className="stat-figure text-white">
                  <MdPerson className="w-8 h-8" />
                </div>
                <div className="text-white stat-title">New Users</div>
                <div className="text-white stat-value">4,200</div>
                <div className="text-white stat-desc">↗︎ 400 (22%)</div>
              </div>

              <div className="stat bg-green-500">
                <div className="stat-figure  text-white">
                  <MdStoreMallDirectory className="w-8 h-8" />
                </div>
                <div className="text-white stat-title">Sold Products</div>
                <div className="text-white stat-value">1,200</div>
                <div className="text-white stat-desc">↘︎ 90 (14%)</div>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center pt-10">
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-xl w-full text-center font-bold text-gray-700">
                New Join Users
              </div>
              <Table
                color={"indigo-600"}
                from={"smalltableincome"}
                data={orders}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-xl w-full text-center font-bold text-gray-700">
                Best Seller Products
              </div>
              <Table
                color={"green-500"}
                from={"smalltableproducts"}
                data={products}
              />
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    </>
  );
};

export default Home;
