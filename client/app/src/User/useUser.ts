import { useState } from "react";

const useUser = () => {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setName(value);
  };

  return { name, value, handleNameChange, handleSubmit };
};

export default useUser;
