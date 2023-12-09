import { useEffect, useState } from "react";

type Message = {
  userName: string;
  value: number;
};

const useChannelMessages = (lastJsonMessage: any) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (lastJsonMessage !== null) {
      setMessages((prev) => [...prev, lastJsonMessage]);
    }
  }, [lastJsonMessage]);

  return messages;
};

export default useChannelMessages;
