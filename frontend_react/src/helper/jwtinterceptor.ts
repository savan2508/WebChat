import axios, {AxiosInstance} from "axios";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../config.ts";

const API_BASE_URL = BASE_URL;

const useAxiosWithInterceptors = (): AxiosInstance => {
    const jwtAxios = axios.create({baseURL: API_BASE_URL});
    const navigate = useNavigate();

    jwtAxios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            if (error.response?.status === 401) {
                navigate("/"); // Directly navigate without defining goRoot function
                return Promise.reject(error); // Ensure the error is still thrown
            }
            return Promise.reject(error); // Propagate other errors
        }
    );
    return jwtAxios;
};

export default useAxiosWithInterceptors;
