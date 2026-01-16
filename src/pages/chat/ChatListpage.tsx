import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface MessageUserData {
  firstName: string;
  userId: string;
  profileImageUrl?: string;
}

export default function ChatListPage() {
  const [users, setUsers] = useState<MessageUserData[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}chat/get-all-chats?exclude=${user.user.userId}`
      )
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching chat users:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4 text-white">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        Chat with other users
      </h2>

      <ul className="w-full max-w-md space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <li
              key={user.userId}
              className="transition-all duration-300 hover:scale-[1.02]"
            >
              <Link
                to={`/chat/${user.userId}`}
                className="flex items-center gap-4 bg-gradient-to-r from-gray-800/80 via-gray-900/60 to-gray-800/80 backdrop-blur-md p-4 rounded-2xl shadow-md hover:shadow-lg hover:from-gray-700/80 hover:via-gray-800/70 hover:to-gray-700/80 border border-gray-700/40"
              >
                <img
                  src={user.profileImageUrl || "https://via.placeholder.com/40"}
                  alt={user.firstName}
                  className="w-12 h-12 rounded-full object-cover border border-gray-600 shadow-inner"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">
                    {user.firstName}
                  </span>
                  <span className="text-sm text-gray-400">
                    Click to start chatting →
                  </span>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <p className="text-gray-400 text-center mt-10">
            No users available to chat with 😔
          </p>
        )}
      </ul>
    </div>
  );
}
