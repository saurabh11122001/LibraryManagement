import React, { useState, useEffect } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser,setLoading } from "../../redux/authSlice";
import { toast } from 'react-hot-toast';
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const validate = () => {
    const newErrors = {};
    // Validate email
    if (!input.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate password
    if (!input.password) {
      newErrors.password = "Password is required";
    } else if (input.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    // Validate role
    if (!input.role) {
      newErrors.role = "Please select a role (User or Admin)";
    }

    setErrors(newErrors);

    // Return false if there are errors
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    dispatch(setLoading(true));
    e.preventDefault();
    
    // Validate the form
    if (!validate()) {
      dispatch(setLoading(false));
      return; // Stop submission if validation fails
    }

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/login`,
        {
          email: input.email,
          password: input.password,
          role: input.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        dispatch(setLoading(false));
        navigate("/home"); // Redirect to home
        setInput({ email: "", password: "", role: "" });  // Reset input fields
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message || error.message);
      dispatch(setLoading(false));
      toast.error(error.response?.data?.message)
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/home"); // Redirect to home if already logged in
    }
    if (user?.role === 'admin') {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="auth-container">
      <h1 className="auth-title">Login to Scholar's Haven</h1>
      <form onSubmit={submitHandler} className="auth-form">
        <div className="form-group">
          <label className="form-label">Role</label>
          <div className="role-options">
            <label className="role-option">
              <input
                type="radio"
                name="role"
                value="user"
                checked={input.role === "user"}
                onChange={changeEventHandler}
              />
              <span className="role-label">User</span>
            </label>
            <label className="role-option">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={input.role === "admin"}
                onChange={changeEventHandler}
              />
              <span className="role-label">Admin</span>
            </label>
          </div>
          {errors.role && <p className="error-message">{errors.role}</p>}
        </div>
  
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-input"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
  
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-input"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            required
          />
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
  
        <button type="submit" className="auth-button">Login</button>
      </form>
  
      <p className="auth-footer">
        Create an account? <Link to="/signup" className="auth-link">Sign up</Link>
      </p>
    </div>
  );
  
};

export default Login;
