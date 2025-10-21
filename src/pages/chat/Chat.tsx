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
    <div className="flex flex-col h-screen max-w-md mx-auto text-white mt-5">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-md shadow-md py-4 px-5 rounded-b-2xl flex items-center justify-between">
        <h2 className="text-xl font-semibold">💬 Chat</h2>
        <span className="text-sm text-gray-400">Connected</span>
      </div>

      {/* Chat container */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-gradient-to-br from-gray-900 via-zinc-900 to-black rounded-2xl mt-3 border border-gray-800/60 shadow-inner">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.senderId === user.user.userId
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed transition-all duration-200 ${
                msg.senderId === user.user.userId
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/30"
                  : "bg-gray-800/80 text-gray-200 border border-gray-700/60"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Message input */}
      <div className="mt-3 flex items-center gap-3 bg-gray-900/90 border border-gray-800/60 p-3 rounded-2xl backdrop-blur-md shadow-md">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 bg-transparent text-gray-100 placeholder-gray-500 outline-none px-3"
        />
        <button
          onClick={sendMessage}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 rounded-xl font-medium text-sm hover:scale-105 hover:shadow-[0_0_15px_#6366f1] transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
}
