import { useChannelState } from "../state";
import { User } from "./types";

const ListUsers = () => {
  const [listUsers] = useChannelState<User[]>("list-users");
  console.log(listUsers);
  return (
    <div>
      <h1>List Users</h1>
      <pre>{JSON.stringify(listUsers, null, 4)}</pre>
    </div>
  );
};

export default ListUsers;
