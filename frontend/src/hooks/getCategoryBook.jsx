import { setCategoryBook } from '../redux/bookSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../redux/authSlice'

const getCategoryBook = (name) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllBooks = async () => {
            try {
                dispatch(setLoading(true));
                const res = await axios.get(`http://localhost:8000/api/v1/book/category/${name}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setCategoryBook(res.data.books));
                    console.log(name);
                    dispatch(setLoading(false));
                }
            } catch (error) {
                console.log(error);
                dispatch(setLoading(false));
            }
            finally{
                dispatch(setLoading(false));
            }
        }
        fetchAllBooks();
    },[])
}

export default getCategoryBook