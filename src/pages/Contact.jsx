import React, { useState } from "react";
import { toast } from "react-toastify";
import "../styles/Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
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
    if (!formData.phone.trim() || !/^\d{10,11}$/.test(formData.phone)) {
      newErrors.phone = "Vui lòng nhập số điện thoại hợp lệ (10-11 số)";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Vui lòng nhập nội dung";
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

    // Gửi thông tin liên hệ
    const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    contacts.push({
      ...formData,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("contacts", JSON.stringify(contacts));

    // alert("Thông tin liên hệ đã được gửi thành công!");
    toast.success("Thông tin liên hệ đã được gửi thành công!");
    setFormData({ name: "", email: "", phone: "", message: "" });
    setErrors({});
    setIsLoading(false);
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">Liên Hệ Với Chúng Tôi</h2>
      <div className="contact-content">
        <div className="contact-info">
          <h3>Thông Tin Liên Hệ</h3>
          <p>
            <strong>Địa chỉ:</strong> 123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh
          </p>
          <p>
            <strong>Email:</strong> support@vntravel.com
          </p>
          <p>
            <strong>Hotline:</strong> 1900 1234
          </p>
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.447439075904!2d106.69808931474892!3d10.776389692319436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f38f8b0249f%3A0x4c44f2f3b743f0f4!2sLe%20Loi%20Street%2C%20District%201%2C%20Ho%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2s!4v1634567890123!5m2!1sen!2s"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Bản đồ VnTravel"
            ></iframe>
          </div>
        </div>
        <div className="contact-form">
          <h3>Gửi Thông Tin Liên Hệ</h3>
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
              {errors.name && <span className="contact-error">{errors.name}</span>}
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
              {errors.email && <span className="contact-error">{errors.email}</span>}
            </div>
            <div className="form-group">
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
              {errors.phone && <span className="contact-error">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="message">Nội dung *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Nhập nội dung liên hệ"
                rows="5"
                aria-required="true"
              ></textarea>
              {errors.message && <span className="contact-error">{errors.message}</span>}
            </div>
            <button type="submit" className="contact-button" disabled={isLoading}>
              {isLoading ? "Đang gửi..." : "Gửi liên hệ"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}