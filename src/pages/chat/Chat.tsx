// src/components/ChatPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import type { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages } from "../../redux/actions";
import { RootState } from "../../redux/reducers";

export default function ChatPage({ targetUserId }: { targetUserId: string }) {
  //   const userId = localStorage.getItem("userId");
  type Message = {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null); //A ref to scroll to bottom when new messages arrive

  const socketRef = useRef<Socket | null>(null); //Keeps socket instance persistent without recreating on each render

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { allMessages } = useSelector((state: RootState) => state.reducer);

  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(import.meta.env.VITE_API_URL, {
      query: {
        userId: user.user.userId,
      },
    });

    const socket = socketRef.current;

    if (user?.user?.userId && targetUserId) {
      dispatch(getAllMessages(user.user.userId, targetUserId));
    }

    // Listen for real-time messages
    socket.on("receive_message", (msg: any) => {
      if (msg.senderId === user.user.userId) return;
      const isFromOrTo = [msg.senderId, msg.receiverId].includes(targetUserId);
      if (isFromOrTo) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [targetUserId]);

  useEffect(() => {
    if (allMessages) {
      setMessages(allMessages);
    }
  }, [allMessages]);

  const sendMessage = () => {
    if (!content.trim()) return;

    const newMsg = {
      id: Date.now().toString(), // Temporary ID
      senderId: user.user.userId,
      receiverId: targetUserId,
      content,
    };

    // Emit via socket
    if (socketRef.current) {
      socketRef.current.emit("send_message", {
        receiverId: targetUserId,
        content,
      });
    }

    // Optimistically update chat UI
    setMessages((prev) => [...prev, newMsg]);

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
        {messages.map((msg) => (
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
