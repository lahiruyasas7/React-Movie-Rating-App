// src/pages/ChatListPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface MessageUserData {
  firstName: string;
  userId: string;
  profileImageUrl?: string;
}

export default function ChatListPage() {
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    axios
      .get(
        `http://localhost:3003/chat/get-all-chats?exclude=${user.user.userId}`
      )
      .then((res) => setUsers(res.data));
  }, []);

  console.log("Users in chat list:", users);

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <h2>🧑‍🤝‍🧑 Chat with other users</h2>
      <ul>
        {users.map((user: MessageUserData) => (
          <li key={user.userId} style={{ marginBottom: 10 }}>
            <Link to={`/chat/${user.userId}`}>
              <img
                src={user.profileImageUrl || "https://via.placeholder.com/40"}
                alt={user.firstName}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  marginRight: 10,
                }}
              />
              {user.firstName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
