import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";
import TourCard from "../components/TourCard/TourCard";
import tours from "../data/tours";
import "../styles/Tours.css";

export default function Tours() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const destination = params.get("destination") || "";
  const date = params.get("date") || "";
  const departureLocation = params.get("location") || "";

  // State cho bộ lọc địa điểm
  const [selectedLocation, setSelectedLocation] = useState(destination || "");

  // State cho sắp xếp
  const [sortOption, setSortOption] = useState("relevance");

  // Lấy danh sách điểm đến duy nhất từ destinations
  const uniqueLocations = [...new Set(tours.flatMap((tour) => tour.destinations))];

  // Lọc tour
  const filteredTours = tours
    .filter((tour) => {
      // Nếu không có destination, hiển thị tất cả tour
      if (!destination.trim()) return true;

      // Lọc theo điểm đến (name và destinations)
      const matchesDestination = tour.name.toLowerCase().includes(destination.toLowerCase()) ||
        tour.destinations.some((dest) =>
          dest.toLowerCase().includes(destination.toLowerCase())
        );

      // Lọc theo điểm xuất phát (departure)
      const matchesDepartureLocation = departureLocation
        ? tour.departure.toLowerCase().includes(departureLocation.toLowerCase())
        : true;

      // Lọc theo ngày khởi hành (departureDates)
      const matchesDate = date ? tour.departureDates.includes(date) : true;

      // Lọc theo bộ lọc địa điểm bên trái (destinations)
      const matchesLocation = selectedLocation
        ? tour.destinations.includes(selectedLocation)
        : true;

      return matchesDestination && matchesDepartureLocation && matchesDate && matchesLocation;
    })
    .sort((a, b) => {
      if (sortOption === "price-asc") {
        return parseFloat(a.price.replace(/[^0-9.-]+/g, "")) - parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
      } else if (sortOption === "price-desc") {
        return parseFloat(b.price.replace(/[^0-9.-]+/g, "")) - parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
      }
      return 0; // "relevance" thì không sắp xếp
    });

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 5;
  const totalPages = Math.ceil(filteredTours.length / toursPerPage);
  const startIndex = (currentPage - 1) * toursPerPage;
  const currentTours = filteredTours.slice(startIndex, startIndex + toursPerPage);

  // Hàm xử lý khi chọn địa điểm
  const handleLocationSelect = (loc) => {
    const newLocation = loc === "Tất cả" ? "" : loc;
    setSelectedLocation(newLocation);
    setCurrentPage(1);

    // Cập nhật query params để đồng bộ với SearchBar
    const newParams = new URLSearchParams(location.search);
    if (newLocation) {
      newParams.set("destination", newLocation);
    } else {
      newParams.delete("destination");
    }
    navigate(`?${newParams.toString()}`);
  };

  return (
    <div className="tours-container">
      <SearchBar />
      <div className="tours-content">
        <div className="tours-filter">
          <h3 className="filter-title">Tour Phổ Biến</h3>
          <ul className="filter-list">
            <li
              className={`filter-item ${selectedLocation === "" ? "active" : ""}`}
              onClick={() => handleLocationSelect("Tất cả")}
            >
              Tất cả
            </li>
            {uniqueLocations.slice(0, 10).map((loc) => (
              <li
                key={loc}
                className={`filter-item ${selectedLocation === loc ? "active" : ""}`}
                onClick={() => handleLocationSelect(loc)}
              >
                {loc}
              </li>
            ))}
          </ul>
        </div>

        <div className="tours-main">
          <div className="tours-header">
            <h2 className="tours-title">Tour Du Lịch Hấp Dẫn</h2>
            <div className="tours-sort">
              <label>Xếp theo: </label>
              <select
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  setCurrentPage(1); // Reset về trang 1 khi thay đổi sắp xếp
                }}
              >
                <option value="relevance">Liên quan nhất</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
              </select>
            </div>
          </div>

          {currentTours.length > 0 ? (
            <div className="tours-list">
              {currentTours.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  layout="horizontal"
                  buttonText="Xem Tour"
                />
              ))}
            </div>
          ) : (
            <p className="no-results">Không tìm thấy tour phù hợp.</p>
          )}

          <div className="pagination">
            <button
              className="pagination-button"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Trang trước
            </button>
            <span className="pagination-info">
              Trang {currentPage} / {totalPages}
            </span>
            <button
              className="pagination-button"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Trang tiếp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}