import useWebSocket from "react-use-websocket";
import {useState} from "react";
import {useParams} from "react-router-dom";
import useCrud from "../../hooks/useCrud.ts";
import {ServerD} from "../../@types/serverD.ts";

interface Message {
	sender: string;
	content: string;
	timestamp: string;
}


export const MessageInterface = () => {
	const [newMessage, setNewMessage] = useState<Message[]>([]);
	const [message, setMessage] = useState('Initial Message');
	const {serverId, channelId} = useParams();
	const {fetchData} = useCrud<ServerD>([], `/message/?channel_id=${channelId}`);

	const socketUrl = channelId ? `ws://127.0.0.1:8000/${serverId}/${channelId}` : null;

	const [inputValue, setInputValue] = useState("")
	const {sendJsonMessage} = useWebSocket(socketUrl, {
		onOpen: () => {
			console.log('Connection Opened')
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
			console.log("Message Received:", newMessage)
		}
	});

	return (
		<>
			<div>
				{newMessage.map((msg: Message, index: number) => (
					<div key={index}>
						<p>{msg.sender}</p>
						<p>{msg.content}</p>
					</div>
				))}
			</div>
			<form>
				<label>Enter Message</label>
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}/>
				<button type="button" onClick={() => {
					sendJsonMessage({type: 'message', message: inputValue});
					setInputValue("");
					setMessage("")
				}}>Send
				</button>
			</form>
		</>
	);
};