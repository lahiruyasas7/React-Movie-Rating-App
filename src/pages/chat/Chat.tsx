// src/components/ChatPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

export default function ChatPage({ targetUserId }: { targetUserId: string }) {
  //   const userId = localStorage.getItem("userId");
  type Message = {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    // add other fields if needed
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  console.log("messages", messages);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const socket = io("http://localhost:3003", {
    query: {
      userId: user.user.userId,
    },
  });
  useEffect(() => {
    // Load previous messages
    axios
      .get(
        `http://localhost:3003/chat/messages?user1=${user.user.userId}&user2=${targetUserId}`
      )
      .then((res) => {
        setMessages(res.data);
      });

    // Listen for real-time incoming messages
    socket.on("receive_message", (msg) => {
      const isFromOrTo = [msg.senderId, msg.receiverId].includes(targetUserId);
      if (isFromOrTo) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [targetUserId]);

  const sendMessage = () => {
    if (!content.trim()) return;

    socket.emit("send_message", {
      receiverId: targetUserId,
      content,
    });

    setContent("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <h2>Chat</h2>
      <div
        style={{
          height: 400,
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: 10,
        }}
      >
        {messages.map((msg: any) => (
          <div
            key={msg.id}
            style={{
              textAlign: msg.senderId === user.user.userId ? "right" : "left",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                display: "inline-block",
                background:
                  msg.senderId === user.user.userId ? "#daf8cb" : "#f1f1f1",
                padding: "6px 10px",
                borderRadius: 8,
              }}
            >
              {msg.content}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: "flex", marginTop: 10 }}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type message..."
          style={{ flex: 1, marginRight: 10 }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
