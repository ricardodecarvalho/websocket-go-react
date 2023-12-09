import { useState } from "react";

export default function useChannelStateProvider() {
  const [items, setItems] = useState({});

  const setChannelStateItem = <T>(key: string, value: T) => {
    setItems((oldItems) => ({ ...oldItems, [key]: value }));
  };

  return {
    items,
    setChannelStateItem,
  };
}
