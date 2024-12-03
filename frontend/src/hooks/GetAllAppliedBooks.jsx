import { setAllBooks } from '../redux/bookSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAllAppliedBooks } from '../redux/bookSlice'
import { setLoading } from '../redux/authSlice'

const useGetAllAppliedBooks = () => {
    const dispatch = useDispatch();
    const {allAppliedBooks} = useSelector(store=>store.book);
    useEffect(()=>{
        const fetchAllAppliedBooks = async () => {
            try {
                dispatch(setLoading(true));
                const res = await axios.get(`http://localhost:8000/api/v1/purchased/my-purchases`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAppliedBooks(res.data.purchases));
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
        fetchAllAppliedBooks();
    },[])
}

export default useGetAllAppliedBooks