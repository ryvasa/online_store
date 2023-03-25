import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "../components/Chart";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { refreshToken } from "../utils/refreshToken";

const Statistics = () => {
  const [transactions, setTransactions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [transactionChart, setTransactionChart] = useState([]);
  const [orderChart, setOrderChart] = useState([]);
  const [userChart, setUserChart] = useState([]);
  const [productChart, setProductChart] = useState([]);
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Des",
  ];
  const getData = async (endpoint, setState) => {
    try {
      const res = await axios.get(`http://localhost:5000/${endpoint}`);
      setState(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    refreshToken().then(() => {
      getData("users", setUsers);
      getData("products", setProducts);
      getData("orders", setOrders);
      getData("transactions", setTransactions);
      getChart("users", setUserChart);
      getChart("products", setProductChart);
      getChart("orders", setOrderChart);
      getChart("transactions", setTransactionChart);
    });
  }, []);
  const getChart = async (endpoint, setState) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/${endpoint}/stats`
      );
      setState(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const combinedData = monthName.map((bulan, index) => {
    const product = productChart[index] || { total: 0 };
    const user = userChart[index] || { total: 0 };
    const order = orderChart[index] || { total: 0 };
    const transaction = transactionChart[index] || { totalPrice: 0 };
    return {
      name: bulan,
      products: product.Sold_Product,
      users: user.New_Join_User,
      transactions: transaction.Total_Income / 100,
      orders: order.Total_Order,
    };
  });
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
                <Chart from={"transactions"} data={combinedData} />
              </div>
            </div>
            <div className="flex-1 h-full overflow-hidden">
              <div className="text-xl w-full text-center font-bold text-gray-800">
                Last transaction
              </div>
              <div className="h-96 m-5">
                <Table
                  color={"indigo-600"}
                  from={"smalltabletransactions"}
                  data={transactions.slice(0, 5)}
                />
              </div>
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
                <Chart from={"orders"} data={combinedData} />
              </div>
            </div>
            <div className="flex-1 h-full overflow-hidden">
              <div className="text-xl w-full text-center font-bold text-gray-800">
                Last incomming orders
              </div>
              <div className="h-96 m-5">
                <Table
                  color={"red-600"}
                  from={"smalltableorders"}
                  data={orders.slice(0, 5)}
                />
              </div>
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
                <Chart from={"products"} data={combinedData} />
              </div>
            </div>
            <div className="flex-1 h-full overflow-hidden">
              <div className="text-xl w-full text-center font-bold text-gray-800">
                Best Seller Products
              </div>
              <div className="h-96 m-5">
                <Table
                  color={"green-500"}
                  from={"smalltableproducts"}
                  data={products.slice(0, 5)}
                />
              </div>
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
                <Chart from={"users"} data={combinedData} />
              </div>
            </div>
            <div className="flex-1 h-full overflow-hidden">
              <div className="text-xl w-full text-center font-bold text-gray-800">
                Latest join users
              </div>
              <div className="h-96 m-5">
                <Table
                  color={"amber-400"}
                  from={"smalltableusers"}
                  data={users.slice(0, 5)}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default Statistics;
