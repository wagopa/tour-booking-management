import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";
import TourCard from "../components/TourCard/TourCard";
import tours from "../data/tours";

import "../styles/Home.css";

export default function Home() {
  const toursToShow = 9; // Số tour hiển thị

  return (
    <div className="home-container">
      <SearchBar />
      <h2 className="home-title">Khám Phá Tour Hấp Dẫn Ngay Hôm Nay</h2>
      <p className="home-subtitle">Nhanh Tay Đặt Ngay, Kẻo Mai Sẽ Lỡ</p>

      <div className="tours-grid">
        {tours.slice(0, toursToShow).map((tour) => (
          <TourCard key={tour.id} tour={tour} layout="vertical" buttonText="Đặt Ngay" />
        ))}
      </div>

      <div className="view-more">
        <Link to="/tours" className="view-more-button">
          Xem Thêm Tours
        </Link>
      </div>
    </div>
  );
}