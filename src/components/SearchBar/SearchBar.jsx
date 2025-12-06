import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './SearchBar.css';
import searchIcon from '../../assets/search_logo.png'; 
import locationLogo from '../../assets/take_off_logo.png';

export default function SearchBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  
  // Đồng bộ state với query params
  const [destination, setDestination] = useState(params.get("destination") || "");
  const [departureDate, setDepartureDate] = useState(params.get("date") || "");
  const [departureLocation, setDepartureLocation] = useState(params.get("location") || "");

  // Cập nhật state khi query params thay đổi
  useEffect(() => {
    setDestination(params.get("destination") || "");
    setDepartureDate(params.get("date") || "");
    setDepartureLocation(params.get("location") || "");
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams({
      destination,
      date: departureDate,
      location: departureLocation,
    }).toString();

    // Nếu đang ở trang chủ, chuyển hướng đến /tours
    if (location.pathname === "/") {
      navigate(`/tours?${query}`);
    } else {
      // Nếu đang ở trang khác (như /tours), chỉ cập nhật query params
      navigate(`${location.pathname}?${query}`);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-input">
        <img src={searchIcon} alt="Biểu tượng tìm kiếm" className="search-icon" />
        <input
          type="text"
          placeholder="Bạn muốn đi đâu?"
          className="destination-input"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          aria-label="Nhập điểm đến"
        />
      </div>

      <div className="search-select">
        <input
          type="date"
          className="departure-date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          aria-label="Chọn ngày khởi hành"
        />
      </div>

      <div className="search-select location-select">
        <img src={locationLogo} alt="Biểu tượng điểm khởi hành" className="location-logo" />
        <select
          className="departure-location"
          value={departureLocation}
          onChange={(e) => setDepartureLocation(e.target.value)}
          aria-label="Chọn địa điểm khởi hành"
        >
          <option value="">Khởi hành từ</option>
          <option value="Hà Nội">Hà Nội</option>
          <option value="Hồ Chí Minh">Hồ Chí Minh</option>
          <option value="Đà Nẵng">Đà Nẵng</option>
        </select>
      </div>

      <button type="submit" className="search-button">
        Tìm
      </button>
    </form>
  );
}