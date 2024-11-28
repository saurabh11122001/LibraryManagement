import React, { useEffect } from "react";
import "./books.css"; // Assuming your CSS is in the same folder
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllBooks from "../hooks/getAllBooks";

const Books = () => {
    const { user} = useSelector(store => store.auth);
    const { allBooks} = useSelector(store => store.book);
    useGetAllBooks();
    const navigate= useNavigate();
    console.log(allBooks)
    useEffect(()=>{
      if(user?.role==='admin'){
          navigate("/dashboard");
      }
  },[]);

  const handlePurchase = (bookTitle) => {
    alert(`${bookTitle} has been purchased!`);
  };

  return (
    <div className="books-page">
      <h1 className="books-title">Books Collection</h1>
      <div className="books-container">
        {allBooks?.map((book, index) => (
          <div className="book-box" key={index}>
            <h3 className="book-title"><strong>Book Name: </strong>{book.bookname}</h3>
            <p className="book-author"><strong>Author: </strong>{book.author}</p>
            <p className="book-price"><strong>Price Rs: </strong>{book.price}</p>
            <p className="book-price"><strong>BookId: </strong>{book.bookid}</p>
            <small>Available</small>
            <button 
              className="purchase-button" 
              onClick={() => handlePurchase(book._id)}
            >
              Purchase
            </button>
  
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
