import {useState} from "react";
import {useAuthService} from "./AuthServices.ts";
import useCrud from "../hooks/useCrud.ts";
import useWebSocket from "react-use-websocket";
import {WS_ROOT} from "../config.ts";

export interface Message {
	sender: string;
	content: string;
	created_at: string;
}

interface MessageServerResponse {
	data: IncomingMessage[];
}

interface IncomingMessage {
	id: number;
	sender: string;
	content: string;
	created_at: string;
}


export const useChatWebSocket = (channelId: string, serverId: string) => {
	const [newMessage, setNewMessage] = useState<Message[]>([]);
	const [message, setMessage] = useState('');

	const {refreshAccessToken, logout} = useAuthService();

	const {fetchData} = useCrud<MessageServerResponse>([], `/messages/?channel_id=${channelId}`);
	const socketUrl = channelId ? `${WS_ROOT}/${serverId}/${channelId}` : null;

	const [reconnectionAttempt, setReconnectionAttempt] = useState(0);
	const maxConnectionAttempts = 4;

	const {sendJsonMessage} = useWebSocket(socketUrl, {
		onOpen: async () => {
			try {
				const data = await fetchData();
				setNewMessage([]);
				setNewMessage(Array.isArray(data.data) ? data.data : []);
				console.log("Connection Opened")
			} catch (e) {
				console.error("Error:", e)
			}
		},
		onClose: (event: CloseEvent) => {
			if (event.code === 4001) {
				console.log('Authentication Error:', event);
				refreshAccessToken().catch((error) => {
					if (error.response && error.response.status === 401) {
						logout();
					}
				})
			}
			console.log('Connection Closed:', event);
			setReconnectionAttempt((prevAttempt) => prevAttempt + 1);
		},
		onError: (event) => {
			console.log('Error:', event)
		},
		onMessage: (msg) => {
			const data = JSON.parse(msg.data);
			setNewMessage((currMessages) => [...currMessages, data.message]);
		},
		shouldReconnect: (closeEvent) => {
			if (closeEvent.code === 4001 && reconnectionAttempt > maxConnectionAttempts) {
				console.log('Max Connection Attempts Reached');
				setReconnectionAttempt(0);
				return false;
			}
			return true;
		},
		reconnectInterval: 2000,
	});
	return {newMessage, message, setMessage, sendJsonMessage};
}