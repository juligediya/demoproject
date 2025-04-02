
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


function Protected() {
    const login=useSelector((state)=>state.user.isAuth)
   
    if (!login) {
        return <Navigate to="/login" replace />;
      }
    
      return <Outlet />;

    
}

export default Protected;
