import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {Box, Typography} from "@mui/material";
import {useAuthServiceContext} from "../context/AuthContext.tsx";

export const Login = () => {
	const {login} = useAuthServiceContext();
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		onSubmit: async (values) => {
			const {username, password} = values;
			const res = await login(username, password);
			if (res) {
				console.log(res);
			} else {
				navigate("/");
			}
		},
	});
	return (
		<Box>
			<Typography>Login</Typography>
			<form onSubmit={formik.handleSubmit}>
				<label htmlFor="username">Username</label>
				<input
					id="username"
					type="text"
					name="username"
					onChange={formik.handleChange}
					value={formik.values.username}
				/>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					type="password"
					name="password"
					onChange={formik.handleChange}
					value={formik.values.password}
				/>
				<button type="submit">Login</button>
			</form>
		</Box>
	);
};