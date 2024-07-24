import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import React from "react";
import {Explore} from "./pages/Explore.tsx";
import {ToggleColorMode} from "./components/ToggleColorMode/ToggleColorMode.tsx";
import {Server} from "./pages/Server.tsx";
import {Login} from "./pages/Login.tsx";
import {AuthServiceProvider} from "./context/AuthContext.tsx";
import {ProtectedRoute} from "./services/ProtectedRoute.tsx";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route path="/" element={<Home/>}/>
			<Route path="/server/:serverId/:channelId?" element={
				<ProtectedRoute>
					<Server/>
				</ProtectedRoute>
			}/>
			<Route path="/explore/:categoryName" element={<Explore/>}/>
			<Route path="/login" element={<Login/>}/>
			<Route path="/testlogin" element={
				<ProtectedRoute>
					<h1>Test Login</h1>
				</ProtectedRoute>
			}/>
		</Route>,
	),
);

const App: React.FC = () => {
	return (
		<AuthServiceProvider>
			<ToggleColorMode>
				<RouterProvider router={router}/>
			</ToggleColorMode>
		</AuthServiceProvider>
	);
};

export default App;
