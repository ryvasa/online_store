import React, { useEffect, useState } from "react";
import { MdPerson, MdRemoveRedEye, MdStoreMallDirectory } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  incomeHead,
  ordersHead,
  productsHead,
  smallIncomeHead,
  smallOrdersHead,
  smallProductsHead,
  smallUsersHead,
  usersHead,
} from "../utils/tableHead";
import Alert from "./Alert";

const Table = ({ color, from, data }) => {
  const [head, setHead] = useState(null);
  useEffect(() => {
    if (from === "users") {
      setHead(usersHead);
    } else if (from === "products") {
      setHead(productsHead);
    } else if (from === "orders") {
      setHead(ordersHead);
    } else if (from === "income") {
      setHead(incomeHead);
    } else if (from === "smalltableproducts") {
      setHead(smallProductsHead);
    } else if (from === "smalltableusers") {
      setHead(smallUsersHead);
    } else if (from === "smalltableorders") {
      setHead(smallOrdersHead);
    } else if (from === "smalltableincome") {
      setHead(smallIncomeHead);
    }
  }, [from]);
  return (
    <div className=" bg-white x-h-full w-full overflow-x-auto">
      <div className="m-5  min-h-screen">
        <table className="table w-full shadow-lg">
          {/* head */}
          <thead>
            <tr className={`bg-${color} text-white`}>
              <th className="bg-transparent"></th>
              {head?.map((h, index) => (
                <th className="bg-transparent" key={index}>
                  {h}
                </th>
              ))}
              <th className="bg-transparent"></th>
            </tr>
          </thead>
          <tbody>
            {/* Income*/}
            {from === "income" &&
              data?.map((d, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{d.id}</td>
                  <td>{d.date}</td>
                  <td>{d.username}</td>
                  <td>{d.total}</td>
                  <td>{d.quantity}</td>
                  <td className="flex gap-1">
                    <Link
                      to={`/${from}/${d.id}`}
                      className=" btn-xs normal-case text-white  bg-indigo-600 hover:text-indigo-600 btn-ghost border-none btn"
                    >
                      <MdRemoveRedEye className="mr-1" />
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            {/* User */}
            {from === "users" &&
              data?.map((d, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{d.id}</td>
                  <td>
                    <div className="flex items-center justify-start gap-2 ">
                      {d.img ? (
                        <img
                          src={d.img}
                          className="w-10 h-10 object-cover rounded-full border-2"
                          alt=""
                        />
                      ) : (
                        <MdPerson className="text-gray-400 w-10 h-10 object-cover rounded-full border-2" />
                      )}
                      {d.username}
                    </div>
                  </td>
                  <td>{d.join}</td>
                  <td>{d.email}</td>
                  <td>{d.role}</td>
                  <td>
                    <div className="flex w-full justify-center items-center">
                      <Link
                        to={`/${from}/${d.id}`}
                        className="mr-1  btn-xs normal-case text-white bg-indigo-600 hover:text-indigo-600 btn-ghost border-none btn"
                      >
                        <MdRemoveRedEye className="mr-1" />
                        Detail
                      </Link>
                      <Alert from={from} />{" "}
                    </div>
                  </td>
                </tr>
              ))}

            {/* Products */}
            {from === "products" &&
              data?.map((d, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{d.id}</td>
                  <td>
                    <div className="flex items-center justify-start gap-2 ">
                      {d.img ? (
                        <img
                          src={d.img}
                          className="w-10 h-10 object-cover rounded-full border-2"
                          alt=""
                        />
                      ) : (
                        <MdStoreMallDirectory className="text-gray-400 w-10 h-10 object-cover rounded-full border-2" />
                      )}
                      {d.productname}
                    </div>
                  </td>
                  <td>{d.price}</td>
                  <td>{d.stock}</td>
                  <td>{d.sold}</td>
                  <td>
                    <div className="flex w-full justify-center items-center">
                      <Link
                        to={`/${from}/${d.id}`}
                        className="mr-1  btn-xs normal-case text-white bg-indigo-600 hover:text-indigo-600 btn-ghost border-none btn"
                      >
                        <MdRemoveRedEye className="mr-1" />
                        Detail
                      </Link>
                      <Alert from={from} />{" "}
                    </div>
                  </td>
                </tr>
              ))}
            {/* Orders*/}
            {from === "orders" &&
              data?.map((d, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{d.date}</td>
                  <td>{d.username}</td>
                  <td>{d.total}</td>
                  <td>{d.quantity}</td>
                  {(d.status === "success" && (
                    <td>
                      <div className="badge badge-success">{d.status}</div>
                    </td>
                  )) ||
                    (d.status === "failed" && (
                      <td>
                        <div className="badge badge-error">{d.status}</div>
                      </td>
                    )) ||
                    (d.status === "proccess" && (
                      <td>
                        <div className="badge badge-info">{d.status}</div>
                      </td>
                    ))}
                  <td>
                    <div className="flex w-full justify-center items-center">
                      <Link
                        to={`/${from}/${d.id}`}
                        className="mr-1 btn-xs normal-case text-white  bg-indigo-600 hover:text-indigo-600 btn-ghost border-none btn"
                      >
                        <MdRemoveRedEye className="mr-1" />
                        Detail
                      </Link>
                      <Alert from={from} />{" "}
                    </div>
                  </td>
                </tr>
              ))}

            {/* smalltableusers */}
            {from === "smalltableusers" &&
              data?.map((d, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center justify-start gap-2 ">
                      {d.img ? (
                        <img
                          src={d.img}
                          className="w-8 h-8 object-cover rounded-full border-2"
                          alt=""
                        />
                      ) : (
                        <MdPerson className="text-gray-400 w-8 h-8 object-cover rounded-full border-2" />
                      )}
                      {d.username}
                    </div>
                  </td>
                  <td>{d.join}</td>
                  <td>
                    <Link
                      to={`/${"users"}/${d.id}`}
                      className=" btn-xs normal-case text-white bg-amber-400 hover:bg-amber-500 border-none btn"
                    >
                      <MdRemoveRedEye className="mr-1" />
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            {/* smalltableproducts */}
            {from === "smalltableproducts" &&
              data?.map((d, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center justify-start gap-2 ">
                      {d.img ? (
                        <img
                          src={d.img}
                          className="w-8 h-8 object-cover rounded-full border-2"
                          alt=""
                        />
                      ) : (
                        <MdStoreMallDirectory className="text-gray-400 w-8 h-8 object-cover rounded-full border-2" />
                      )}
                      {d.productname}
                    </div>
                  </td>
                  <td>{d.price}</td>
                  <td>{d.stock}</td>
                  <td>
                    <Link
                      to={`/${"products"}/${d.id}`}
                      className=" btn-sm normal-case text-white bg-green-500 hover:bg-green-400 border-none btn"
                    >
                      <MdRemoveRedEye className="mr-1" />
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            {/* smalltableincomes*/}
            {from === "smalltableincome" &&
              data?.map((d, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{d.date}</td>
                  <td>{d.total}</td>
                  <td>{d.quantity}</td>
                  <td>
                    <Link
                      to={`/${"income"}/${d.id}`}
                      className=" btn-sm normal-case text-white bg-indigo-600 hover:bg-indigo-500 border-none btn"
                    >
                      <MdRemoveRedEye className="mr-1" />
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            {/* {smalltableorders} */}
            {from === "smalltableorders" &&
              data?.map((d, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{d.date}</td>
                  <td>{d.total}</td>
                  <td>{d.quantity}</td>
                  <td>
                    <Link
                      to={`/${"orders"}/${d.id}`}
                      className=" btn-xs normal-case text-white bg-red-600 hover:bg-red-500 border-none btn"
                    >
                      <MdRemoveRedEye className="mr-1" />
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
