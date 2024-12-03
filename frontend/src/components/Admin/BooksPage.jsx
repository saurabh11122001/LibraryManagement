import React, { useState, useEffect } from "react";
import "./books.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"; // Ensure axios is installed
import useGetAllBooks from "../../hooks/getAllBooks";
import { setAllBooks, setSearchedQuery } from "../../redux/bookSlice";
import { setLoading } from "../../redux/authSlice";
import { setAllApplicants } from "../../redux/requestSlice";
import toast from "react-hot-toast";

const BooksPage = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setAllApplicants([]));
  }, []);
  
  // Reset search query when page is loaded
  dispatch(setSearchedQuery(""));
  useGetAllBooks();
  const { allBooks } = useSelector((store) => store.book);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Initial state for the form inputs
  const [input, setInput] = useState({
    bookname: "",
    bookid: "",
    author: "",
    price: "",
    category: "",
    description: "",
    total: "",
  });

  const { singleBook } = useSelector((store) => store.book) || {}; // Add fallback for undefined singleBook
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  // Handle changes to input fields
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    // Prepare data to send
    const data = {
      bookname: input.bookname,
      author: input.author,
      price: input.price,
      bookid: input.bookid,
      category: input.category,
      description:input.description,
      total:input.total
    };

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/book/add`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        // Reset the form inputs after successful submission
        console.log('success')
        setInput({
          bookname: "",
          bookid: "",
          author: "",
          price: "",
          category: "",
          description: "",
          total: "",
        });
        dispatch(setLoading(false));
        setShowForm(false);
        dispatch(setAllBooks([...allBooks, res.data.book]));
        // Redirect to the dashboard after adding the book
        navigate("/dashboard");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
      toast.error(error.response?.data?.message);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/book/delete/${id}`,
        { withCredentials: true }
      );
      if (res.data?.success) {
        // Filter out the deleted book from the local state
        const updatedBooks = allBooks.filter((book) => book._id !== id);
        dispatch(setAllBooks(updatedBooks)); // Update the Redux store
        console.log("Book deleted successfully");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error(error.response?.data?.message)
    }
  };

  // Reset form inputs when opening the Add Book form
  const openForm = () => {
    setInput({
      bookname: "",
      bookid: "",
      author: "",
      price: "",
      category: "",
      description:"",
      total:""
    });
    setShowForm(true);
  };

  useEffect(() => {
    setInput({
      bookname: singleBook?.bookname || "",
      author: singleBook?.author || "",
      price: singleBook?.price || "",
      bookid: singleBook?.bookid || "",
      category: singleBook?.category || "",
      description: singleBook?.description || "",
      total: singleBook?.total || "",
    });
  }, [singleBook]);

  // Filter books based on the search query
 // Filter books based on the search query
const filteredBooks = allBooks?.filter((book) => {
  const searchLower = searchQuery.toLowerCase(); // Convert the search query to lowercase
  return (
    book.bookid?.toString().toLowerCase().includes(searchLower) ||
    book.bookname?.toLowerCase().includes(searchLower) ||
    book.price?.toString().toLowerCase().includes(searchLower) ||
    book.author?.toString().toLowerCase().includes(searchLower) ||
    book.category?.toLowerCase().includes(searchLower)
  );
});


  return (
    <div className="books-page">
      <h1 className="books-title">Books Collection</h1>

      {/* Add Book Button */}
      <button className="add-book-button" onClick={openForm}>
        Add Book
      </button>

      {/* Search Bar */}
      <input
        type="text"
        className="search-bar2"
        placeholder="Search Books by ID,bookname,price"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Table for displaying books */}
      <table className="books-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Price</th>
            <th>Book ID</th>
            <th>Category</th>
            <th>Total Books</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks?.map((book, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{book.bookname}</td>
              <td>{book.author}</td>
              <td>Rs.{book.price}</td>
              <td>{book.bookid}</td>
              <td>{book.category}</td>
              <td>{book.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding a new book */}
      {showForm && (
        <div className="form-modal">
          <form className="book-form" onSubmit={submitHandler}>
            <h2>Add a New Book</h2>
            <label>
              Book Name:
              <input
                type="text"
                name="bookname"
                value={input.bookname}
                onChange={changeEventHandler}
                required
              />
            </label>
            <label>
              Author:
              <input
                type="text"
                name="author"
                value={input.author}
                onChange={changeEventHandler}
                required
              />
            </label>
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={input.price}
                onChange={changeEventHandler}
                required
              />
            </label>
            <label>
              Book ID:
              <input
                type="text"
                name="bookid"
                value={input.bookid}
                onChange={changeEventHandler}
                required
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                name="category"
                value={input.category}
                onChange={changeEventHandler}
                required
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                required
              />
            </label>
            <label>
              Total:
              <input
                type="number"
                name="total"
                value={input.total}
                onChange={changeEventHandler}
                required
              />
            </label>

            <div className="form-actions">
              <button type="submit">Add Book</button>
              <button type="button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
