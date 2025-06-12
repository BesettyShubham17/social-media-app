import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import PostFeed from "./PostFeed"; // 👈 Add this

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded); // set user from token
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Welcome to the Dashboard</h2>

      {user ? (
        <>
          <p>Hello, <strong>{user.email}</strong></p>
          <button className="btn btn-danger mb-4" onClick={handleLogout}>
            Logout
          </button>

          {/* 👇 Show Post Feed only if user is loaded */}
          <PostFeed />
        </>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default Dashboard;