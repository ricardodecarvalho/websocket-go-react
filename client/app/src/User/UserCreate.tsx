import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useChannelState } from "../state";
import { User } from "./types";
import { useWebSocketConnection } from "../WebSocket";

const UserCreate = () => {
  const [_, setActiveUser] = useChannelState<string>("active-user");
  const [listUsers, setListUsers] = useChannelState<User[]>("list-users");

  const [inputName, setInputName] = useState("");

  const { sendMessage } = useWebSocketConnection();

  const sendValue = (value: number) => {
    const message = JSON.stringify({ uuid: user?.uuid, value });
    sendMessage(message);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let updatedListUsers;

    if (listUsers?.length > 0) {
      updatedListUsers = [
        ...listUsers,
        { name: inputName, uuid: uuidv4(), isModerator: false },
      ];
    } else {
      updatedListUsers = [
        { name: inputName, uuid: uuidv4(), isModerator: true },
      ];
    }

    setListUsers(updatedListUsers);
    setActiveUser(inputName);
  };

  return (
    <div>
      <h1>User Create</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={inputName}
          onChange={handleNameChange}
        />
        <button type="submit">Start</button>
      </form>
    </div>
  );
};

export default UserCreate;
