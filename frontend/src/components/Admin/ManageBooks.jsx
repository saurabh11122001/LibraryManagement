import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import useGetAllBooks from "../../hooks/getAllBooks";
import { Link } from "react-router-dom";
import { setAllBooks } from "../../redux/bookSlice";
import "./ManageBooks.css"; // Import the CSS file
import toast from "react-hot-toast";

const ManageBooks = () => {
  useGetAllBooks();
  const dispatch = useDispatch();
  const { allBooks } = useSelector((store) => store.book);

  const [isEditing, setIsEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/book/delete/${id}`,
        { withCredentials: true }
      );
      if (res.data?.success) {
        const updatedBooks = allBooks.filter((book) => book._id !== id);
        dispatch(setAllBooks(updatedBooks));
        console.log("Book deleted successfully");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error(error.response?.data?.message)
    }
  };

  const handleEdit = (book) => {
    setCurrentBook(book);
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/book/update/${currentBook._id}`,
        currentBook,
        { withCredentials: true }
      );
      if (res.data?.success) {
        const updatedBooks = allBooks.map((book) =>
          book._id === currentBook._id ? currentBook : book
        );
        dispatch(setAllBooks(updatedBooks));
        console.log("Book updated successfully");
        setIsEditing(false);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error(error.response?.data?.message)
    }
  };

  return (
    <div className="manage-books-container">
      <h1 className="title">Book Management</h1>
      <Link to="/maintain">
        <h3 className="manage"style={{height:'30px',width:'80px',marginLeft:'10px'}}>Manage User</h3>
      </Link>
      {allBooks?.length === 0 ? (
        <p className="no-books-message">No books available!</p>
      ) : (
        <table className="books-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Price</th>
              <th>Category</th>
              <th>Description</th>
              <th>Total Books</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {allBooks?.map((items, index) => (
              <tr key={items?._id}>
                <td>{index + 1}</td>
                <td>{items?.bookname}</td>
                <td>{items?.author}</td>
                <td>{items?.price}</td>
                <td>{items?.category}</td>
                <td>{items?.description}</td>
                <td>{items?.total}</td>
                <td>
                  <button
                    onClick={() => handleDelete(items._id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleEdit(items)}
                    className="update-button"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isEditing && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h2 className="popup-title">Update Book</h2>
            <form onSubmit={handleUpdate}>
              <label className="form-label">
                Book Name:
                <input
                  type="text"
                  value={currentBook.bookname}
                  onChange={(e) =>
                    setCurrentBook({ ...currentBook, bookname: e.target.value })
                  }
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Author:
                <input
                  type="text"
                  value={currentBook.author}
                  onChange={(e) =>
                    setCurrentBook({ ...currentBook, author: e.target.value })
                  }
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Price:
                <input
                  type="number"
                  value={currentBook.price}
                  onChange={(e) =>
                    setCurrentBook({ ...currentBook, price: e.target.value })
                  }
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Category:
                <input
                  type="text"
                  value={currentBook.category}
                  onChange={(e) =>
                    setCurrentBook({ ...currentBook, category: e.target.value })
                  }
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Description:
                <input
                  type="text"
                  value={currentBook.description}
                  onChange={(e) =>
                    setCurrentBook({ ...currentBook, description: e.target.value })
                  }
                  className="form-input"
                />
              </label>
              <label className="form-label">
                Total Books:
                <input
                  type="number"
                  value={currentBook.total}
                  onChange={(e) =>
                    setCurrentBook({ ...currentBook, total: e.target.value })
                  }
                  className="form-input"
                />
              </label>
              <div className="form-buttons">
                <button type="submit" className="save-button">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
