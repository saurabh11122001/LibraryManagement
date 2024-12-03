import React, { useState } from "react";
import './maintain.css'
import useGetAllUsers from "../../hooks/getAllUsers";
import { useSelector } from "react-redux";
import axios from "axios";
import { setAllUsers } from "../../redux/authSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const Maintain = () => {
  useGetAllUsers();
  const {allUsers}= useSelector(store=>store.auth);
  const handleDelete = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:8000/api/v1/user/delete/${id}`, { withCredentials: true });
        if (res.data?.success) {
            // Filter out the deleted book from the local state
            const updatedUsers = allUsers.filter((user) => user._id !== id);
            dispatch(setAllUsers(updatedUsers)); // Update the Redux store
            console.log("User deleted successfully");
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error("Error deleting book:", error);
        toast.error(error.response?.data?.message)
    }
};
  return (
    <div className="users-management">
      <h1 className="title">User Management</h1>
      <Link to="/managebook" className="manage"><h3>Manage Book</h3></Link>
      {allUsers?.length === 0 ? (
        <p>No users available!</p>
      ) : (
        <table className="user-list">
          <thead>
            <tr>
              <th>SNo.</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Contact Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
               
                <td>
                  <button
                    className="delete-user-btn"
                    onClick={() => handleDelete(user._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Maintain;
