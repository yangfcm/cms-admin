import { Navigate, useLocation } from "react-router";
import useAuth from "../features/user/useAuth";

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { isSignedIn } = useAuth();
  console.log(isSignedIn);

  if (isSignedIn === null) return null;
  if (isSignedIn === false) {
    return <Navigate to="signin" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
