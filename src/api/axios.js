import axios from 'axios'
import { toast } from "react-toastify";
import {store} from "../store/store";
import { logout } from "../Features/UserSlice";


const api = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true
})



api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await axios.post(
                    "http://localhost:8000/api/refresh",
                    {},
                    {
                        withCredentials: true,
                    }
                );
                
                return api(originalRequest);
            } catch (refreshError) {
                toast.error("Session expire. Please login again")
                
                store.dispatch(logout());
                window.location.href = "/signin"
                return Promise.reject(error);
            }
        }
    }
)
export default api;