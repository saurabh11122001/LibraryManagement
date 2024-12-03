import { setAllApplicants } from "../redux/requestSlice"; 
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setLoading } from "../redux/authSlice";

const useGetAllReqBooks = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchReqBooks = async () => {
            try {
                dispatch(setLoading(true));
                const res = await axios.get(`http://localhost:8000/api/v1/purchased/getApplicants`, {withCredentials:true});
                if(res.data.success){
                    dispatch(setAllApplicants(res.data.applicants));
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
        fetchReqBooks();
    },[])
};
export default useGetAllReqBooks;