import React, { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  // Kiểm tra quyền admin
  useEffect(() => {
    if (!currentUser.email || currentUser.role !== "admin") {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast.success("Đăng xuất thành công!");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard-container">
      <div className="admin-sidebar">
        <h2 className="admin-sidebar-title">Admin Dashboard</h2>
        <nav className="admin-sidebar-nav">
          <NavLink
            to="/admin/users"
            className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}
          >
            Quản lý người dùng
          </NavLink>
          <NavLink
            to="/admin/bookings"
            className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}
          >
            Quản lý tour đã đặt
          </NavLink>
          <NavLink
            to="/admin/tours"
            className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}
          >
            Quản lý tour
          </NavLink>
          <button
            className="sidebar-link logout-button"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
        </nav>
      </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}