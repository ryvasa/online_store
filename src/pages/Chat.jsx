import React, { useEffect } from "react";
import { MdSend } from "react-icons/md";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";
import { refreshToken } from "../utils/refreshToken";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useParams } from "react-router-dom";
import { useRef } from "react";

const Chat = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    refreshToken().then(() => {
      getAllChats();
    });
  }, []);
  useEffect(() => {
    if (id) {
      refreshToken().then(() => {
        getChatMessages();
      });
    }
  }, [id]);
  const getAllChats = async () => {
    try {
      const response = await axios.get("http://localhost:5000/chats/all");
      setChats(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const getChatMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/chats/admin/${id}`
      );
      setMessages(response.data.message);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const sendMessage = async () => {
    try {
      const response = await axios.post("http://localhost:5000/messages", {
        message,
        chat_id: id,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    refreshToken().then(() => {
      sendMessage().then(() => {
        setMessage("");
        getChatMessages();
      });
    });
  };
  dayjs.extend(relativeTime);
  return (
    <Layout>
      <div className="flex-[5] overflow-y-auto h-screen pb-16 w-full">
        <div className="flex w-full h-full">
          <div className="flex-1 border-r  bg-gray-100">
            <div className="overflow-y-scroll h-screen">
              {chats.map((chat) =>
                chat.uuid === id ? (
                  <Link
                    to={`/chat/${chat.uuid}`}
                    key={chat.uuid}
                    className="border-b px-5 py-2 flex w-full bg-indigo-600 justify-between rounded-md"
                  >
                    <div className="flex gap-2 items-center justify-center">
                      <img
                        src={
                          chat.user?.img
                            ? chat.user?.img
                            : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                        }
                        className="w-10 h-10 object-cover rounded-full border-2"
                        alt=""
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white ">
                          {chat.user?.name}
                        </span>
                        <span className="text-sm  text-white ">
                          {chat.message[0]?.message}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <div className="flex justify-center items-center gap-1">
                        <span className=" text-sm text-white ">
                          {dayjs(chat.message[0]?.createdAt).fromNow()}
                        </span>{" "}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <Link
                    to={`/chat/${chat.uuid}`}
                    key={chat.uuid}
                    className="border-b px-5 py-2 flex w-full justify-between"
                  >
                    <div className="flex gap-2 items-center justify-center">
                      <img
                        src={
                          chat.user?.img
                            ? chat.user?.img
                            : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                        }
                        className="w-10 h-10 object-cover rounded-full border-2"
                        alt=""
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">
                          {chat.user?.name}
                        </span>
                        <span className="text-sm font-light text-indigo-600">
                          {chat.message[0]?.message}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <div className="flex justify-center items-center gap-1">
                        <span className="font-light text-sm text-indigo-600">
                          {dayjs(chat.message[0]?.createdAt).fromNow()}
                        </span>{" "}
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex h-full flex-col overflow-y-scroll bg-gray-100 shadow-xl ">
              <div className="flex-1 overflow-y-auto ">
                <div className="h-full p-3">
                  <div className="flow-root">
                    {messages.map((message) =>
                      message.user_id === user?.uuid ? (
                        <div className="chat chat-end" key={message.uuid}>
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
                          <div className="chat-bubble  bg-indigo-600 text-white">
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
                          <div className="chat-bubble bg-gray-400 text-white">
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

              <div className="p-6 flex border-t gap-5 justify-center items-center bg-indigo-600 rounded">
                <input
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="inline-none rounded-lg w-full border input-md"
                  value={message}
                />
                <button onClick={handleSubmit}>
                  <MdSend className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
