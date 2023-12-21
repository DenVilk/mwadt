import axios from "axios";
import {API_URL} from "../config/api";

const secureAPI = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

secureAPI.interceptors.request.use((config) => {
    console.log("set token for headers")
    config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("token"))}`;
    return config;
});

secureAPI.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;
        console.log(error)
        console.log(error.response ? error.response.status : null)
        if (error.response.status == 401 && error.config && !error.config._isRetry) {
            localStorage.removeItem("token")
            return (window.location.href = "/login");
        }
        return Promise.reject(error.message)
    }
);

export default secureAPI;