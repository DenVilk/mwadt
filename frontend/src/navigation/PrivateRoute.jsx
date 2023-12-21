import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = (props) => {
    const isAuthorized = useSelector(state => state.auth.isAuthorized)
    console.log(isAuthorized)
    if (isAuthorized){
        return <Outlet />
    }else{
        return <Navigate to='/login' />
    }
}

// const PrivateRoute = ({ element: Component, handleChildFunc, ...rest }) => {
//     const isAuthorized = useSelector(state => state.auth.isAuthorized)
//     return <Route {...rest} render={(props) => (
//         isAuthorized !== null
//             ? <Component {...props} handleChildFunc={handleChildFunc}/>
//             : <Redirect to='/login' />
//         )} 
//     />
// }

export default PrivateRoute;