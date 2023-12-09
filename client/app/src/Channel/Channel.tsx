import UserCreate from "../User/UserCreate";
import ActiveUser from "../User/ActiveUser";
import ListUsers from "../User/ListUsers";
import { useChannelState } from "../state";

const Channel = () => {
  const [activeUser] = useChannelState<string>("active-user");

  return (
    <div>
      {!activeUser && <UserCreate />}
      {activeUser && (
        <>
          <ActiveUser />
          <ListUsers />
        </>
      )}
    </div>
  );
};

export default Channel;
