import useWebSocket from "react-use-websocket";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import useCrud from "../../hooks/useCrud.ts";
import {ServerD} from "../../@types/serverD.ts";
import {Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography} from "@mui/material";
import {MessageInterfaceChannel} from "./MessageInterfaceChannel.tsx";
import {useTheme} from "@mui/material/styles";

interface Message {
	sender: string;
	content: string;
	timestamp: string;
}

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
	const [newMessage, setNewMessage] = useState<Message[]>([]);
	const theme = useTheme();
	const [message, setMessage] = useState('');
	const {serverId, channelId} = useParams();
	const server_name = data?.[0]?.name ?? "Server";
	const {fetchData} = useCrud<ServerD>([], `/messages/?channel_id=${channelId}`);


	const socketUrl = channelId ? `ws://127.0.0.1:8000/${serverId}/${channelId}` : null;

	const {sendJsonMessage} = useWebSocket(socketUrl, {
		onOpen: async () => {
			try {
				const data = await fetchData();
				setNewMessage([]);
				setNewMessage(Array.isArray(data) ? data : []);
				console.log("Connection Opened")
			} catch (e) {
				console.error("Error:", e)
			}
		},
		onClose: () => {
			console.log('Connection Closed')
		},
		onError: (event) => {
			console.log('Error:', event)
		},
		onMessage: (msg) => {
			const data = JSON.parse(msg.data);
			setNewMessage((currMsgs) => [...currMsgs, data.message]);
		}
	});

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
						<List sx={{width: "100%", bgcolor: "background.paper"}}>

							{newMessage.map((msg: Message, index: number) => (
								<ListItem key={index} alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="user image"/>
									</ListItemAvatar>
									<ListItemText
										primaryTypographyProps={{fontSize: "12px", variant: "body2"}}
										primary={
											<Typography
												component="span"
												variant="body1"
												color="text.primary"
												sx={{display: "inline", fontW: 600}}
											>
												{msg.sender}
											</Typography>
										}
										secondary={
											<Box>
												<Typography
													variant="body1"
													style={{overflow: "visible", whiteSpace: "normal", textOverflow: "clip",}}
													sx={{display: "inline", lineHeight: 1.2, fontWeight: 400, letterSpacing: "-0.2px",}}
													component="span"
													color="text.primary"
												>
													{msg.content}
												</Typography>
											</Box>
										}
									/>
								</ListItem>
							))}

						</List>
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