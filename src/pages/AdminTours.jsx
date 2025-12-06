import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import tours from "../data/tours";
import "../styles/AdminTours.css";

export default function AdminTours() {
  const navigate = useNavigate();
  const [currentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser") || "{}")
  );
  const [bookings, setBookings] = useState(
    JSON.parse(localStorage.getItem("bookings") || "[]")
  );
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    departure: "",
    destinations: [],
    duration: "",
    departureDates: [],
    price: "",
    images: [],
    description: "",
    maxPeople: "",
    itinerary: [],
    category: "",
    rating: 0,
    reviews: 0
  });
  const [arrayInputs, setArrayInputs] = useState({
    destination: "",
    departureDate: "",
    itineraryDay: "",
    itineraryTitle: "",
    itineraryActivity: ""
  });
  const [currentItineraryDay, setCurrentItineraryDay] = useState(null);
  const [errors, setErrors] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Kiểm tra quyền admin
  useEffect(() => {
    if (!currentUser.email || currentUser.role !== "admin") {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(files)
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Xử lý input cho mảng
  const handleArrayInputChange = (e) => {
    const { name, value } = e.target;
    setArrayInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Thêm mục vào mảng đơn giản
  const addSimpleArrayItem = (field) => {
    const inputField = {
      destinations: "destination",
      departureDates: "departureDate"
    }[field];
    if (arrayInputs[inputField].trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], arrayInputs[inputField]]
      }));
      setArrayInputs((prev) => ({ ...prev, [inputField]: "" }));
    }
  };

  // Xóa mục khỏi mảng
  const removeArrayItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Thêm ngày vào itinerary
  const addItineraryDay = () => {
    if (arrayInputs.itineraryDay.trim() && arrayInputs.itineraryTitle.trim()) {
      setFormData((prev) => ({
        ...prev,
        itinerary: [
          ...prev.itinerary,
          {
            day: parseInt(arrayInputs.itineraryDay),
            title: arrayInputs.itineraryTitle,
            activities: []
          }
        ]
      }));
      setArrayInputs((prev) => ({
        ...prev,
        itineraryDay: "",
        itineraryTitle: ""
      }));
    }
  };

  // Thêm activity vào ngày trong itinerary
  const addItineraryActivity = (dayIndex) => {
    if (arrayInputs.itineraryActivity.trim()) {
      setFormData((prev) => {
        const newItinerary = [...prev.itinerary];
        newItinerary[dayIndex].activities.push(arrayInputs.itineraryActivity);
        return { ...prev, itinerary: newItinerary };
      });
      setArrayInputs((prev) => ({ ...prev, itineraryActivity: "" }));
    }
  };

  // Xóa activity khỏi itinerary
  const removeItineraryActivity = (dayIndex, activityIndex) => {
    setFormData((prev) => {
      const newItinerary = [...prev.itinerary];
      newItinerary[dayIndex].activities = newItinerary[dayIndex].activities.filter(
        (_, i) => i !== activityIndex
      );
      return { ...prev, itinerary: newItinerary };
    });
  };

  // Xóa ngày khỏi itinerary
  const removeItineraryDay = (dayIndex) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== dayIndex)
    }));
  };

  // Validation mẫu
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập tên tour";
    if (!formData.departure.trim()) newErrors.departure = "Vui lòng nhập điểm khởi hành";
    if (formData.destinations.length === 0)
      newErrors.destinations = "Vui lòng thêm ít nhất một điểm đến";
    if (!formData.duration.trim()) newErrors.duration = "Vui lòng nhập thời gian (VD: 3 Ngày 2 Đêm)";
    if (formData.departureDates.length === 0)
      newErrors.departureDates = "Vui lòng thêm ít nhất một ngày khởi hành";
    if (!formData.price.match(/^\d{1,3}(\.\d{3})*\sVND$/))
      newErrors.price = "Giá phải có định dạng X.XXX.XXX VND";
    if (formData.images.length === 0 && isAdding)
      newErrors.images = "Vui lòng chọn ít nhất một hình ảnh";
    if (!formData.description.trim()) newErrors.description = "Vui lòng nhập mô tả";
    if (!formData.maxPeople.match(/^\d+$/) || parseInt(formData.maxPeople) <= 0)
      newErrors.maxPeople = "Số người tối đa phải là số dương";
    if (formData.itinerary.length === 0)
      newErrors.itinerary = "Vui lòng thêm ít nhất một lịch trình";
    // if (!formData.category.trim()) newErrors.category = "Vui lòng chọn danh mục";
    return newErrors;
  };

  // Xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // alert("Chức năng chưa được hỗ trợ");
    toast.error("Chức năng chưa được hỗ trợ!");
    resetForm();
  };

  // Xử lý xóa tour
  const handleDeleteTour = (id, name) => {
    if (window.confirm(`Bạn có chắc muốn xóa tour ${name}?`)) {
      const updatedBookings = bookings.filter((b) => b.tourId !== id);
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
      // alert("Đã xóa tất cả bookings liên quan đến tour này!");
      toast.success("Đã xóa tất cả bookings liên quan đến tour này!");
    }
  };

  // Xử lý chỉnh sửa
  const handleEditTour = (tour) => {
    setFormData({
      id: tour.id,
      name: tour.name,
      departure: tour.departure || "",
      destinations: tour.destinations || [],
      duration: tour.duration || "",
      departureDates: tour.departureDates || [],
      price: tour.price || "",
      images: [],
      description: tour.description || "",
      maxPeople: tour.maxPeople ? tour.maxPeople.toString() : "",
      itinerary: tour.itinerary || [],
      category: tour.category || "",
      rating: tour.rating || 0,
      reviews: tour.reviews || 0
    });
    setEditingId(tour.id);
    setIsAdding(false);
    setErrors({});
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: 0,
      name: "",
      departure: "",
      destinations: [],
      duration: "",
      departureDates: [],
      price: "",
      images: [],
      description: "",
      maxPeople: "",
      itinerary: [],
      category: "",
      rating: 0,
      reviews: 0
    });
    setArrayInputs({
      destination: "",
      departureDate: "",
      itineraryDay: "",
      itineraryTitle: "",
      itineraryActivity: ""
    });
    setCurrentItineraryDay(null);
    setErrors({});
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="admin-tours-container">
      <h2 className="admin-tours-title">Quản Lý Tour</h2>
      <button
        className="admin-tours-button"
        onClick={() => {
          setIsAdding(true);
          setEditingId(null);
          // resetForm();
        }}
      >
        Thêm Tour
      </button>
      {(isAdding || editingId) && (
        <form className="admin-tours-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Tên tour *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nhập tên tour"
              aria-required="true"
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="departure">Điểm khởi hành *</label>
            <input
              type="text"
              id="departure"
              name="departure"
              value={formData.departure}
              onChange={handleInputChange}
              placeholder="Nhập điểm khởi hành (VD: TP. Hồ Chí Minh)"
              aria-required="true"
            />
            {errors.departure && <span className="form-error">{errors.departure}</span>}
          </div>
          <div className="form-group">
            <label>Điểm đến *</label>
            <div className="array-input">
              <input
                type="text"
                name="destination"
                value={arrayInputs.destination}
                onChange={handleArrayInputChange}
                placeholder="Nhập điểm đến"
              />
              <button
                type="button"
                className="admin-tours-button add"
                onClick={() => addSimpleArrayItem("destinations")}
              >
                Thêm
              </button>
            </div>
            {formData.destinations.map((item, index) => (
              <div key={index} className="array-item">
                <span>{item}</span>
                <button
                  type="button"
                  className="admin-tours-button delete"
                  onClick={() => removeArrayItem("destinations", index)}
                >
                  Xóa
                </button>
              </div>
            ))}
            {errors.destinations && <span className="form-error">{errors.destinations}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="duration">Thời gian *</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="Nhập thời gian (VD: 3 Ngày 2 Đêm)"
              aria-required="true"
            />
            {errors.duration && <span className="form-error">{errors.duration}</span>}
          </div>
          <div className="form-group">
            <label>Ngày khởi hành *</label>
            <div className="array-input">
              <input
                type="date"
                name="departureDate"
                value={arrayInputs.departureDate}
                onChange={handleArrayInputChange}
              />
              <button
                type="button"
                className="admin-tours-button add"
                onClick={() => addSimpleArrayItem("departureDates")}
              >
                Thêm
              </button>
            </div>
            {formData.departureDates.map((item, index) => (
              <div key={index} className="array-item">
                <span>{item}</span>
                <button
                  type="button"
                  className="admin-tours-button delete"
                  onClick={() => removeArrayItem("departureDates", index)}
                >
                  Xóa
                </button>
              </div>
            ))}
            {errors.departureDates && <span className="form-error">{errors.departureDates}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="price">Giá *</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Nhập giá (VD: 3.990.000 VND)"
              aria-required="true"
            />
            {errors.price && <span className="form-error">{errors.price}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="images">Hình ảnh *</label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleInputChange}
              aria-required="true"
            />
            {formData.images.length > 0 && (
              <div>
                {formData.images.map((file, index) => (
                  <p key={index}>Đã chọn: {file.name}</p>
                ))}
              </div>
            )}
            {errors.images && <span className="form-error">{errors.images}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Mô tả *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Nhập mô tả tour"
              aria-required="true"
            />
            {errors.description && <span className="form-error">{errors.description}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="maxPeople">Số người tối đa *</label>
            <input
              type="number"
              id="maxPeople"
              name="maxPeople"
              value={formData.maxPeople}
              onChange={handleInputChange}
              placeholder="Nhập số người tối đa"
              aria-required="true"
            />
            {errors.maxPeople && <span className="form-error">{errors.maxPeople}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="category">Danh mục *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              aria-required="true"
            >
              <option value="">Chọn danh mục</option>
              <option value="Biển">Biển</option>
              <option value="Văn hóa">Văn hóa</option>
              <option value="Núi">Núi</option>
              <option value="Ẩm thực">Ẩm thực</option>
            </select>
            {errors.category && <span className="form-error">{errors.category}</span>}
          </div>
          <div className="form-group">
            <label>Lịch trình *</label>
            <div className="array-input">
              <input
                type="number"
                name="itineraryDay"
                value={arrayInputs.itineraryDay}
                onChange={handleArrayInputChange}
                placeholder="Ngày (VD: 1)"
              />
              <input
                type="text"
                name="itineraryTitle"
                value={arrayInputs.itineraryTitle}
                onChange={handleArrayInputChange}
                placeholder="Tiêu đề (VD: Khởi hành - Đà Nẵng)"
              />
              <button
                type="button"
                className="admin-tours-button add"
                onClick={addItineraryDay}
              >
                Thêm ngày
              </button>
            </div>
            {formData.itinerary.map((day, dayIndex) => (
              <div key={dayIndex} className="itinerary-day">
                <div className="itinerary-day-header">
                  <span>Ngày {day.day}: {day.title}</span>
                  <button
                    type="button"
                    className="admin-tours-button delete"
                    onClick={() => removeItineraryDay(dayIndex)}
                  >
                    Xóa ngày
                  </button>
                </div>
                <div className="array-input">
                  <input
                    type="text"
                    name="itineraryActivity"
                    value={arrayInputs.itineraryActivity}
                    onChange={handleArrayInputChange}
                    placeholder="Nhập hoạt động"
                  />
                  <button
                    type="button"
                    className="admin-tours-button add"
                    onClick={() => addItineraryActivity(dayIndex)}
                  >
                    Thêm hoạt động
                  </button>
                </div>
                {day.activities.map((activity, activityIndex) => (
                  <div key={activityIndex} className="array-item">
                    <span>{activity}</span>
                    <button
                      type="button"
                      className="admin-tours-button delete"
                      onClick={() => removeItineraryActivity(dayIndex, activityIndex)}
                    >
                      Xóa
                    </button>
                  </div>
                ))}
              </div>
            ))}
            {errors.itinerary && <span className="form-error">{errors.itinerary}</span>}
          </div>
          <div className="form-actions">
            <button type="submit" className="admin-tours-button">
              {isAdding ? "Thêm" : "Lưu"}
            </button>
            <button
              type="button"
              className="admin-tours-button cancel"
              onClick={resetForm}
            >
              Hủy
            </button>
          </div>
        </form>
      )}
      <div className="admin-tours-section">
        <h3>Danh Sách Tour</h3>
        {tours.length > 0 ? (
          <table className="admin-tours-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên tour</th>
                <th>Giá</th>
                <th>Thời gian</th>
                <th>Điểm khởi hành</th>
                <th>Điểm đến</th>
                <th>Danh mục</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => (
                <tr key={tour.id}>
                  <td>{tour.id}</td>
                  <td>{tour.name}</td>
                  <td>{tour.price}</td>
                  <td>{tour.duration}</td>
                  <td>{tour.departure || "Chưa có"}</td>
                  <td>{tour.destinations?.join(", ") || "Chưa có"}</td>
                  <td>{tour.category || "Chưa có"}</td>
                  <td>
                    <button
                      className="admin-tours-button edit"
                      onClick={() => handleEditTour(tour)}
                    >
                      Sửa
                    </button>
                    <button
                      className="admin-tours-button delete"
                      onClick={() => handleDeleteTour(tour.id, tour.name)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Chưa có tour nào.</p>
        )}
      </div>
    </div>
  );
}