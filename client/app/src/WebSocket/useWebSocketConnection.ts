import { useEffect } from "react";
import useWebSocket from "react-use-websocket";

const useWebSocketConnection = (socketUrl: string) => {
  const handleSocketClose = (event: CloseEvent) => {
    console.log("WebSocket is closed with code:", event.code);
    console.log(event.code);
    if (event.code === 4001) {
      console.log("Erro: Session ID is required");
    }
  };

  const { sendMessage, lastMessage, readyState, lastJsonMessage } =
    useWebSocket(socketUrl, {
      onOpen: () => console.log("opened"),
      onClose: handleSocketClose,
      onError: (event) => console.log("error:", event),
      onMessage: () => {},
    });

  useEffect(() => {
    switch (readyState) {
      case WebSocket.CONNECTING:
        console.log("Connecting...");
        break;
      case WebSocket.OPEN:
        console.log("Connected");
        break;
      case WebSocket.CLOSING:
        console.log("Closing...");
        break;
      case WebSocket.CLOSED:
        console.log("Connection closed");
        break;
      default:
        console.log("Unknown state");
    }
  }, [readyState]);

  return {
    sendMessage,
    lastMessage,
    readyState,
    lastJsonMessage,
  };
};

export default useWebSocketConnection;
