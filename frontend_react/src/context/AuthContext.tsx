import React, {createContext, useContext} from "react";
import {AuthServiceProps} from "../@types/auth-serviceD.ts";
import {useAuthService} from "../services/AuthServices.ts";

const AuthServiceContext = createContext<AuthServiceProps | null>(null);

export function AuthServiceProvider({children}: { children: React.ReactNode }) {
	const authService = useAuthService();
	return (
		<AuthServiceContext.Provider value={authService}>
			{children}
		</AuthServiceContext.Provider>
	);
}

export function useAuthServiceContext(): AuthServiceProps {
	const context = useContext(AuthServiceContext);
	if (!context) {
		throw new Error("useAuthService must be used within an AuthServiceProvider");
	}
	return context;
}
