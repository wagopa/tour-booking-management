import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import tours from "../data/tours";
import "../styles/Profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser") || "{}")
  );
  const [bookings, setBookings] = useState(
    JSON.parse(localStorage.getItem("bookings") || "[]").filter(
      (booking) => booking.email === currentUser.email
    )
  );
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name || "",
    phone: currentUser.phone || "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // Kiểm tra đăng nhập
  useEffect(() => {
    if (!currentUser.email) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  // Theo dõi thay đổi trong localStorage để cập nhật bookings
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedBookings = JSON.parse(localStorage.getItem("bookings") || "[]").filter(
        (booking) => booking.email === currentUser.email
      );
      setBookings(updatedBookings);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [currentUser.email]);

  // Xử lý thay đổi input trong form chỉnh sửa
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Cập nhật formData khi currentUser thay đổi
  useEffect(() => {
    setFormData({
      name: currentUser.name || "",
      phone: currentUser.phone || "",
      password: "",
      confirmPassword: "",
    });
  }, [currentUser]);


  // Validation form chỉnh sửa
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ tên";
    if (!formData.phone.match(/^\d{10,11}$/))
      newErrors.phone = "Vui lòng nhập số điện thoại hợp lệ";
    if (formData.password && formData.password.length < 6)
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    if (formData.password && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    return newErrors;
  };

  // Xử lý submit form chỉnh sửa
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Cập nhật thông tin người dùng
    const updatedUser = {
      ...currentUser,
      name: formData.name,
      phone: formData.phone,
      ...(formData.password && { password: formData.password }),
    };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);
    setEditMode(false);
    setFormData({
      name: updatedUser.name,
      phone: updatedUser.phone,
      password: "",
      confirmPassword: "",
    });
    setErrors({});
    // alert("Cập nhật thông tin thành công!");
    toast.success("Cập nhật thông tin thành công!");
  };

  // Xử lý hủy tour
  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Bạn có chắc muốn hủy tour này?")) {
      const updatedBookings = JSON.parse(localStorage.getItem("bookings") || "[]").filter(
        (b) => !(b.timestamp === bookingId && b.email === currentUser.email)
      );
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
      setBookings(updatedBookings.filter((b) => b.email === currentUser.email));
      // alert("Hủy tour thành công!");
      toast.success("Hủy tour thành công!");
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Hồ Sơ Người Dùng</h2>
      <div className="profile-content">
        <div className="profile-info">
          <h3>Thông Tin Cá Nhân</h3>
          {editMode ? (
            <form className="profile-form" onSubmit={handleEditSubmit}>
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
                {errors.name && <span className="profile-error">{errors.name}</span>}
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
                {errors.phone && <span className="profile-error">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Mật khẩu mới (để trống nếu không đổi)</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Nhập mật khẩu mới"
                />
                {errors.password && <span className="profile-error">{errors.password}</span>}
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
                  <span className="profile-error">{errors.confirmPassword}</span>
                )}
              </div>
              <div className="form-actions">
                <button type="submit" className="profile-button">
                  Lưu thay đổi
                </button>
                <button
                  type="button"
                  className="profile-button cancel"
                  onClick={() => setEditMode(false)}
                >
                  Hủy
                </button>
              </div>
            </form>
          ) : (
            <>
              <p>
                <strong>Họ tên:</strong> {currentUser.name}
              </p>
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {currentUser.phone}
              </p>
              <button
                className="profile-button"
                onClick={() => setEditMode(true)}
              >
                Chỉnh sửa thông tin
              </button>
            </>
          )}
        </div>
        <div className="profile-bookings">
          <h3>Lịch Sử Đặt Tour</h3>
          {bookings.length > 0 ? (
            <div className="bookings-list">
              {bookings.map((booking) => {
                const tour = tours.find((t) => t.id === booking.tourId);
                return tour ? (
                  <div key={booking.timestamp} className="booking-item">
                    <h4>{tour.name}</h4>
                    <p>
                      <strong>Ngày khởi hành:</strong>{" "}
                      {new Date(booking.date).toLocaleDateString("vi-VN")}
                    </p>
                    <p>
                      <strong>Số người:</strong> {booking.numberOfPeople}
                    </p>
                    <p>
                      <strong>Tổng giá:</strong> {tour.price}
                    </p>
                    <p>
                      <strong>Trạng thái:</strong>{" "}
                      {booking.status === "paid" ? "Đã thanh toán" : "Chờ thanh toán"}
                    </p>
                    {booking.status === "pending" && (
                      <div className="booking-actions">
                        <NavLink
                          to={`/payment/${tour.id}/${booking.timestamp}`}
                          className="profile-button pay"
                        >
                          Thanh toán
                        </NavLink>
                        <button
                          className="profile-button cancel"
                          onClick={() => handleCancelBooking(booking.timestamp)}
                        >
                          Hủy tour
                        </button>
                      </div>
                    )}
                  </div>
                ) : null;
              })}
            </div>
          ) : (
            <p>Chưa có tour nào được đặt.</p>
          )}
        </div>
      </div>
    </div>
  );
}