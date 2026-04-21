import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  if (!isAuthenticated()) {
    if (typeof window !== "undefined") {
      const alertKey = `auth-alert-${location.pathname}`;
      if (!sessionStorage.getItem(alertKey)) {
        window.alert("Please login to use this feature.");
        sessionStorage.setItem(alertKey, "1");
      }
    }
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }
  return children;
};

export default ProtectedRoute;
