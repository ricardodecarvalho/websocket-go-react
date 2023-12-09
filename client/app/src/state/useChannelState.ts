import { createContext, useContext } from "react";

type ChannelStateContextType = {
  items: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  setChannelStateItem: <T>(key: string, value: T) => void;
};

export const ChannelStateContext = createContext<
  ChannelStateContextType | undefined
>(undefined);

export default function useChannelState<ItemType>(
  stateItemKey: string,
): [ItemType, (value: ItemType) => void] {
  const context = useContext(ChannelStateContext);

  if (context === undefined) {
    throw new Error(
      "useChannelState must be used within a ChannelStateProvider",
    );
  }

  const item = context.items[stateItemKey] as ItemType;
  const setItem = (value: ItemType) =>
    context.setChannelStateItem(stateItemKey, value);

  return [item, setItem];
}
