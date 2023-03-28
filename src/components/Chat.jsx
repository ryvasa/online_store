import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IoSend } from "react-icons/io5";
import { MdHeadsetMic } from "react-icons/md";
import { refreshToken } from "../utils/refreshToken";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const Chat = ({ type }) => {
  const data = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState({});
  const [message, setMessage] = useState("");
  const getChat = async () => {
    try {
      const response = await axios.get("http://localhost:5000/chats/client");
      setChat(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const sendMessage = async () => {
    try {
      const response = await axios.post("http://localhost:5000/messages", {
        message,
        chat_id: chat.uuid,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (open === true) {
      refreshToken().then(() => {
        getChat();
      });
    }
  }, [open]);
  dayjs.extend(relativeTime);
  const handleClick = (e) => {
    refreshToken().then(() => {
      sendMessage().then(() => {
        setMessage("");
        getChat();
      });
    });
  };

  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

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
                      <div className="flex-1 overflow-y-auto  bg-gray-200 py-3 px-2">
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

                        <div className="mt-3 h-full p-3">
                          <div className="flow-root">
                            {chat.message?.map((message) =>
                              data.uuid === message.user_id ? (
                                <div className="chat chat-end">
                                  <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                      <img
                                        src={
                                          message.user?.img
                                            ? message.user?.img
                                            : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="chat-header">
                                    {message.user?.name}
                                  </div>
                                  <div className="chat-bubble  bg-teal-600 text-white">
                                    {message.message}
                                  </div>
                                  <div className="chat-footer">
                                    <time className="text-xs opacity-50">
                                      {dayjs(message.createdAt).fromNow()}
                                    </time>
                                  </div>
                                </div>
                              ) : (
                                <div className="chat chat-start ">
                                  <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                      <img
                                        src={
                                          message.user?.img
                                            ? message.user?.img
                                            : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="chat-header">
                                    {message.user?.name}
                                  </div>
                                  <div className="chat-bubble bg-white text-teal-600 ">
                                    {message.message}
                                  </div>
                                  <div className="chat-footer">
                                    <time className="text-xs opacity-50">
                                      {dayjs(message.createdAt).fromNow()}
                                    </time>
                                  </div>
                                </div>
                              )
                            )}
                            <div ref={scrollRef} />
                          </div>
                        </div>
                      </div>

                      <div className="p-6 flex gap-5 justify-center items-center px-4">
                        <input
                          onChange={(e) => setMessage(e.target.value)}
                          type="text"
                          value={message}
                          placeholder="Type here"
                          className="input w-full input-sm"
                        />
                        <button onClick={handleClick}>
                          <IoSend className="w-6 h-6 text-teal-600" />
                        </button>
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
