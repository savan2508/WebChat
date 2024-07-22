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
			const originalRequest = error.config;
			if (error.response?.status === 401 || 403) {
				const refreshToken = localStorage.getItem("refresh_token");
				if (refreshToken) {
					try {
						const response = await axios.post(
							`${API_BASE_URL}/token/refresh/`,
							{refresh: refreshToken}
						);
						const newAccessToken = response.data.access;
						localStorage.setItem("access_token", newAccessToken);
						originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
						return jwtAxios(originalRequest);
					} catch (refreshError) {
						navigate("/login");
						throw refreshError;
					}
				} else {
					navigate("/login");
				}
			}
			return Promise.reject(error); // Propagate other errors
		}
	);
	return jwtAxios;
};

export default useAxiosWithInterceptors;
