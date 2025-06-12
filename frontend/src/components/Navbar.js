import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
      <Link className="navbar-brand" to="/">MySocial</Link>
      <div className="ml-auto">
        {token ? (
          <>
            <Link className="btn btn-outline-primary mx-2" to="/dashboard">Dashboard</Link>
            <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline-success mx-2" to="/login">Login</Link>
            <Link className="btn btn-outline-primary" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;