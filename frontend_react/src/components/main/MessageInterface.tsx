import React from "react";
import {useParams} from "react-router-dom";
import {ServerD} from "../../@types/serverD.ts";
import {Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography} from "@mui/material";
import {MessageInterfaceChannel} from "./MessageInterfaceChannel.tsx";
import {useTheme} from "@mui/material";
import {Scroll} from "./Scroll.tsx";
import {Message, useChatWebSocket} from "../../services/chatService.ts";


interface ServerChannelProps {
	data: ServerD[];
}

interface SendMessageData {
	type: string;
	message: string;

	[key: string]: any;
}


export const MessageInterface = (props: ServerChannelProps) => {
	const {data} = props;

	const theme = useTheme();

	const {serverId, channelId} = useParams();
	const {sendJsonMessage, newMessage, message, setMessage} = useChatWebSocket(channelId || "", serverId || "");
	const server_name = data?.[0]?.name ?? "Server";


	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			sendJsonMessage({type: "message", message} as SendMessageData);
			setMessage('');
		}
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		sendJsonMessage({type: "message", message} as SendMessageData);
		setMessage('');
	}

	function formatTimeStamp(timestamp: string): string {
		const date = new Date(Date.parse(timestamp));
		const formatedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
		const formatedTime = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
		return `${formatedDate} at ${formatedTime}`;
	}

	return (
		<>
			<MessageInterfaceChannel data={data}/>
			{channelId === undefined ? (
				<Box sx={{
					overflow: "hidden",
					p: {xs: 0},
					height: `calc(80vh)`,
					display: "flex",
					justifyContent: "center",
					alignItems: "center"
				}}>
					<Box sx={{textAlign: "center"}}>
						<Typography variant="h4" fontWeight={700} letterSpacing={"-0.5px"} sx={{px: 5, maxWidth: "600px"}}>
							Welcome to {server_name}
						</Typography>
						<Typography>
							{data?.[0]?.description ?? "This is our home"}
						</Typography>
					</Box>
				</Box>
			) : (
				<>
					<Box sx={{overflow: "hidden", p: 0, height: `cals(100vh - 100px)`}}>
						<Scroll>
							<List sx={{width: "100%", bgcolor: "background.paper"}}>

								{newMessage.map((msg: Message, index: number) => (
									<ListItem key={index} alignItems="flex-start">
										<ListItemAvatar>
											<Avatar alt="user image"/>
										</ListItemAvatar>
										<ListItemText
											primaryTypographyProps={{fontSize: "12px", variant: "body2"}}
											primary={
												<>
													<Typography
														component="span"
														variant="body1"
														color="text.primary"
														sx={{display: "inline", fontW: 600}}
													>
														{msg.sender}{" at "}{formatTimeStamp(msg.created_at)}
													</Typography>
													<Typography component="span" variant="caption" color="textSecondary">
													</Typography>
												</>
											}
											secondary={
												<>
													<Typography
														variant="body1"
														style={{overflow: "visible", whiteSpace: "normal", textOverflow: "clip",}}
														sx={{display: "inline", lineHeight: 1.2, fontWeight: 400, letterSpacing: "-0.2px",}}
														component="span"
														color="text.primary"
													>
														{msg.content}
													</Typography>
												</>
											}
										/>
									</ListItem>
								))}

							</List>
						</Scroll>
					</Box>
					<Box sx={{position: "sticky", bottom: 0, width: "100%"}}>
						<form
							onSubmit={handleSubmit}
							style={{
								bottom: 0,
								right: 0,
								padding: "1rem",
								backgroundColor: theme.palette.background.default,
								zIndex: 1,
							}}>
							<Box sx={{display: "flex"}}>
								<TextField
									fullWidth
									multiline
									value={message}
									onKeyDown={handleKeyDown}
									minRows={1}
									maxRows={4}
									onChange={(e) => setMessage(e.target.value)}
									sx={{flexGrow: 1}}/>
							</Box>
						</form>
					</Box>
				</>
			)}
		</>
	);
};