import React, { useState } from "react";
import axios from "axios";

function Login() {
  // Store form input values in state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // When user types into form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // When form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      alert("Login successful!");
      localStorage.setItem("token", res.data.token); // Save token to localStorage
    } catch (err) {
  const errorMsg =
    err.response && err.response.data
      ? err.response.data
      : "An error occurred. Please try again.";
  alert("Login failed: " + errorMsg);
}
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="form-control my-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="form-control my-2"
        />
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;