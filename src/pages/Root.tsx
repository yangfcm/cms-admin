import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div>
      <h1>Rootpage</h1>
      <Outlet />
    </div>
  );
}

export default Root;
