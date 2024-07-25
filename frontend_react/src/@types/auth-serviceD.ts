export interface AuthServiceProps {
	login: (email: string, password: string) => any;
	isLoggedIn: boolean;
	logout: () => void;
	refreshAccessToken: () => Promise<void>;
	register: (email: string, password: string) => Promise<any>;
	// register: (email: string, password: string) => void;
	// isAuthenticated: boolean;
	// isLoading: boolean;
	// user: {
	// 	email: string;
	// 	password: string;
	// };
}