import {Box, CssBaseline} from "@mui/material";
import {PrimaryAppBar} from "./templates/PrimaryAppBar.tsx";
import {PrimaryDraw} from "./templates/PrimaryDraw.tsx";
import {SecondaryDraw} from "./templates/SecondaryDraw.tsx";
import {MainComponent} from "./templates/MainComponent.tsx";
import {MessageInterface} from "../components/main/MessageInterface.tsx";
import {ServerChannels} from "../components/secondaryDraw/ServerChannels.tsx";
import {UserServers} from "../components/primaryDraw/UserServers.tsx";
import {useNavigate, useParams} from "react-router-dom";
import useCrud from "../hooks/useCrud.ts";
import {ServerD} from "../@types/serverD.ts";
import {useEffect} from "react";

export const Server = () => {
	const navigate = useNavigate();
	const {serverId, channelId} = useParams();

	const {dataCrud, fetchData, error, isLoading} = useCrud<ServerD>(
		[],
		`/server/select/?by_serverid=${serverId}`,
	);

	useEffect(() => {
		fetchData();
	}, []);


	// Check if the channelId is valid by searching for it in the data fetched from the API
	const isChannel = (): boolean => {
		if (!channelId) return false

		return dataCrud.some((server) =>
			server.server_channel.some(
				(channel) => channel.id === parseInt(channelId),
			));
	}

	useEffect(() => {
		if (!isChannel()) {
			navigate(`/server/${serverId}`);
		}
	}, [channelId]);

	if (error !== null && error.message === "400") {
		navigate("/")
		return null
	}

	return (
		<>
			<Box sx={{display: "flex"}}>
				<CssBaseline/>
				<PrimaryAppBar/>
				<PrimaryDraw>
					<UserServers open={false} data={dataCrud}/>
				</PrimaryDraw>
				<SecondaryDraw>
					<ServerChannels data={dataCrud}/>
				</SecondaryDraw>
				<MainComponent>
					<MessageInterface/>
				</MainComponent>
			</Box>
		</>
	);
};