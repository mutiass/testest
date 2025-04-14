import React, { useState } from "react";
import { Menu, LogOut, Users, ClipboardList, Tags, Home } from "lucide-react";
import "../styles/header.scss";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="menu-wrapper">
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={24} />
        </button>

        {menuOpen && (
          <div className="dropdown">
            <button onClick={() => handleNavigate("/orders")} className="dropdown-item">
              <ClipboardList size={16} style={{ marginRight: "6px" }} />
              Orders
            </button>
            <button onClick={() => handleNavigate("/users")} className="dropdown-item">
              <Users size={16} style={{ marginRight: "6px" }} />
              Users
            </button>
            <button onClick={() => handleNavigate("/categories")} className="dropdown-item">
              <Tags size={16} style={{ marginRight: "6px" }} />
              Categories
            </button>
            <button onClick={handleLogout} className="dropdown-item">
              <LogOut size={16} style={{ marginRight: "6px" }} />
              Logout
            </button>
          </div>
        )}
      </div>

      <h1 className="title">MUTSKIN COLLECTION</h1>

      <button className="home-button" onClick={() => navigate("/")}>
        <Home size={20} style={{ marginRight: "4px" }} />
        Home
      </button>
    </header>
  );
};

export default Header;
