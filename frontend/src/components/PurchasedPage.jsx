import React, { useEffect, useState } from "react";
import "./purchased.css";
import useGetAllAppliedBooks from "../hooks/GetAllAppliedBooks";
import { useSelector } from "react-redux";
import axios, { all } from "axios";

const PurchasedPage = () => {

  useGetAllAppliedBooks();
  const { allAppliedBooks } = useSelector((store) => store.book);
  const [Local, setLocal] = useState(allAppliedBooks || []);



  useEffect(() => {
    setLocal(allAppliedBooks || []);
  }, [allAppliedBooks]);


  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };


  const statusHandler = async (status, id) => {
    console.log(status, id);
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.patch(
        `http://localhost:8000/api/v1/purchased/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        setLocal((prev) =>
          prev.map((request) =>
            request._id === id ? { ...request, status } : request
          )
        );
        console.log("Status updated:", res.data.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="purchased-page">
      <h1 className="purchased-title">Your Issued Books</h1>
      {Local?.length === 0 ? (
        <p>No books purchased yet!</p>
      ) : (
        <table className="purchased-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Price (Rs)</th>
              <th>Issued Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Local?.map((items, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{items?.book?.bookname}</td>
                <td>{items?.book?.author}</td>
                <td>{items?.book?.price}</td>
                <td>{items?.status==='rejected'?'-':formatDate(items?.createdAt)}</td>
                <td>{items?.status}</td>
                <td>
                  {items?.status === "accepted" ? (
                    <button
                      className="return-button"
                      onClick={() =>
                        statusHandler("returned", items?._id)
                      }
                    >
                      Return
                    </button>
                  ) : items?.status === "rejected" ? (
                    <span className="rejected-reason">Reason</span>
                  ) : items?.status === "returned" ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      Returned
                    </span>
                  ) : (
                    <span>Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PurchasedPage;
