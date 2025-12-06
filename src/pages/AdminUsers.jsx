import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/AdminUsers.css";

export default function AdminUsers() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser") || "{}")
  );
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users") || "[]")
  );
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user"
  });
  const [errors, setErrors] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [editingEmail, setEditingEmail] = useState(null);

  // Kiểm tra quyền admin
  useEffect(() => {
    if (!currentUser.email || currentUser.role !== "admin") {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Email không hợp lệ";
    if (isAdding && users.some((u) => u.email === formData.email))
      newErrors.email = "Email đã tồn tại";
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ tên";
    if (!formData.phone.match(/^\d{10,11}$/))
      newErrors.phone = "Số điện thoại không hợp lệ";
    if (isAdding && !formData.password)
      newErrors.password = "Vui lòng nhập mật khẩu";
    if (formData.password && formData.password.length < 6)
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    if (formData.password && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    if (!["user", "admin"].includes(formData.role))
      newErrors.role = "Vai trò không hợp lệ";
    return newErrors;
  };

  // Xử lý submit form (thêm/sửa)
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const updatedUsers = [...users];
    const userData = {
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
      role: formData.role,
      ...(formData.password && { password: formData.password })
    };

    if (isAdding) {
      updatedUsers.push(userData);
    } else {
      const index = updatedUsers.findIndex((u) => u.email === editingEmail);
      updatedUsers[index] = { ...updatedUsers[index], ...userData };
    }

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    resetForm();
    // alert(isAdding ? "Thêm người dùng thành công!" : "Cập nhật người dùng thành công!");
    toast.success(isAdding ? "Thêm người dùng thành công!" : "Cập nhật người dùng thành công!");
  };

  // Xử lý xóa người dùng
  const handleDeleteUser = (email) => {
    if (email === currentUser.email) {
      // alert("Không thể xóa tài khoản admin đang đăng nhập!");
      toast.error("Không thể xóa tài khoản admin đang đăng nhập!");
      return;
    }
    if (window.confirm(`Bạn có chắc muốn xóa người dùng ${email}?`)) {
      const updatedUsers = users.filter((u) => u.email !== email);
      const updatedBookings = JSON.parse(localStorage.getItem("bookings") || "[]").filter(
        (b) => b.email !== email
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
      setUsers(updatedUsers);
      // alert("Xóa người dùng thành công!");
      toast.success("Xóa người dùng thành công!");
    }
  };

  // Xử lý chỉnh sửa
  const handleEditUser = (user) => {
    setFormData({
      email: user.email,
      name: user.name,
      phone: user.phone,
      password: "",
      confirmPassword: "",
      role: user.role
    });
    setEditingEmail(user.email);
    setIsAdding(false);
    setErrors({});
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      email: "",
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "user"
    });
    setErrors({});
    setIsAdding(false);
    setEditingEmail(null);
  };

  return (
    <div className="admin-users-container">
      <h2 className="admin-users-title">Quản Lý Người Dùng</h2>
      <button
        className="admin-users-button"
        onClick={() => {
          setIsAdding(true);
          setEditingEmail(null);
          // resetForm();
        }}
      >
        Thêm Người Dùng
      </button>
      {(isAdding || editingEmail) && (
        <form className="admin-users-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Nhập email"
              disabled={!!editingEmail}
              aria-required="true"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
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
            {errors.name && <span className="form-error">{errors.name}</span>}
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
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">
              {isAdding ? "Mật khẩu *" : "Mật khẩu mới (để trống nếu không đổi)"}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Nhập mật khẩu"
              aria-required={isAdding}
            />
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Xác nhận mật khẩu"
            />
            {errors.confirmPassword && (
              <span className="form-error">{errors.confirmPassword}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="role">Vai trò *</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              aria-required="true"
            >
              <option value="user">Người dùng</option>
              <option value="admin">Quản trị</option>
            </select>
            {errors.role && <span className="form-error">{errors.role}</span>}
          </div>
          <div className="form-actions">
            <button type="submit" className="admin-users-button">
              {isAdding ? "Thêm" : "Lưu"}
            </button>
            <button
              type="button"
              className="admin-users-button cancel"
              onClick={resetForm}
            >
              Hủy
            </button>
          </div>
        </form>
      )}
      <div className="admin-users-section">
        <h3>Danh Sách Người Dùng</h3>
        {users.length > 0 ? (
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Vai trò</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email}>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.role === "admin" ? "Quản trị" : "Người dùng"}</td>
                  <td>
                    <button
                      className="admin-users-button edit"
                      onClick={() => handleEditUser(user)}
                    >
                      Sửa
                    </button>
                    {user.role !== "admin" && (
                      <button
                        className="admin-users-button delete"
                        onClick={() => handleDeleteUser(user.email)}
                      >
                        Xóa
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Chưa có người dùng nào.</p>
        )}
      </div>
    </div>
  );
}