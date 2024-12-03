import React from "react";
import './category.css';
import { useParams, Link } from "react-router-dom";
import getCategoryBook from "../../hooks/getCategoryBook";
import { useSelector } from "react-redux";

const CategoryPage = () => {
  const { categoryBook } = useSelector(store => store.book);
  const { name } = useParams();
  const categoryName = name;
  getCategoryBook(name);

  return (
    <div className="category-page-container">
      <h1 className="category-title">{categoryName}</h1>
      {categoryBook.length < 1 ? <small>Not Found</small> : ''}
      <div className="book-list">
        {categoryBook?.map((book, index) => (
          <div className="book-card" key={index}>
            <h3 className="book-card-title">Book Name: {book.bookname}</h3>
            <p className="book-card-author">Author: {book.author}</p>
            <Link to={`/details/${book._id}`} className="details-button">
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
