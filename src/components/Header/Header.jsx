import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import user_logo from "../../assets/user_logo.png";
import web_logo from "../../assets/web_logo.png";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    // alert("Đăng xuất thành công!");
    toast.success("Đăng xuất thành công!"); // Thay alert bằng toast
    setIsDropdownOpen(false);
    navigate("/login");
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Đóng dropdown khi nhấp bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="left">
        <NavLink to="/" className="nav-link">
          <img src={web_logo} alt="VNTravel Logo" className="web-logo" />
          <span>VnTravel</span>
        </NavLink>
      </div>

      <nav className="center">
        <NavLink to="/" className="nav-link" activeClassName="active">
          Trang chủ
        </NavLink>
        <NavLink to="/tours" className="nav-link" activeClassName="active">
          Tours
        </NavLink>
        <NavLink to="/about" className="nav-link" activeClassName="active">
          Giới thiệu
        </NavLink>
        <NavLink to="/contact" className="nav-link" activeClassName="active">
          Liên hệ
        </NavLink>
      </nav>

      <div className="right" ref={dropdownRef}>
        {currentUser?.email ? (
          <div className="user-menu">
            <span className="user-name" onClick={toggleDropdown}>
              <img src={user_logo} alt="User logo" className="user-logo" />
              {currentUser.name || currentUser.email}
            </span>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {/* {currentUser.role === "admin" && (
                  <>
                    <NavLink
                      to="/admin/users"
                      className="dropdown-item"
                      activeClassName="active"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Quản lý người dùng
                    </NavLink>
                    <NavLink
                      to="/admin/bookings"
                      className="dropdown-item"
                      activeClassName="active"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Quản lý tour đã đặt
                    </NavLink>
                    <NavLink
                      to="/admin/tours"
                      className="dropdown-item"
                      activeClassName="active"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Quản lý tour
                    </NavLink>
                    <NavLink
                      to="/admin/statistics"
                      className="dropdown-item"
                      activeClassName="active"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Thống kê
                    </NavLink>
                  </>
                )} */}
                <NavLink
                  to="/profile"
                  className="dropdown-item"
                  activeClassName="active"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Hồ sơ
                </NavLink>
                {currentUser.role === "admin" && (
                  <NavLink
                    to="/admin"
                    className="dropdown-item"
                    activeClassName="active"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard Admin
                  </NavLink>
                )}
                <button
                  className="dropdown-item logout"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink to="/login" className="login" activeClassName="active">
              <img src={user_logo} alt="User logo" className="user-logo" />
              <span>Đăng nhập</span>
            </NavLink>
            <NavLink to="/register" className="register" activeClassName="active">
              Đăng ký
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}