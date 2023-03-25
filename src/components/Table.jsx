import React, { useEffect, useState } from "react";
import { MdPerson, MdRemoveRedEye, MdStoreMallDirectory } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  transactionsHead,
  ordersHead,
  productsHead,
  smallTransactionsHead,
  smallOrdersHead,
  smallProductsHead,
  smallUsersHead,
  usersHead,
} from "../utils/tableHead";
import Alert from "./Alert";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Table = ({ color, from, data, page, limit }) => {
  const [head, setHead] = useState(null);
  useEffect(() => {
    if (from === "users") {
      setHead(usersHead);
    } else if (from === "products") {
      setHead(productsHead);
    } else if (from === "orders") {
      setHead(ordersHead);
    } else if (from === "transactions") {
      setHead(transactionsHead);
    } else if (from === "smalltableproducts") {
      setHead(smallProductsHead);
    } else if (from === "smalltableusers") {
      setHead(smallUsersHead);
    } else if (from === "smalltableorders") {
      setHead(smallOrdersHead);
    } else if (from === "smalltabletransactions") {
      setHead(smallTransactionsHead);
    }
  }, [from]);
  dayjs.extend(relativeTime);
  return (
    <div className=" bg-white w-full overflow-x-auto">
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
          {from === "transactions" &&
            data?.map((d, index) => (
              <tr key={index}>
                <th>{page * limit + index + 1}</th>
                <td>{d.uuid}</td>
                <td>
                  {dayjs(d.createdAt)
                    .locale("id")
                    .format("dddd, DD MMMM YYYY, HH:mm:ss")}
                </td>
                <td>{d.name}</td>
                <td>$ {d.order?.totalPrice}</td>
                <td>
                  <div className="flex w-full justify-center items-center">
                    <Link
                      to={`/${from}/${d.uuid}`}
                      className="mr-1  btn-xs normal-case text-white bg-indigo-600 hover:text-indigo-600 btn-ghost border-none btn"
                    >
                      <MdRemoveRedEye className="mr-1" />
                      Detail
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          {/* User */}
          {from === "users" &&
            data?.map((d, index) => (
              <tr key={index}>
                <th>{page * limit + index + 1}</th>
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
                    {d.name}
                  </div>
                </td>
                <td>
                  {dayjs(d.createdAt)
                    .locale("id")
                    .format("dddd, DD MMMM YYYY, HH:mm:ss")}
                </td>
                <td>{d.email}</td>
                <td>{d.role}</td>
                <td>
                  <div className="flex w-full justify-center items-center">
                    <Link
                      to={`/${from}/${d.uuid}`}
                      className="mr-1  btn-xs normal-case text-white bg-indigo-600 hover:text-indigo-600 btn-ghost border-none btn"
                    >
                      <MdRemoveRedEye className="mr-1" />
                      Detail
                    </Link>
                    <Alert id={d.uuid} from={from} />{" "}
                  </div>
                </td>
              </tr>
            ))}

          {/* Products */}
          {from === "products" &&
            data?.map((d, index) => (
              <tr key={index}>
                <th>{page * limit + index + 1}</th>
                <td>{d.uuid}</td>
                <td>
                  <div className="flex items-center justify-start gap-2 ">
                    {d.img && d.img.length !== 0 ? (
                      <img
                        src={d?.img[0]}
                        className="w-10 h-10 object-cover rounded-full border-2"
                        alt=""
                      />
                    ) : (
                      <MdStoreMallDirectory className="text-gray-400 w-10 h-10 object-cover rounded-full border-2" />
                    )}
                    {d.name}
                  </div>
                </td>
                <td>$ {d.price}</td>
                <td>
                  {d.stock?.reduce((acc, curr) => acc + curr.stock, 0)} pcs
                </td>
                <td>{d.sold} pcs</td>
                <td>
                  <div className="flex w-full justify-center items-center">
                    <Link
                      to={`/${from}/${d.uuid}`}
                      className="mr-1  btn-xs normal-case text-white bg-indigo-600 hover:text-indigo-600 btn-ghost border-none btn"
                    >
                      <MdRemoveRedEye className="mr-1" />
                      Detail
                    </Link>
                    <Alert from={from} id={d.uuid} />{" "}
                  </div>
                </td>
              </tr>
            ))}
          {/* Orders*/}
          {from === "orders" &&
            data?.map((d, index) => (
              <tr key={index}>
                <th>{page * limit + index + 1}</th>
                <td>
                  {dayjs(d.createdAt)
                    .locale("id")
                    .format("dddd, DD MMMM YYYY, HH:mm:ss")}
                </td>
                <td>{d.name}</td>
                <td>$ {d.totalPrice}</td>
                <td>{d.totalQuantity} pcs</td>
                {(d.status === "success" && (
                  <td>
                    <div className="badge text-white badge-success">
                      {d.status}
                    </div>
                  </td>
                )) ||
                  (d.status === "failed" && (
                    <td>
                      <div className="badge text-white badge-error">
                        {d.status}
                      </div>
                    </td>
                  )) ||
                  (d.status === "proccess" && (
                    <td>
                      <div className="badge text-white badge-info">
                        {d.status}
                      </div>
                    </td>
                  ))}
                <td>
                  <div className="flex w-full justify-center items-center">
                    <Link
                      to={`/${from}/${d.uuid}`}
                      className="mr-1 btn-xs normal-case text-white  bg-indigo-600 hover:text-indigo-600 btn-ghost border-none btn"
                    >
                      <MdRemoveRedEye className="mr-1" />
                      Detail
                    </Link>
                    <Alert from={from} id={d.uuid} />{" "}
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
                    {d.name}
                  </div>
                </td>
                <td>{dayjs(d.createdAt).fromNow()}</td>
                <td>
                  <Link
                    to={`/${"users"}/${d.uuid}`}
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
                    {d.img && d.img.length !== 0 ? (
                      <img
                        src={d?.img[0]}
                        className="w-8 h-8 object-cover rounded-full border-2"
                        alt=""
                      />
                    ) : (
                      <MdStoreMallDirectory className="text-gray-400 w-8 h-8 object-cover rounded-full border-2" />
                    )}
                    {d.name}
                  </div>
                </td>
                <td>$ {d.price}</td>
                <td>
                  {d.stock?.reduce((acc, curr) => acc + curr.stock, 0)} pcs
                </td>
                <td>
                  <Link
                    to={`/${"products"}/${d.uuid}`}
                    className=" btn-sm normal-case text-white bg-green-500 hover:bg-green-400 border-none btn"
                  >
                    <MdRemoveRedEye className="mr-1" />
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          {/* smalltableincomes*/}
          {from === "smalltabletransactions" &&
            data?.map((d, index) => (
              <tr key={index}>
                <th>{index + 1}</th> <td>{dayjs(d.createdAt).fromNow()}</td>
                <td>$ {d.order?.totalPrice}</td>
                <td>
                  {d.order?.totalQuantity}
                  <span className="text-sm font-light">pcs</span>
                </td>
                <td>
                  <Link
                    to={`/${"income"}/${d.uuid}`}
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
                <th>{index + 1}</th> <td>{dayjs(d.createdAt).fromNow()}</td>
                <td>$ {d.totalPrice}</td>
                <td>{d.totalQuantity} pcs</td>
                <td>
                  <Link
                    to={`/${"orders"}/${d.uuid}`}
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
  );
};

export default Table;
