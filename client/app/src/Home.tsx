import { useNavigate } from "react-router-dom";

const CREATE_UUID_URL = import.meta.env.VITE_CREATE_UUID_URL;

const Home = () => {
  const navigate = useNavigate();

  async function createChannel() {
    const response = await fetch(CREATE_UUID_URL);
    const data = await response.json();
    const sessionID = data?.sessionID;

    navigate(`/channel/${sessionID}`);
  }

  return (
    <div>
      <p>Welcome to the home page!</p>
      <button type="button" onClick={createChannel}>
        Create a channel
      </button>
    </div>
  );
};

export default Home;
