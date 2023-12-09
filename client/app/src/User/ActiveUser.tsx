import { useChannelState } from "../state";

const ActiveUser = () => {
  const [activeUser] = useChannelState<string>("active-user");
  return (
    <div>
      <h1>ActiveUser</h1>
      <p>{activeUser}</p>
    </div>
  );
};

export default ActiveUser;
