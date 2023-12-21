import axios from "axios";
import { API_URL } from "../config/api";


const AUTH_API = API_URL + "users/";

class AuthService {
    async login(email, password) {
        let res;
        await axios.post(`${AUTH_API}login`,{
            email: email,
            password: password,
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

    async loginWithGoogle(email, id) {
        let res;
        await axios.post(`${AUTH_API}callback/google`,{
            email: email,
            id: id
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

    logout(){
        localStorage.removeItem('token');
    }
}

export default new AuthService();