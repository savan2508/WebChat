export interface AuthServiceProps {
	login: (email: string, password: string) => any;
	isLoggedIn: boolean;
	logout: () => void;
	// register: (email: string, password: string) => void;
	// isAuthenticated: boolean;
	// isLoading: boolean;
	// user: {
	// 	email: string;
	// 	password: string;
	// };
}