import useWebSocket from "react-use-websocket";
import {useState} from "react";

const socketUrl = 'ws://127.0.0.1:8000/ws/test/';


export const Server = () => {
    const [message, setMessage] = useState('Initial Message');
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
        onMessage: (event) => {
            console.log('Message:', event)
            setMessage(event.data);
        }
    });

    const sendHello = () => {
        sendJsonMessage({message: inputValue});
        console.log("pressed")
        setInputValue("")
    }

    return (
        <>
            <div>
                <input type={'text'} value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <button onClick={sendHello}>Send</button>
                <div>
                    <h2>Received Data: {message}</h2>
                </div>
            </div>
        </>
    );
};