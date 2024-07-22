import axios from "axios";
import {AuthServiceProps} from "../@types/auth-serviceD.ts";
import {useState} from "react";

export function useAuthService(): AuthServiceProps {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
		const loggedIn = localStorage.getItem("isLoggedIn");
		if (loggedIn !== null) {
			return Boolean(loggedIn);
		} else {
			return false;
		}
	})

	// const getUserDetails = async () => {
	// 	try {
	// 		const userId = localStorage.getItem("userId");
	// 		const accessToken = localStorage.getItem("access_token");
	// 		const response = await axios.get(
	// 			`http://127.0.0.1:8000/api/user/?user_id=${userId}`, {
	// 				headers: {
	// 					Authorization: `Bearer ${accessToken}`
	// 				}
	// 			}
	// 		)
	// 		const userDetails = response.data;
	// 		localStorage.setItem("userDetails", JSON.stringify(userDetails));
	// 		localStorage.setItem("isLoggedIn", "true");
	// 	} catch (error: any) {
	// 		setIsLoggedIn(false);
	// 		console.log(error);
	// 		localStorage.setItem("isLoggedIn", "false");
	// 	}
	// }

	const getUserIDFromToken = (token: string) => {
		const tokenParts = token.split('.');
		const encodedPayload = tokenParts[1];
		const decodedPayload = atob(encodedPayload);
		const payLoadData = JSON.parse(decodedPayload);
		return payLoadData.user_id;
	}


	const login = async (username: string, password: string) => {
		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/token/", {withCredentials: true}
			);
			localStorage.setItem("isLoggedIn", "true");

			setIsLoggedIn(true);

			// getUserDetails();

		} catch (error: any) {
			return error;
		}
	}

	const logout = () => {
		localStorage.setItem("isLoggedIn", "false");
		setIsLoggedIn(false);
	}

	return {login, isLoggedIn, logout};
}