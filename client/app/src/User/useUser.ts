import { useState } from "react";
import { User } from "./types";

const useUser = () => {
  const [inputName, setInputName] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(event.target.value);
  };

  const setUserModerator = (user: User) => {
    setUser({ ...user, isModerator: true });
  };

  return {
    user,
    users,
    inputName,
    handleNameChange,
    setUser,
    setUsers,
    setUserModerator,
  };
};

export default useUser;
