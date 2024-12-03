import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Assuming user state is managed by Redux
  const { user } = useSelector((store) => store.auth);


  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Toggle the popup
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Logout Handler
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Title */}
        <div className="navbar-title">
          <Link to="/">Scholar's Haven</Link>
        </div>

        {/* Links */}
        <div className="navbar-links">
        {user ? (
    user?.role === 'user' ? (
      // Admin Links
      <>
        <Link to="/home">Home</Link>
        <Link to="/books">All Books</Link>
        <Link to="/purchased">My Books</Link>
      </>
    ) : (
      // User Links
      <>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/issue">Book Issued</Link>
        <Link to="/maintain">Maintenance</Link>
      </>
    )
  ) : null}

          {/* Profile Circle */}
          {user?<div className="profile-container" onClick={togglePopup}>
            <div className="profile-circle">
              {user?.fullname ? user.fullname.charAt(0).toUpperCase() : "S"}
            </div>
            {isPopupOpen && (
              <div className="profile-popup">
                <p>
                  <strong>Name:</strong> {user?.fullname || "John Doe"}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email || "johndoe@example.com"}
                </p>
                <p>
                  <strong>Phone:</strong> {user?.phoneNumber || "+123456789"}
                </p>
                <button onClick={logoutHandler} className="logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>:<Link to="/">Login</Link>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
