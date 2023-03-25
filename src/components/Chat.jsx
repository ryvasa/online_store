import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IoSend } from "react-icons/io5";
import { MdHeadsetMic } from "react-icons/md";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

const Chat = ({ type }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="group">
        {type === "desktop" ? (
          <button
            onClick={(e) => setOpen(true)}
            className=" btn btn-sm btn-ghost btn-circle rounded-full flex group-hover:bg-teal-600 group-hover:text-white  gap-1 items-center  "
          >
            <MdHeadsetMic className="w-6 h-6 text-teal-600 group-hover:text-white " />
          </button>
        ) : (
          <button
            onClick={(e) => setOpen(true)}
            className="rounded-sm flex group-hover:bg-teal-600 group-hover:text-white  gap-1 items-center  "
          >
            <MdHeadsetMic className="w-6 h-6 text-teal-600 group-hover:text-white " />
            <span className="normal-case">Customer Service</span>
          </button>
        )}
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pt-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300 "
                  enterFrom="-translate-x-full"
                  enterTo="-translate-x-0"
                  leave="transform transition ease-in-out duration-300 "
                  leaveFrom="-translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-xl ">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto py-3 px-2">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Customor Service
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-3 rounded-md h-full bg-gray-200 p-3">
                          <div className="flow-root">
                            <div className="chat chat-start ">
                              <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                  <img src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" />
                                </div>
                              </div>
                              <div className="chat-header">
                                Obi-Wan Kenobi
                                <time className="text-xs opacity-50">
                                  12:45
                                </time>
                              </div>
                              <div className="chat-bubble bg-white text-teal-600 ">
                                You were the Chosen One!
                              </div>
                              <div className="chat-footer opacity-50">
                                Delivered
                              </div>
                            </div>
                            <div className="chat chat-end">
                              <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                  <img src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif" />
                                </div>
                              </div>
                              <div className="chat-header">
                                Anakin
                                <time className="text-xs opacity-50">
                                  12:46
                                </time>
                              </div>
                              <div className="chat-bubble  bg-teal-600 text-white">
                                I hate you!
                              </div>
                              <div className="chat-footer opacity-50">
                                Seen at 12:46
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 flex gap-5 justify-center items-center px-4">
                        <input
                          type="text"
                          placeholder="Type here"
                          className="input w-full input-sm"
                        />

                        <IoSend className="w-6 h-6 text-teal-600" />
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
export default Chat;
