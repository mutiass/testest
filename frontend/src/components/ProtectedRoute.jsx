import React from "react";
import { Navigate } from "react-router-dom";

// Komponen yang membungkus halaman yang perlu login
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Jika tidak ada token, redirect ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika ada token, tampilkan konten halaman yang dilindungi
  return children;
};

export default ProtectedRoute;
