import React, { useEffect, useState } from "react";
import "./books.css"; // Assuming your CSS is in the same folder
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useGetAllBooks from "../hooks/getAllBooks";
import axios from "axios";

const Books = () => {
    const { user } = useSelector((store) => store.auth);
    const { allBooks } = useSelector((store) => store.book);
    const navigate = useNavigate();
    useGetAllBooks()
    useEffect(() => {
        if (user?.role === "admin") {
            navigate("/dashboard");
        }
    }, []);

    return (
        <div className="books-page">
            <h1 className="books-title">Books Collection</h1>
            <div className="books-container">
                {allBooks?.map((book) => (
                    <div className="book-item" key={book._id}>
                        <h3 className="book-header">
                            <strong>Book Name: </strong>
                            {book.bookname}
                        </h3>
                        <p className="book-writer">
                            <strong>Author: </strong>
                            {book.author}
                        </p>
                        <Link to={`/details/${book._id}`}
                            className="buy-button"
                            >Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Books;
