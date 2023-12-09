import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWebSocketConnection, useChannelMessages } from "../WebSocket";
import useUser from "../User/useUser";

const WS_URL = import.meta.env.VITE_WS_URL;

const Channel = () => {
  const { sessionID } = useParams();

  const navigate = useNavigate();

  const { name: userName, value, handleNameChange, handleSubmit } = useUser();

  const socketUrl = `${WS_URL}?session=${sessionID}`;

  const { sendMessage, lastJsonMessage } = useWebSocketConnection(socketUrl);
  const messages = useChannelMessages(lastJsonMessage);

  const sendValue = (value: number) => {
    const message = JSON.stringify({ userName, value });
    sendMessage(message);
  };

  const logout = () => {
    navigate("/");
  };

  return (
    <div>
      {!userName && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name"
            value={value}
            onChange={handleNameChange}
          />
          <button type="submit">Start</button>
        </form>
      )}

      {userName && (
        <>
          <p>
            Channel: {sessionID} (
            <a href={window.location.href} target="_blank">
              Open in new tab
            </a>
            ){" "}
          </p>

          <div>
            <button type="button" onClick={logout}>
              Close WS
            </button>
            <p>{userName}</p>
            <div>
              <button onClick={() => sendValue(1)}>1</button>
              <button onClick={() => sendValue(2)}>2</button>
              <button onClick={() => sendValue(3)}>3</button>
            </div>
            <hr />
            <div>
              {messages.map((msg, index) => (
                <div key={index}>
                  {msg.userName}: {msg.value}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Channel;
