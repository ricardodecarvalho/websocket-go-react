import { useNavigate } from "react-router-dom";

const URL_CREATE_CHANNEL = 'http://localhost:8080/create-channel';

const Home = () => {
  const navigate = useNavigate()

  async function createChannel() {
    const response = await fetch(URL_CREATE_CHANNEL);
    const data = await response.json();
    const sessionID = data?.sessionID;

    navigate(`/channel/${sessionID}`);
  }

  return (
    <div>
      <p>Welcome to the home page!</p>
      <button
        type='button'
        onClick={createChannel}>
        Create channel
      </button>
    </div>
  )
}

export default Home
