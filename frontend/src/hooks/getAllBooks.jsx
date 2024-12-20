import { setAllBooks } from '../redux/bookSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../redux/authSlice'

const useGetAllBooks = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.book);
    useEffect(()=>{
        const fetchAllBooks = async () => {
            try {
                dispatch(setLoading(true));
                const res = await axios.get(`http://localhost:8000/api/v1/book/get?keyword=${searchedQuery}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllBooks(res.data.books));
                    dispatch(setLoading(false))
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
            finally{
                setLoading(false);
            }
        }
        fetchAllBooks();
    },[])
}

export default useGetAllBooks