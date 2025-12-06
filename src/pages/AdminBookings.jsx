import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 
import tours from "../data/tours";
import "../styles/AdminBookings.css";

export default function AdminBookings() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser") || "{}")
  );
  const [bookings, setBookings] = useState(
    JSON.parse(localStorage.getItem("bookings") || "[]")
  );
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users") || "[]")
  );
  const [formData, setFormData] = useState({
    tourId: "",
    email: "",
    date: "",
    numberOfPeople: 1,
    status: "pending"
  });
  const [errors, setErrors] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [editingTimestamp, setEditingTimestamp] = useState(null);

  // Kiểm tra quyền admin
  useEffect(() => {
    if (!currentUser.email || currentUser.role !== "admin") {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "numberOfPeople" ? parseInt(value) : value }));
  };

  // Validation form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.tourId || !tours.some((t) => t.id === parseInt(formData.tourId)))
      newErrors.tourId = "Vui lòng chọn tour hợp lệ";
    if (!formData.email || !users.some((u) => u.email === formData.email))
      newErrors.email = "Email không tồn tại";
    if (!formData.date || new Date(formData.date) < new Date())
      newErrors.date = "Ngày khởi hành không hợp lệ";
    if (!formData.numberOfPeople || formData.numberOfPeople < 1)
      newErrors.numberOfPeople = "Số người phải lớn hơn 0";
    if (!["pending", "paid"].includes(formData.status))
      newErrors.status = "Trạng thái không hợp lệ";
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

    const updatedBookings = [...bookings];
    const bookingData = {
      tourId: parseInt(formData.tourId),
      email: formData.email,
      date: formData.date,
      numberOfPeople: formData.numberOfPeople,
      status: formData.status,
      timestamp: isAdding ? new Date().toISOString() : editingTimestamp
    };

    if (isAdding) {
      updatedBookings.push(bookingData);
    } else {
      const index = updatedBookings.findIndex((b) => b.timestamp === editingTimestamp);
      updatedBookings[index] = bookingData;
    }

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    resetForm();
    // alert(isAdding ? "Thêm booking thành công!" : "Cập nhật booking thành công!");
    toast.success(isAdding ? "Thêm booking thành công!" : "Cập nhật booking thành công!"); 
  };

  // Xử lý hủy booking
  const handleCancelBooking = (timestamp, email) => {
    if (window.confirm(`Bạn có chắc muốn hủy tour này cho ${email}?`)) {
      const updatedBookings = bookings.filter((b) => b.timestamp !== timestamp);
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
      // alert("Hủy tour thành công!");
      toast.success("Hủy tour thành công!"); 
    }
  };

  // Xử lý chỉnh sửa
  const handleEditBooking = (booking) => {
    setFormData({
      tourId: booking.tourId.toString(),
      email: booking.email,
      date: new Date(booking.date).toISOString().split("T")[0],
      numberOfPeople: booking.numberOfPeople,
      status: booking.status
    });
    setEditingTimestamp(booking.timestamp);
    setIsAdding(false);
    setErrors({});
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      tourId: "",
      email: "",
      date: "",
      numberOfPeople: 1,
      status: "pending"
    });
    setErrors({});
    setIsAdding(false);
    setEditingTimestamp(null);
  };

  return (
    <div className="admin-bookings-container">
      <h2 className="admin-bookings-title">Quản Lý Tour Đã Đặt</h2>
      <button
        className="admin-bookings-button"
        onClick={() => {
          setIsAdding(true);
          setEditingTimestamp(null);
          // resetForm();
        }}
      >
        Thêm Booking
      </button>
      {(isAdding || editingTimestamp) && (
        <form className="admin-bookings-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="tourId">Tour *</label>
            <select
              id="tourId"
              name="tourId"
              value={formData.tourId}
              onChange={handleInputChange}
              aria-required="true"
            >
              <option value="">Chọn tour</option>
              {tours.map((tour) => (
                <option key={tour.id} value={tour.id}>
                  {tour.name}
                </option>
              ))}
            </select>
            {errors.tourId && <span className="form-error">{errors.tourId}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email người dùng *</label>
            <select
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              aria-required="true"
            >
              <option value="">Chọn email</option>
              {users.map((user) => (
                <option key={user.email} value={user.email}>
                  {user.email}
                </option>
              ))}
            </select>
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="date">Ngày khởi hành *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              aria-required="true"
            />
            {errors.date && <span className="form-error">{errors.date}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="numberOfPeople">Số người *</label>
            <input
              type="number"
              id="numberOfPeople"
              name="numberOfPeople"
              value={formData.numberOfPeople}
              onChange={handleInputChange}
              min="1"
              aria-required="true"
            />
            {errors.numberOfPeople && (
              <span className="form-error">{errors.numberOfPeople}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="status">Trạng thái *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              aria-required="true"
            >
              <option value="pending">Chờ thanh toán</option>
              <option value="paid">Đã thanh toán</option>
            </select>
            {errors.status && <span className="form-error">{errors.status}</span>}
          </div>
          <div className="form-actions">
            <button type="submit" className="admin-bookings-button">
              {isAdding ? "Thêm" : "Lưu"}
            </button>
            <button
              type="button"
              className="admin-bookings-button cancel"
              onClick={resetForm}
            >
              Hủy
            </button>
          </div>
        </form>
      )}
      <div className="admin-bookings-section">
        <h3>Danh Sách Tour Đã Đặt</h3>
        {bookings.length > 0 ? (
          <table className="admin-bookings-table">
            <thead>
              <tr>
                <th>Tên tour</th>
                <th>Người đặt</th>
                <th>Ngày khởi hành</th>
                <th>Số người</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => {
                const tour = tours.find((t) => t.id === booking.tourId);
                return tour ? (
                  <tr key={booking.timestamp}>
                    <td>{tour.name}</td>
                    <td>{booking.email}</td>
                    <td>{new Date(booking.date).toLocaleDateString("vi-VN")}</td>
                    <td>{booking.numberOfPeople}</td>
                    <td>
                      {booking.status === "paid" ? "Đã thanh toán" : "Chờ thanh toán"}
                    </td>
                    <td>
                      <button
                        className="admin-bookings-button edit"
                        onClick={() => handleEditBooking(booking)}
                      >
                        Sửa
                      </button>
                      <button
                        className="admin-bookings-button cancel"
                        onClick={() => handleCancelBooking(booking.timestamp, booking.email)}
                      >
                        Hủy
                      </button>
                    </td>
                  </tr>
                ) : null;
              })}
            </tbody>
          </table>
        ) : (
          <p>Chưa có tour nào được đặt.</p>
        )}
      </div>
    </div>
  );
}