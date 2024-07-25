import axios from "axios";
import {AuthServiceProps} from "../@types/auth-serviceD.ts";
import {useState} from "react";
import {BASE_URL} from "../config.ts";
import {useNavigate} from "react-router-dom";

export function useAuthService(): AuthServiceProps {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
		const loggedIn = localStorage.getItem("isLoggedIn");
		if (loggedIn !== null) {
			return Boolean(loggedIn);
		} else {
			return false;
		}
	})

	const getUserDetails = async () => {
		try {
			const userId = localStorage.getItem("userId");
			const response = await axios.get(
				`http://127.0.0.1:8000/api/account/?user_id=${userId}`, {
					withCredentials: true,
				}
			)
			const userDetails = response.data;
			localStorage.setItem("username", JSON.stringify(userDetails));
			setIsLoggedIn(true);
		} catch (error: any) {
			setIsLoggedIn(false);
			console.log(error);
			localStorage.setItem("isLoggedIn", "false");
		}
	}


	const login = async (username: string, password: string) => {
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/token/", {
					username: username,
					password: password,
				},
			);
			const userId = response.data.user_id;
			localStorage.setItem("userId", userId);
			localStorage.setItem("isLoggedIn", "true");

			setIsLoggedIn(true);

			getUserDetails();

		} catch (error: any) {
			return error;
		}
	}

	const refreshAccessToken = async () => {
		try {
			await axios.post(
				`${BASE_URL}/token/refresh/`, {}, {withCredentials: true}
			)
		} catch (refreshError: any) {
			return Promise.reject(refreshError);
		}
	}

	const logout = () => {
		localStorage.setItem("isLoggedIn", "false");
		localStorage.removeItem("userId");
		localStorage.removeItem("username");
		setIsLoggedIn(false);
		navigate("/login");
	}

	return {login, isLoggedIn, logout, refreshAccessToken};
}