import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import tours from "../data/tours";
import "../styles/TourDetail.css";

export default function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tour = tours.find((tour) => tour.id === parseInt(id));

  // State cho ngày khởi hành và form đặt tour
  const [selectedDate, setSelectedDate] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfPeople: 1
  });
  const [formErrors, setFormErrors] = useState({});

  if (!tour) {
    return <div className="tour-not-found">Tour không tồn tại</div>;
  }

  // Xử lý thay đổi input trong form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý submit form đặt tour
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.name.trim()) errors.name = "Vui lòng nhập họ tên";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
      errors.email = "Vui lòng nhập email hợp lệ";
    if (!formData.phone.trim() || !/^\d{10,11}$/.test(formData.phone))
      errors.phone = "Vui lòng nhập số điện thoại hợp lệ";
    if (formData.numberOfPeople < 1 || formData.numberOfPeople > tour.maxPeople)
      errors.numberOfPeople = `Số người phải từ 1 đến ${tour.maxPeople}`;
    if (!selectedDate) errors.date = "Vui lòng chọn ngày khởi hành";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Lưu thông tin đặt tour vào localStorage
    const booking = {
      tourId: tour.id,
      tourName: tour.name,
      date: selectedDate,
      ...formData,
      timestamp: new Date().toISOString(),
      status: "pending"
    };
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Reset form và hiển thị thông báo
    // setFormData({ name: "", email: "", phone: "", numberOfPeople: 1 });
    // setFormErrors({});
    // setShowBookingForm(false);
    // alert("Đặt tour thành công! Chúng tôi sẽ liên hệ bạn sớm.");

    // Chuyển hướng đến trang Thanh Toán
    setFormData({ name: "", email: "", phone: "", numberOfPeople: 1 });
    setFormErrors({});
    setShowBookingForm(false);
    
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    
    // Kiểm tra xem người dùng đã đăng nhập
    if (!currentUser.email) {
      navigate("/login");
      toast.success("Đặt tour thành công! Đăng nhập để thanh toán.");
      return null;
    }

    toast.success("Đặt tour thành công! Thanh toán ngay hoặc thanh toán sau tại trang hồ sơ."); // Thay alert bằng toast
    navigate(`/payment/${tour.id}/${booking.timestamp}`)
  };

  // Xử lý mở form đặt tour
  const handleBookNow = () => {
    if (!selectedDate) {
      alert("Vui lòng chọn ngày khởi hành!");
      return;
    }
    setShowBookingForm(true);
  };

  return (
    <div className="tour-detail-container">
      <div className="tour-detail-content">
        <h1 className="tour-detail-title">{tour.name}</h1>
        <div className="tour-detail-gallery">
          {tour.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${tour.name} ${index + 1}`}
              className="tour-detail-image"
              loading="lazy"
            />
          ))}
        </div>
        <div className="tour-detail-info">
          <h2 className="tour-detail-section-title">Giới thiệu tour</h2>
          <p className="tour-detail-description">{tour.description}</p>

          <h2 className="tour-detail-section-title">Lịch trình chi tiết</h2>
          <div className="tour-detail-itinerary">
            {tour.itinerary.map((day) => (
              <div key={day.day} className="tour-detail-itinerary-day">
                <h3 className="tour-detail-day-title">Ngày {day.day}: {day.title}</h3>
                <ul className="tour-detail-day-activities">
                  {day.activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="tour-detail-section-title">Thông tin tour</h2>
          <p className="tour-detail-location">
            <strong>Khởi hành từ:</strong> {tour.departure}
          </p>
          <p className="tour-detail-destinations">
            <strong>Điểm đến:</strong> {tour.destinations.join(" - ")}
          </p>
          <p className="tour-detail-duration">
            <strong>Thời gian:</strong> {tour.duration}
          </p>
          <div className="tour-detail-dates">
            <strong>Chọn ngày khởi hành:</strong>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="tour-detail-date-select"
              aria-label="Chọn ngày khởi hành"
            >
              <option value="">Chọn ngày</option>
              {tour.departureDates.map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString("vi-VN")}
                </option>
              ))}
            </select>
          </div>
          <p className="tour-detail-price">
            <strong>Giá:</strong> {tour.price}
          </p>
          <p className="tour-detail-max-people">
            <strong>Số người tối đa:</strong> {tour.maxPeople}
          </p>
          <button className="tour-detail-book-button" onClick={handleBookNow}>
            Đặt Tour Ngay
          </button>
        </div>

        {/* Modal form đặt tour */}
        {showBookingForm && (
          <div className="tour-detail-booking-modal">
            <div className="tour-detail-booking-modal-content">
              <h2 className="tour-detail-modal-title">Đặt Tour: {tour.name}</h2>
              <form className="tour-detail-booking-form" onSubmit={handleBookingSubmit}>
                <div className="tour-detail-form-group">
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
                  {formErrors.name && <span className="tour-detail-error">{formErrors.name}</span>}
                </div>
                <div className="tour-detail-form-group">
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
                  {formErrors.email && <span className="tour-detail-error">{formErrors.email}</span>}
                </div>
                <div className="tour-detail-form-group">
                  <label htmlFor="phone">Số điện thoại *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Nhập số điện thoại"
                    aria-required="true"
                  />
                  {formErrors.phone && <span className="tour-detail-error">{formErrors.phone}</span>}
                </div>
                <div className="tour-detail-form-group">
                  <label htmlFor="numberOfPeople">Số lượng người *</label>
                  <input
                    type="number"
                    id="numberOfPeople"
                    name="numberOfPeople"
                    value={formData.numberOfPeople}
                    onChange={handleInputChange}
                    min="1"
                    max={tour.maxPeople}
                    aria-required="true"
                  />
                  {formErrors.numberOfPeople && (
                    <span className="tour-detail-error">{formErrors.numberOfPeople}</span>
                  )}
                </div>
                <div className="tour-detail-form-group">
                  <label htmlFor="date">Ngày khởi hành *</label>
                  <input
                    type="text"
                    id="date"
                    value={selectedDate ? new Date(selectedDate).toLocaleDateString("vi-VN") : ""}
                    readOnly
                    aria-required="true"
                  />
                  {formErrors.date && <span className="tour-detail-error">{formErrors.date}</span>}
                </div>
                <div className="tour-detail-form-actions">
                  <button type="button" className="tour-detail-cancel-button" onClick={() => setShowBookingForm(false)}>
                    Hủy
                  </button>
                  <button type="submit" className="tour-detail-submit-button">
                    Xác nhận đặt tour
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}