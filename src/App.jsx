import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
// import "./styles/ToastifyCustom.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminBookings from "./pages/AdminBookings";
import AdminTours from "./pages/AdminTours";
// import AdminStatistics from "./pages/AdminStatistics";
import defaultTours from "./data/tours";

export default function App() {
  useEffect(() => {
    // Khởi tạo admin
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (!users.some((u) => u.role === "admin")) {
      users.push({
        email: "admin@vntravel.com",
        name: "Admin",
        phone: "0123456789",
        password: "admin123",
        role: "admin"
      });
      localStorage.setItem("users", JSON.stringify(users));
    }
    // Khởi tạo tours
    if (!localStorage.getItem("tours")) {
      localStorage.setItem("tours", JSON.stringify(defaultTours));
    }
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick 
        pauseOnHover 
        draggable 
        theme="light" 
      />
      <Routes>
        {/* Routes cho người dùng thông thường */}
        <Route
          element={
            <div className="app-container">
              <Header />
              <div className="content">
                <Outlet />
              </div>
              <Footer />
            </div>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tours/:id" element={<TourDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment/:tourId/:bookingId" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Routes cho admin */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="tours" element={<AdminTours />} />
          {/* <Route path="statistics" element={<AdminStatistics />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}