import React from "react";
import {useAuthServiceContext} from "../context/AuthContext.tsx";
import {Navigate} from "react-router-dom";

export const ProtectedRoute = ({children}): { children: React.ReactNode } => {
	const {isLoggedIn} = useAuthServiceContext();
	if (!isLoggedIn) {
		return <Navigate to='/login' replace={true}/>;
	} else {
		return <>{children}</>;
	}
};