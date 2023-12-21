import axios from "axios";
import { API_URL } from "../config/api";


const API = API_URL + "users/";

class UserService {
    async register(email, password) {
        let res;
        await axios.post(`${API}`,{
           email: email,
           password: password
        }
        ).then(response => {

            if (response.data.token){
                localStorage.setItem('token', response.data.token);
            }
            console.log(response.data.token)
            res = response.data.token;
        }, error => {});
        return res;
    }

}

export default new UserService();