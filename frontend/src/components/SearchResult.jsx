import React, { useEffect } from 'react';
import './SearchResult.css'; // Importing the CSS file
import { useDispatch, useSelector } from 'react-redux';
import useGetAllBooks from '../hooks/getAllBooks';
import { setSearchedQuery } from '../redux/bookSlice';
import { Link } from 'react-router-dom';

const SearchResult = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setSearchedQuery(""))
    },[])
    useGetAllBooks();
    const { allBooks} = useSelector(store => store.book);

  return (
    <div className="search-result">
     
      <h1 className="heading">Total Books: {allBooks.length}</h1>

      {/* Books Table */}
      <div className="table-container">
        <table className="books-table2">
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allBooks.map((book, index) => (
              <tr key={index}>
                <td>{book?.bookname}</td>
                <td>{book?.author}</td>
                <td>{book?.category}</td>
                <td>{book?.price}</td>
                <td>5</td>
                <td>
                  <Link to={`/details/${book._id}`} className="get-button">Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchResult;
