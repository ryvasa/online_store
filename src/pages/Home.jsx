import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import Chart from "../components/Chart";
import { MdLocalAtm, MdPerson, MdStoreMallDirectory } from "react-icons/md";
import Table from "../components/Table";
import { refreshToken } from "../utils/refreshToken";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const id = useSelector((state) => state?.user?.currentUser?.uuid);
  const [dataTransactions, setDataTransactions] = useState([]);
  const [dataProducts, setDataProducts] = useState([]);
  if (!id) {
    navigate("/signin");
  }
  const monthName = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DES",
  ];
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    refreshToken().then(() => {
      getTransactions();
      getUsers();
      getProducts();
      getOrders();
      getDataTransactions();
      getDataProducts();
    });
  }, []);
  const getTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/transactions/stats`
      );
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/stats`);

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/stats`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/orders/stats`);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const combinedData = monthName.map((bulan, index) => {
    const product = products[index] || { total: 0 };
    const user = users[index] || { total: 0 };
    const order = orders[index] || { total: 0 };
    const transaction = transactions[index] || { totalPrice: 0 };
    return {
      name: bulan,
      products: product.Sold_Product,
      users: user.New_Join_User,
      transactions: transaction.Total_Income / 100,
      orders: order.Total_Order,
    };
  });
  const getDataTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/transactions");
      setDataTransactions(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products");
      setDataProducts(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div className="flex-[5] overflow-y-auto h-screen pb-16 pt-3 w-full">
          <div className="flex w-full justify-center h-2/3">
            <Chart from={"home"} data={combinedData} />
          </div>
          <div className="flex gap-5 justify-center py-5 ">
            <div className="stats shadow-lg">
              <div className="stat bg-indigo-600 text-white">
                <div className="stat-figure text-white">
                  <MdLocalAtm className="w-8 h-8" />
                </div>
                <div className="text-white stat-title">Income</div>
                <div className="text-white stat-value">
                  $ {transactions[transactions?.length - 1]?.Total_Income}
                </div>
                <div className="text-white text-md">
                  {((transactions[transactions?.length - 1]?.Total_Income -
                    transactions[transactions?.length - 2]?.Total_Income) /
                    2) *
                    100 >
                  0
                    ? "↗︎"
                    : "↘︎"}{" "}
                  {transactions[transactions?.length - 1]?.Total_Income -
                    transactions[transactions?.length - 2]?.Total_Income}{" "}
                  (
                  {(
                    ((transactions[transactions?.length - 1]?.Total_Income -
                      transactions[transactions?.length - 2]?.Total_Income) /
                      transactions[transactions?.length - 2]?.Total_Income) *
                    100
                  ).toFixed(1)}
                  %)
                </div>
              </div>

              <div className="stat bg-amber-400">
                <div className="stat-figure text-white">
                  <MdPerson className="w-8 h-8" />
                </div>
                <div className="text-white stat-title">New Users</div>
                <div className="text-white stat-value">
                  {users[users?.length - 1]?.New_Join_User}
                </div>
                <div className="text-white text-md">
                  {((users[users?.length - 1]?.New_Join_User -
                    users[users?.length - 2]?.New_Join_User) /
                    users[users?.length - 2]?.New_Join_User) *
                    100 >
                  0
                    ? "↗︎"
                    : "↘︎"}{" "}
                  {users[users?.length - 1]?.New_Join_User -
                    users[users?.length - 2]?.New_Join_User}{" "}
                  (
                  {(
                    ((users[users?.length - 1]?.New_Join_User -
                      users[users?.length - 2]?.New_Join_User) /
                      users[users?.length - 2]?.New_Join_User) *
                    100
                  ).toFixed(1)}
                  %)
                </div>
              </div>
              <div className="stat bg-green-500">
                <div className="stat-figure  text-white">
                  <MdStoreMallDirectory className="w-8 h-8" />
                </div>
                <div className="text-white stat-title">Sold Products</div>
                <div className="text-white stat-value">
                  {products[products.length - 1]?.Sold_Product}
                </div>
                <div className="text-white text-md">
                  {((products[products.length - 1]?.Sold_Product -
                    products[products.length - 2]?.Sold_Product) /
                    products[products.length - 2]?.Sold_Product) *
                    100 >
                  0
                    ? "↗︎"
                    : "↘︎"}{" "}
                  {products[products.length - 1]?.Sold_Product -
                    products[products.length - 2]?.Sold_Product}{" "}
                  ({" "}
                  {(
                    ((products[products.length - 1]?.Sold_Product -
                      products[products.length - 2]?.Sold_Product) /
                      products[products.length - 2]?.Sold_Product) *
                    100
                  ).toFixed(1)}
                  %)
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full items-start justify-center pt-10">
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-xl w-full text-center font-bold text-gray-700">
                Last Transaction
              </div>
              <div className="m-5 overflow-y-scroll h-96">
                <Table
                  color={"indigo-600"}
                  from={"smalltabletransactions"}
                  data={dataTransactions.slice(0, 5)}
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-xl w-full text-center font-bold text-gray-700">
                Best Seller Products
              </div>
              <div className="m-5 overflow-y-scroll h-96">
                <Table
                  color={"green-500"}
                  from={"smalltableproducts"}
                  data={dataProducts.slice(0, 5)}
                />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    </>
  );
};

export default Home;
