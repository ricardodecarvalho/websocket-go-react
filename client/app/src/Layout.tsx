import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <p>
        <Link to="/">Home</Link>
      </p>
      <hr />
      <Outlet />
    </>
  );
};

export default Layout;
