import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import tours from "../data/tours";
import "../styles/Payment.css";

export default function Payment() {
  const { tourId, bookingId } = useParams();
  const navigate = useNavigate();
  const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
  const booking = bookings.find(
    (b) => b.tourId === parseInt(tourId) && b.timestamp === bookingId
  );
  const tour = tours.find((t) => t.id === parseInt(tourId));
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "card",
  });
  const [errors, setErrors] = useState({});
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  // Kiểm tra xem người dùng đã đăng nhập và booking có tồn tại
  if (!currentUser.email) {
    navigate("/login");
    return null;
  }
  if (!booking || !tour) {
    return <div className="payment-not-found">Đơn hàng không tồn tại</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.paymentMethod === "card") {
      if (!formData.cardNumber.match(/^\d{16}$/)) {
        newErrors.cardNumber = "Số thẻ phải có 16 chữ số";
      }
      if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)) {
        newErrors.expiryDate = "Ngày hết hạn phải có định dạng MM/YY";
      }
      if (!formData.cvv.match(/^\d{3}$/)) {
        newErrors.cvv = "CVV phải có 3 chữ số";
      }
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Cập nhật trạng thái booking
    const updatedBookings = bookings.map((b) =>
      b.timestamp === bookingId ? { ...b, status: "paid" } : b
    );
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    // Hiển thị thông báo và chuyển hướng
    // alert("Thanh toán thành công! Cảm ơn bạn đã đặt tour.");
    toast.success("Thanh toán thành công! Cảm ơn bạn đã đặt tour.");
    navigate("/profile");
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Thanh Toán</h2>
      <div className="payment-content">
        <div className="payment-summary">
          <h3>Tóm tắt đơn hàng</h3>
          <p>
            <strong>Tour:</strong> {tour.name}
          </p>
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
        </div>
        <div className="payment-form-container">
          <h3>Thông tin thanh toán</h3>
          <form className="payment-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="paymentMethod">Phương thức thanh toán</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                aria-label="Chọn phương thức thanh toán"
              >
                <option value="card">Thẻ tín dụng</option>
                <option value="bank">Chuyển khoản ngân hàng</option>
              </select>
            </div>
            {formData.paymentMethod === "card" && (
              <>
                <div className="form-group">
                  <label htmlFor="cardNumber">Số thẻ *</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="Nhập số thẻ (16 chữ số)"
                    aria-required="true"
                  />
                  {errors.cardNumber && (
                    <span className="payment-error">{errors.cardNumber}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="expiryDate">Ngày hết hạn *</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    aria-required="true"
                  />
                  {errors.expiryDate && (
                    <span className="payment-error">{errors.expiryDate}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV *</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="CVV (3 chữ số)"
                    aria-required="true"
                  />
                  {errors.cvv && (
                    <span className="payment-error">{errors.cvv}</span>
                  )}
                </div>
              </>
            )}
            {formData.paymentMethod === "bank" && (
              <div className="bank-info">
                <p>
                  <strong>Thông tin chuyển khoản:</strong>
                </p>
                <p>Ngân hàng: Vietcombank</p>
                <p>Số tài khoản: 1234 5678 9012 3456</p>
                <p>Chủ tài khoản: VNTravel</p>
                <p>Vui lòng ghi mã đơn hàng {bookingId} khi chuyển khoản.</p>
              </div>
            )}
            <button type="submit" className="payment-button">
              Xác nhận thanh toán
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}