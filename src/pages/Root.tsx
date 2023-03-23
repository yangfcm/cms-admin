import { Outlet } from "react-router-dom";
import useAuth from "../features/user/useAuth";

function Root() {
  const { signout } = useAuth();
  return (
    <div>
      <h1>Rootpage</h1>
      <button onClick={signout}>Sign out</button>
      <Outlet />
    </div>
  );
}

export default Root;
