import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [resetFormData, setResetFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [resetErrors, setResetErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetInputChange = (e) => {
    const { name, value } = e.target;
    setResetFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateLoginForm = () => {
    const newErrors = {};
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Vui lòng nhập email hợp lệ";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    }
    return newErrors;
  };

  const validateResetForm = () => {
    const newErrors = {};
    if (!resetFormData.email.trim() || !/^\S+@\S+\.\S+$/.test(resetFormData.email)) {
      newErrors.email = "Vui lòng nhập email hợp lệ";
    }
    return newErrors;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const validationErrors = validateLoginForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    // Đăng nhập
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      // alert("Đăng nhập thành công!");
      toast.success("Đăng nhập thành công!");
      // navigate("/");
      // Chuyển hướng dựa trên vai trò người dùng
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      setErrors({ form: "Email hoặc mật khẩu không đúng" });
    }
    setIsLoading(false);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const validationErrors = validateResetForm();

    if (Object.keys(validationErrors).length > 0) {
      setResetErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    // Gửi yêu cầu reset mật khẩu
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some((u) => u.email === resetFormData.email);

    if (!userExists) {
      setResetErrors({ form: "Email này chưa được đăng ký" });
      setIsLoading(false);
      return;
    }

    // Lưu yêu cầu reset vào localStorage
    const resetRequests = JSON.parse(localStorage.getItem("resetRequests") || "[]");
    resetRequests.push({
      email: resetFormData.email,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("resetRequests", JSON.stringify(resetRequests));

    alert("Yêu cầu reset mật khẩu đã được gửi! Vui lòng kiểm tra email của bạn.");
    setShowResetModal(false);
    setResetFormData({ email: "" });
    setResetErrors({});
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Đăng Nhập</h2>
        {errors.form && <p className="login-error">{errors.form}</p>}
        <form onSubmit={handleLoginSubmit}>
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
            {errors.email && <span className="login-error">{errors.email}</span>}
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
            {errors.password && <span className="login-error">{errors.password}</span>}
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>
        <p className="login-forgot-password">
          <span
            className="forgot-password-link"
            onClick={() => setShowResetModal(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setShowResetModal(true)}
          >
            Quên mật khẩu?
          </span>
        </p>
        <p className="login-register-link">
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </p>
      </div>

      {/* Modal Reset Mật khẩu */}
      {showResetModal && (
        <div className="reset-password-modal">
          <div className="reset-password-modal-content">
            <h2 className="reset-password-title">Quên Mật Khẩu</h2>
            <p className="reset-password-info">
              Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
            </p>
            {resetErrors.form && <p className="reset-password-error">{resetErrors.form}</p>}
            <form onSubmit={handleResetSubmit}>
              <div className="form-group">
                <label htmlFor="reset-email">Email *</label>
                <input
                  type="email"
                  id="reset-email"
                  name="email"
                  value={resetFormData.email}
                  onChange={handleResetInputChange}
                  placeholder="Nhập email"
                  aria-required="true"
                />
                {resetErrors.email && (
                  <span className="reset-password-error">{resetErrors.email}</span>
                )}
              </div>
              <div className="reset-password-actions">
                <button
                  type="button"
                  className="reset-password-cancel-button"
                  onClick={() => setShowResetModal(false)}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="reset-password-submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang xử lý..." : "Gửi yêu cầu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}