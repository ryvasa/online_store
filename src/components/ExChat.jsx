import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:8000"; // ganti dengan URL server Anda

function ExChat(props) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // membuat koneksi Socket.io
  const socket = io(ENDPOINT, { query: { accessKey: props.accessKey } });

  useEffect(() => {
    // bergabung ke ruangan chat dengan nama yang diberikan pada props
    socket.emit("joinRoom", props.room);

    // mendengarkan event 'message' dari server
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // membersihkan event listener saat komponen di-unmount
    return () => {
      socket.off("message");
      socket.disconnect();
    };
  }, [props.room, socket]);

  const handleNewMessage = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // mengirim pesan baru ke server
    socket.emit("sendMessage", newMessage);

    // membersihkan input form
    setNewMessage("");
  };

  return (
    <div>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>{msg.text}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newMessage} onChange={handleNewMessage} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ExChat;
