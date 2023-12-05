import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket from "react-use-websocket"

const WS_URL = 'ws://localhost:8080/ws'

type Message = {
  userName: string;
  value: number;
}

const Channel = () => {
  const { sessionID } = useParams();

  const [userName, setUserName] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const [socketUrl] = useState(`${WS_URL}?session=${sessionID}`);

  const handleSocketClose = (event: CloseEvent) => {
    console.log('WebSocket is closed with code:', event.code);
    console.log(event.code);
    if (event.code === 4001) {
      console.log("Erro: Session ID is required");
    }
  };

  const {
    sendMessage,
    lastMessage,
    readyState,
    lastJsonMessage
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log('opened'),
    onClose: handleSocketClose,
    onError: (event) => console.log('error:', event),
    onMessage: (event) => {
      const messageData = JSON.parse(event.data);
      setMessages(prev => [...prev, messageData] as never[]);
    },
  });


  useEffect(() => {
    if (lastMessage !== null) {
      console.log('received a message:', lastMessage.data);
    }
  }, [lastMessage]);

  useEffect(() => {
    if (lastJsonMessage !== null) {
      console.log('received a JSON message:', lastJsonMessage);
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    switch (readyState) {
      case WebSocket.CONNECTING:
        console.log('Connecting...');
        break;
      case WebSocket.OPEN:
        console.log('Connected');
        break;
      case WebSocket.CLOSING:
        console.log('Closing...');
        break;
      case WebSocket.CLOSED:
        console.log('Connection closed');
        break;
      default:
        console.log('Unknown state');
    }
  }, [readyState]);

  const sendValue = (value: number) => {
    const message = JSON.stringify({ userName, value });
    sendMessage(message);
  };

  return (
    <div>
      <p>Channel: {sessionID} (<a href={window.location.href} target="_blank">Open in new tab</a>) </p>

      <div>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Type your name"
        />
        <div>
          <button onClick={() => sendValue(1)}>1</button>
          <button onClick={() => sendValue(2)}>2</button>
          <button onClick={() => sendValue(3)}>3</button>
        </div>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>{msg.userName}: {msg.value}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Channel