import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên";
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Vui lòng nhập email hợp lệ";
    }
    if (formData.phone.length !== 10) {
      newErrors.phone = "Số điện thoại phải có 10 chữ số";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    // Đăng ký
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u) => u.email === formData.email)) {
      setErrors({ form: "Email đã được sử dụng" });
      setIsLoading(false);
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: "user"
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    // alert("Đăng ký thành công!");
    toast.success("Đăng ký thành công!");
    navigate("/");
    setIsLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-title">Đăng Ký</h2>
        {errors.form && <p className="register-error">{errors.form}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Họ tên *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nhập họ tên"
              aria-required="true"
            />
            {errors.name && <span className="register-error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Nhập email"
              aria-required="true"
            />
            {errors.email && <span className="register-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Số điện thoại *</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại"
              aria-required="true"
            />
            {errors.phone && <span className="register-error">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Nhập mật khẩu"
              aria-required="true"
            />
            {errors.password && <span className="register-error">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Xác nhận mật khẩu *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Xác nhận mật khẩu"
              aria-required="true"
            />
            {errors.confirmPassword && (
              <span className="register-error">{errors.confirmPassword}</span>
            )}
          </div>
          <button type="submit" className="register-button" disabled={isLoading}>
            {isLoading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>
        <p className="register-login-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
        </p>
      </div>
    </div>
  );
}