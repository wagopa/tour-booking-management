import React from "react";
import { Link } from "react-router-dom";
import locationIcon from "../../assets/location_icon.png";
import "./TourCard.css";

const TourCard = ({ tour, layout = "vertical", buttonText = "Đặt Ngay" }) => {
  if (!tour) {
    return <div>Tour không tồn tại</div>;
  }

  // Chỉ hiển thị destinations, loại bỏ departure
  const locationDisplay = tour.destinations.join(" - ");

  return (
    <div className={`tour-card tour-card--${layout}`}>
      <img src={tour.images[0]} alt={tour.name} className="tour-image" />
      <div className="tour-info">
        <p className="tour-location">
          <img src={locationIcon} alt="Location Icon" className="location-icon" /> 
          <span>{locationDisplay}</span>
        </p>
        <h3 className="tour-name">{tour.name}</h3>
        <p className="tour-duration">{tour.duration}</p>
        <div className="price-and-button">
          <p className="tour-price">{tour.price}</p>
          <Link to={`/tours/${tour.id}`} className="book-button" aria-label={`Xem chi tiết tour ${tour.name}`}>
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;