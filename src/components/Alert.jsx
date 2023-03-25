import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { MdDeleteForever, MdLocalShipping } from "react-icons/md";
import axios from "axios";
import { useDispatch } from "react-redux";
import { alertFailure, alertStart, alertSuccess } from "../redux/alertRedux";

const Alert = ({ id, from }) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("");
  const [action, setAction] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (from === "orders") {
      setColor("green-500");
      setAction("Confirm order");
    } else {
      setColor("red-600");
      setAction(`Delete ${from}`);
    }
  }, [from]);

  const hendleDelete = async () => {
    try {
      handleOpen();
      const response = await axios.delete(
        `http://localhost:5000/${from}/${id}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const hendleOrder = async () => {
    try {
      handleOpen();
      const response = await axios.put(`http://localhost:5000/${from}/${id}`, {
        data: "confirm",
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => {
    if (!open) {
      dispatch(alertStart());
      setOpen(true);
      dispatch(alertSuccess(true));
    } else {
      setOpen(false);
      dispatch(alertSuccess(false));
    }
    dispatch(alertFailure());
  };

  const cancelButtonRef = useRef(null);
  const confirmButton = action.split(" ")[0];
  return (
    <>
      {from === "orders" ? (
        <button
          onClick={handleOpen}
          className="btn-xs normal-case text-white bg-green-500 hover:text-green-500 btn-ghost border-none btn"
        >
          <MdLocalShipping className="mr-1" />
          Confirm
        </button>
      ) : (
        <button
          onClick={handleOpen}
          className="btn-xs normal-case text-white bg-red-600 hover:text-red-600 btn-ghost border-none btn"
        >
          <MdDeleteForever className="mr-1" />
          Delete
        </button>
      )}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={handleOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      {from !== "orders" && (
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon
                            className={`h-6 w-6 text-${color}`}
                            aria-hidden="true"
                          />
                        </div>
                      )}
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          {action}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to{" "}
                            {action.toLocaleLowerCase()}?{" "}
                            {from !== "orders" &&
                              "All of your data will be permanently removed. This action cannot be undone."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    {from === "orders" ? (
                      <button
                        type="button"
                        className={`inline-flex w-full justify-center rounded-md bg-${color} px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto`}
                        onClick={hendleOrder}
                      >
                        {confirmButton}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={`inline-flex w-full justify-center rounded-md bg-${color} px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto`}
                        onClick={hendleDelete}
                      >
                        {confirmButton}
                      </button>
                    )}
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={handleOpen}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
export default Alert;
