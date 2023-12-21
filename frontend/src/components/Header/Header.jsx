import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/slices/auth";
import "./Header.css"


export default function Header() {
    const isAuthorized = useSelector(state => state.auth.isAuthorized);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();


    const logout_handler = async (e) => {
        if (!isAuthorized) return;

        localStorage.removeItem('token');
        dispatch(logout());
    }


    return (
        <nav>
            <h2 className="company-name"><a href="{% url 'index' %}">ZooWand</a></h2>

            <ul>
                <li id="current-datetime"></li>
                <li id="countdown"></li>
                <li>
                    <Link to='/'>Index</Link>
                </li>
                <li>
                    <Link to='/animals/'>Animals</Link>
                </li>
                {isAuthorized && user.role == "ADMIN" &&
                    <Link to='/animals/create'>Create Animal</Link>
                }
                <li>
                    {
                        isAuthorized ?
                            <Link onClick={logout_handler}>Logout</Link>
                            :
                            <Link to="/login">Login</Link>
                    }
                </li>
            </ul>
        </nav>
    )
}