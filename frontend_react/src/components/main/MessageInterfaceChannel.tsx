import {ServerD} from "../../@types/serverD.ts";
import {
	AppBar,
	Avatar,
	Box,
	Drawer,
	IconButton,
	ListItemAvatar,
	Toolbar,
	Typography,
	useMediaQuery
} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useParams} from "react-router-dom";
import {MEDIA_URL} from "../../config.ts";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {ServerChannels} from "../secondaryDraw/ServerChannels.tsx";
import React, {useEffect, useState} from "react";
import {JoinServerButton} from "../Membership/JoinServerButton.tsx";

interface MessageInterfaceChannelProps {
	data: ServerD[];
}

export const MessageInterfaceChannel = (props: MessageInterfaceChannelProps) => {
	const {data} = props;
	const theme = useTheme();
	const {serverId, channelId} = useParams();
	const [sideMenu, setSideMenu] = useState(false);
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

	useEffect(() => {
		if (isSmallScreen && sideMenu) {
			setSideMenu(false)
		}
	}, []);

	const channelName = data
		?.find((server) => server.id === Number(serverId))
		?.server_channel?.find((channel) => channel.id === Number(channelId))
		?.name || "Home";

	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event &&
			event.type === "keydown" &&
			((event as React.KeyboardEvent).key === "Tab" ||
				(event as React.KeyboardEvent).key === "Shift")
		) {
			return;
		}
		setSideMenu(open)
	}

	const list = () => (
		<Box
			sx={{paddingTop: `${theme.primaryAppBar.height}px`, minWidth: 200}}
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<ServerChannels data={data}/>
		</Box>
	)

	return (
		<>
			<AppBar
				sx={{
					backgroundColor: theme.palette.background.default,
					borderBottom: `1px solid ${theme.palette.divider}`,
				}}
				color="default"
				position="sticky"
				elevation={0}
			>
				<Toolbar variant='dense' sx={{
					display: "flex",
					minHeight: theme.primaryAppBar.height,
					height: theme.primaryAppBar.height,
					alignItems: "center"
				}}>
					<Box sx={{display: {xs: "block", sm: "none"}}}>
						<ListItemAvatar sx={{minWidth: "40px"}}>
							<Avatar alt="Server Icon" src={`${MEDIA_URL}${data?.[0]?.icon}`} sx={{width: 30, height: 30}}/>
						</ListItemAvatar>
					</Box>

					<Typography variant="h6" style={{textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>
						{channelName}
					</Typography>

					<Box sx={{flexGrow: 1}}/>
					<JoinServerButton/>
					<Box sx={{display: {xs: "block", sm: "none"}}}>
						<IconButton color="inherit" edge="end" onClick={toggleDrawer(true)}>
							<MoreVertIcon/>
						</IconButton>
					</Box>

					<Drawer anchor="left" open={sideMenu} onClose={toggleDrawer(false)}>{list()}</Drawer>

				</Toolbar>
			</AppBar>
		</>
	);
};