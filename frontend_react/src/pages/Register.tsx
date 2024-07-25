import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {Box, Button, Container, TextField} from "@mui/material";
import {useAuthServiceContext} from "../context/AuthContext.tsx";

export const Register = () => {
	const {register} = useAuthServiceContext();
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validate: (values) => {
			const errors: Partial<typeof values> = {};
			if (!values.username) {
				errors.username = "Required";
			}
			if (!values.password) {
				errors.password = "Required";
			}
			return errors;
		},
		onSubmit: async (values) => {
			const {username, password} = values;
			const status = await register(username, password);
			console.log(status.response.status)
			if (status.response.status === 409) {
				formik.setErrors({
					username: "Username already exists",
				});
			} else if (status.response.status === 401) {
				formik.setErrors({
					username: "Invalid username or password",
					password: "Invalid username or password"
				});
			} else {
				console.log(status)
				navigate("/login");
			}
		},
	});
	return (
		<>
			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					Register
					<Box component="form" onSubmit={formik.handleSubmit} sx={{mt: 1}}>
						<TextField
							autoFocus
							fullWidth
							id="username"
							type="text"
							name="username"
							label="Username"
							onChange={formik.handleChange}
							value={formik.values.username}
							error={!!formik.touched.username && !!formik.errors.username}
							helperText={formik.touched.username && formik.errors.username}
						/>
						<TextField
							fullWidth
							id="password"
							type="password"
							name="password"
							label="Password"
							onChange={formik.handleChange}
							value={formik.values.password}
							margin="normal"
							error={!!formik.touched.password && !!formik.errors.password}
							helperText={formik.touched.password && formik.errors.password}
						/>
						<Box sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}>
							<Button
								variant="contained"
								disableElevation
								type="submit"
								sx={{mt: 1, mb: 2}}
							>
								Login
							</Button>
						</Box>
					</Box>
				</Box>
			</Container>
		</>
	);
};