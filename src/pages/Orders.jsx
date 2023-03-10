import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoInformationCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
const Orders = () => {
  return (
    <>
      <Navbar />
      <div className="w-full bg-gradient-to-b from-white to-gray-100">
        <div className="overflow-x-auto py-20 px-2 lg:px-20">
          <table className="table w-full relative z-[0]">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>1363849926346</td>
                <td>24-03-2018</td>
                <td>
                  <div className="badge badge-success text-white">success</div>
                </td>
                <td>6 pcs</td>
                <td>$ 46</td>
                <td>
                  <Link
                    to={"/orders/:id"}
                    className="badge bg-teal-600 border-none text-white flex gap-1"
                  >
                    <IoInformationCircleSharp />
                    <span>detail</span>
                  </Link>
                </td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>9876543237890</td>
                <td>29-01-2021</td>
                <td>
                  <div className="badge badge-error text-white">failed</div>
                </td>
                <td>2 pcs</td>
                <td>$ 14</td>
                <td>
                  <Link
                    to={"/orders/:id"}
                    className="badge bg-teal-600 border-none text-white flex gap-1"
                  >
                    <IoInformationCircleSharp />
                    <span>detail</span>
                  </Link>
                </td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>4698763789085</td>
                <td>-7-31-2921</td>
                <td>
                  <div className="badge badge-info text-white">proccess</div>
                </td>
                <td>1 pcs</td>
                <td>$ 5</td>
                <td>
                  <Link
                    to={"/orders/:id"}
                    className="badge bg-teal-600 border-none text-white flex gap-1"
                  >
                    <IoInformationCircleSharp />
                    <span>detail</span>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
