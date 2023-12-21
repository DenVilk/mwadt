import { Link } from "react-router-dom";
import "./Row.css"
import { useSelector } from "react-redux";

const Row = ({id, subject, values=[]}) => {
    const isAuthorized = useSelector(state => state.auth.isAuthorized);
    const user = useSelector(state => state.auth.user);
    return (
        <tr>
            {
                values.map(value=><td>{typeof value === 'object'? value.name:value}</td>)
            }
            <td><Link className="btn bg-blue" to={`/${subject}/${id}`}>View</Link></td>
            {
                isAuthorized &&
                user.role == 'ADMIN' &&
                <td><Link className="btn bg-blue" to={`/${subject}/${id}/delete`}>Delete</Link></td>
            }
        </tr>
    )

}

export default Row;