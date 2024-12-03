import React, { useState,useEffect } from 'react';
import './bookdetails.css'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleBook } from '../redux/bookSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
const BookDetails = () => {
    const {singleBook} = useSelector(store => store.book);
    const {user} = useSelector(store=>store.auth);
    const isInitiallyRequest = singleBook?.applications?.some(application => application.applicant === user?._id) || false;
    const [isRequested, setIsRequested] = useState(isInitiallyRequest);
    const params = useParams();
    const bookid = params.id;
    const dispatch = useDispatch();
    const handlePurchase = async () => {
        try {
            const res = await axios.post(
                `http://localhost:8000/api/v1/purchased/purchase/${bookid}`,
                {},
                { withCredentials: true }
            );

            if (res.data.success) {
                setIsRequested(true); 
                const updatedSingleBook = {...singleBook, applications:[...singleBook.applications,{applicant:user?._id}]}
                dispatch(setSingleBook(updatedSingleBook)); 
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error)
        }
    };
    useEffect(()=>{
        const fetchSingleBook = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/book/get/${bookid}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleBook(res.data.book));
                    setIsRequested(res.data.book.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleBook(); 
    },[bookid,dispatch, user?._id]);
  return (
    <div className="book-details-page">
      <div className="book-details-container">
        {/* Left side - Book Details */}
        <div className="book-details-info">
          <h2>{singleBook?.bookname}</h2>
          <p><strong>Author:</strong> {singleBook?.author}</p>
          <p><strong>Price:</strong> Rs. {singleBook?.price}</p>
          <p><strong>Category:</strong> {singleBook?.category}</p>
          <p><strong>Available:</strong>{singleBook?.total}</p>
          <p><strong>Description:</strong>{singleBook?.description}</p>
        </div>
        {/* Right side - Get Book Button */}
        <div className="book-action">
          <button
          onClick={isRequested ? null : handlePurchase}
          disabled={isRequested}
           className="get-book-button">{isRequested ? 'Requested' : 'Get Now'}</button>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
