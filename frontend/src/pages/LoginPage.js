import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LoginPage.scss" // Kalau kamu pakai CSS khusus

const API_URL = process.env.REACT_APP_API_URL_LOGIN || "http://localhost:5000/auth/login"; // URL API untuk login

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL, {
        us_email: email,
        us_password: password,
      });

      const { token } = response.data;

      // Simpan token ke localStorage
      localStorage.setItem("token", token);

      // Redirect ke halaman Home
      navigate("/");
    } catch (error) {
      console.error("Login gagal:", error);
      setErrorMsg(error.response?.data?.message || "Login gagal. Coba lagi.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Masukkan email"
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Masukkan password"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
