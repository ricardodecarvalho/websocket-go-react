
import { Routes, Route, Link } from 'react-router-dom';
import Layout from '../Layout';
import Home from '../Home';
import Channel from '../Channel';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="channel/:sessionID" element={<Channel />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default Router;
