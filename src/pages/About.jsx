import React from "react";
import { Link } from "react-router-dom";
import aboutImage from "../assets/about_image.jpeg";
import "../styles/About.css";

export default function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">Giới Thiệu VnTravel</h1>

      <section className="about-intro">
        <div className="intro-text">
          <h2>Chào mừng đến với VnTravel</h2>
          <p>
            VnTravel là công ty du lịch hàng đầu tại Việt Nam, chuyên cung cấp các tour du lịch chất lượng cao, trải nghiệm độc đáo và dịch vụ tận tâm. Thành lập từ năm 2015, chúng tôi đã đồng hành cùng hàng ngàn du khách khám phá vẻ đẹp Việt Nam và thế giới.
          </p>
          <p>
            <strong>Sứ mệnh:</strong> Mang đến những hành trình ý nghĩa, kết nối con người với thiên nhiên và văn hóa.
          </p>
          <p>
            <strong>Tầm nhìn:</strong> Trở thành thương hiệu du lịch được yêu thích nhất tại Việt Nam vào năm 2030.
          </p>
          <Link to="/contact" className="about-cta-button">
            Liên hệ ngay
          </Link>
        </div>
        <div className="intro-image">
          <img src={aboutImage} alt="VnTravel Introduction" loading="lazy" />
        </div>
      </section>

      <section className="about-values">
        <h2>Giá Trị Cốt Lõi</h2>
        <div className="values-grid">
          <div className="value-item">
            <h3>Chất lượng</h3>
            <p>Cam kết cung cấp các tour du lịch với dịch vụ tốt nhất, đảm bảo sự hài lòng của khách hàng.</p>
          </div>
          <div className="value-item">
            <h3>Uy tín</h3>
            <p>Xây dựng niềm tin với khách hàng thông qua sự minh bạch và trách nhiệm trong mọi hoạt động.</p>
          </div>
          <div className="value-item">
            <h3>Trải nghiệm</h3>
            <p>Tạo ra những kỷ niệm đáng nhớ với các hành trình được thiết kế riêng biệt và sáng tạo.</p>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <h2>Thành Tựu Nổi Bật</h2>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>500+</h3>
            <p>Tour du lịch đa dạng</p>
          </div>
          <div className="stat-item">
            <h3>10,000+</h3>
            <p>Khách hàng hài lòng</p>
          </div>
          <div className="stat-item">
            <h3>10+</h3>
            <p>Năm kinh nghiệm</p>
          </div>
        </div>
      </section>
    </div>
  );
}