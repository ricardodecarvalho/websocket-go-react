import Router from "./Router/Router";
import { ChannelStateContext, useChannelStateProvider } from "./state";

function App() {
  const channelStateProviderValue = useChannelStateProvider();
  return (
    <>
      <ChannelStateContext.Provider value={channelStateProviderValue}>
        <Router />
      </ChannelStateContext.Provider>
    </>
  );
}

export default App;
