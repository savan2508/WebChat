import axios, {AxiosInstance} from "axios";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../config.ts";
import {useAuthService} from "../services/AuthServices.ts";

const API_BASE_URL = BASE_URL;

const useAxiosWithInterceptors = (): AxiosInstance => {
	const jwtAxios = axios.create({baseURL: API_BASE_URL});
	const navigate = useNavigate();
	const {logout} = useAuthService();

	jwtAxios.interceptors.response.use(
		(response) => {
			return response;
		},
		async (error) => {
			const originalRequest = error.config;
			if (error.response?.status === 401 || 403) {
				axios.defaults.withCredentials = true;
				try {
					const response = await axios.post(
						`${API_BASE_URL}/token/refresh/`,
					);
					if (response["status"] === 200) {
						return jwtAxios(originalRequest);
					}
				} catch (refreshError) {
					logout();
					const goLogin = () => navigate("/login");
					goLogin();
					throw refreshError;
				}
			}
			return Promise.reject(error); // Propagate other errors
		}
	);
	return jwtAxios;
};

export default useAxiosWithInterceptors;
