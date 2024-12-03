import React, { useEffect, useState } from "react";
import "./bookissue.css";
import useGetAllReqBooks from "../../hooks/GetAllRequestedBooks";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

export const BookIssue = () => {
  const { applicants } = useSelector((store) => store.application);
  const [localApplicants, setLocalApplicants] = useState(applicants || []);
  const [searchTerm, setSearchTerm] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats the date as MM/DD/YYYY
  };

  // Function to calculate the return date (30 days after issued date)
  const calculateReturnDate = (issuedDate) => {
    const date = new Date(issuedDate);
    date.setDate(date.getDate() + 30); // Adds 30 days to the issued date
    return date.toLocaleDateString(); // Formats the return date as MM/DD/YYYY
  };

  useEffect(() => {
    setLocalApplicants(applicants || []);
  }, [applicants]);

  const statusHandler = async (status, id) => {
    console.log("called");
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.patch(
        `http://localhost:8000/api/v1/purchased/status/${id}/update`,
        { status }
      );
      console.log(res);
      if (res.data.success) {
        // Update the local state
        setLocalApplicants((prev) =>
          prev.map((request) =>
            request._id === id ? { ...request, status } : request
          )
        );
        console.log("Status updated:", res.data.status);
        toast.success(`Request of Book is ${status}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  useGetAllReqBooks();

  // Handle search and filter rows
  const filteredApplicants = localApplicants.filter((request) => {
    const searchTermLower = searchTerm.toLowerCase();

    const applicantName = request?.applicant?.fullname || "";
    const bookName = request?.book?.bookname || "";
    const bookId = String(request?.book?.bookid || ""); // Ensure bookid is a string
    const author = request?.book?.author || "";

    return (
      applicantName.toLowerCase().includes(searchTermLower) ||
      bookName.toLowerCase().includes(searchTermLower) ||
      bookId.toLowerCase().includes(searchTermLower) ||
      author.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <div className="book-issue-page">
      <h1>Book Issue Requests</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by Name, Book Name, ID, or Author"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        className="search-bar"
      />

      <table className="request-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name of Requestor</th>
            <th>Book Name</th>
            <th>Book ID</th>
            <th>Author</th>
            <th>Price</th>
            <th>Issued Date</th>
            <th>Return Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplicants.length > 0 ? (
            filteredApplicants.map((request, index) => (
              <tr key={request._id}>
                <td>{index + 1}</td>
                <td>{request?.applicant?.fullname}</td>
                <td>{request?.book?.bookname}</td>
                <td>{request?.book?.bookid}</td>
                <td>{request?.book?.author}</td>
                <td>{request?.book?.price}</td>
                <td>
                  {request?.status === "pending" ||
                  request?.status === "rejected"
                    ? "-"
                    : formatDate(request?.updatedAt) || "-"}
                </td>{" "}
                {/* Display Issued Date or N/A if pending */}
                <td>
                  {request?.status === "pending" ||
                  request?.status === "rejected"
                    ? "-"
                    : calculateReturnDate(request?.updatedAt) || "-"}
                </td>{" "}
                {/* Display Return Date or N/A if pending */}
                <td>
                  {request?.status === "pending" ? (
                    <div>
                      <button
                        className="accept-button"
                        onClick={() => statusHandler("accepted", request?._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="reject-button"
                        onClick={() => statusHandler("rejected", request?._id)}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <button
                      className={`${
                        request?.status === "accepted"
                          ? "accept-button"
                          : request?.status === "returned"
                          ? "return-button"
                          : "reject-button"
                      }`}
                    >
                      {request?.status}
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookIssue;
