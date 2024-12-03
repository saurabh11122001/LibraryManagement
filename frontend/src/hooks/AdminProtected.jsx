import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminProtected = ({children}) => {
    const {user} = useSelector(store=>store.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if(user===null || user?.role!=='admin'){
          navigate("/");
        }
        if(user?.role==='user'){
          navigate("/home");
        }
      }, []);

    return (
        <>
        {children}
        </>
    )
};
export default AdminProtected;