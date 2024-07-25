import {
	BrowserRouter, Route, Routes,
} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import React from "react";
import {Explore} from "./pages/Explore.tsx";
import {ToggleColorMode} from "./components/ToggleColorMode/ToggleColorMode.tsx";
import {Server} from "./pages/Server.tsx";
import {Login} from "./pages/Login.tsx";
import {AuthServiceProvider} from "./context/AuthContext.tsx";
import {ProtectedRoute} from "./services/ProtectedRoute.tsx";
import {Register} from "./pages/Register.tsx";


const App: React.FC = () => {
	return (
		<BrowserRouter>
			<AuthServiceProvider>
				<ToggleColorMode>
					<Routes>
						<Route path="/" element={<Home/>}/>
						<Route path="/server/:serverId/:channelId?" element={
							<ProtectedRoute>
								<Server/>
							</ProtectedRoute>
						}/>
						<Route path="/explore/:categoryName" element={<Explore/>}/>
						<Route path="/login" element={<Login/>}/>
						<Route path="/register" element={<Register/>}/>
						<Route path="/testlogin" element={
							<ProtectedRoute>
								<h1>Test Login</h1>
							</ProtectedRoute>
						}/>
					</Routes>
				</ToggleColorMode>
			</AuthServiceProvider>
		</BrowserRouter>
	);
};

export default App;
