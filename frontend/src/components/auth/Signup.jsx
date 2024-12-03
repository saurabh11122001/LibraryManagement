import React, { useState, useEffect } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = { fullname: "", email: "", phoneNumber: "", password: "", role: "" };
    let isValid = true;

    if (!input.fullname) {
      formErrors.fullname = "Full Name is required.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input.email) {
      formErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(input.email)) {
      formErrors.email = "Please enter a valid email.";
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!input.phoneNumber) {
      formErrors.phoneNumber = "Phone number is required.";
      isValid = false;
    } else if (!phoneRegex.test(input.phoneNumber)) {
      formErrors.phoneNumber = "Please enter a valid 10-digit phone number.";
      isValid = false;
    }

    if (!input.password) {
      formErrors.password = "Password is required.";
      isValid = false;
    } else if (input.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    if (!input.role) {
      formErrors.role = "Role is required.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        setInput({
          fullname: "",
          email: "",
          phoneNumber: "",
          password: "",
          role: "",
        });
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div className="auth-container">
      <h1 className="auth-title">Create an Account</h1>
      <form onSubmit={submitHandler} className="auth-form">
        <div className="form-group">
          <label htmlFor="fullname" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            className="form-input"
            value={input.fullname}
            onChange={changeEventHandler}
            required
          />
          {errors.fullname && <div className="error-text">{errors.fullname}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={input.email}
            onChange={changeEventHandler}
            required
          />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className="form-input"
            value={input.phoneNumber}
            onChange={changeEventHandler}
            required
          />
          {errors.phoneNumber && <div className="error-text">{errors.phoneNumber}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={input.password}
            onChange={changeEventHandler}
            required
          />
          {errors.password && <div className="error-text">{errors.password}</div>}
        </div>
        <div className="form-group">
          <label className="form-label">Role</label>
          <div className="role-options">
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={input.role === "user"}
                onChange={changeEventHandler}
              />
              User
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={input.role === "admin"}
                onChange={changeEventHandler}
              />
              Admin
            </label>
          </div>
          {errors.role && <div className="error-text">{errors.role}</div>}
        </div>
        <button type="submit" className="auth-button">
          Sign Up
        </button>
      </form>
      <p className="auth-footer">
        Already have an account? <Link to="/" className="auth-link">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
