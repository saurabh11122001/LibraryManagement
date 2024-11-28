import React from "react";
import "./categoryPage.css";   

const CategoryPage = () => {
  const categoryName = "Fiction"; 

  const books = [
    { 
      title: "Book 1", 
      author: "Author 1", 
      price: "$15.99"
    },
    { 
      title: "Book 2", 
      author: "Author 2", 
      price: "$12.49"
    },
    { 
      title: "Book 3", 
      author: "Author 3", 
      price: "$20.00"
    }
    // Add more books here if needed
  ];

  return (
    <>
    <div className="category-page">
      <h1 className="category-name">{categoryName}</h1>
      <div className="books-container">
        {books.map((book, index) => (
          <div className="book-box" key={index}>
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">{book.author}</p>
            <p className="book-price">{book.price}</p>
            <button className="purchase-btn">Purchase</button>
            <p className="">Available</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default CategoryPage;
