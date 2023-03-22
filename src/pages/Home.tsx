import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>homepage</h1>
      <Outlet />
    </div>
  );
}

export default Home;
