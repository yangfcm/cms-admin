import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import useAuth from "../features/user/useAuth";
import useUserBlog from "../features/blog/useUserBlog";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Root from "../pages/Root";
import Home from "../pages/Home";
import Articles from "../pages/Articles";
import Onboarding from "../pages/Onboarding";
import AuthProvider from "../components/AuthProvider";

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { isSignedIn } = useAuth();
  if (isSignedIn === null) return null;
  if (isSignedIn === false) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

function NavigateOnAuth({ children }: { children: JSX.Element }) {
  const { isSignedIn } = useAuth();
  const { activeBlog } = useUserBlog();
  if (isSignedIn) {
    const from = activeBlog ? "/blog/" + activeBlog.address : "/onboarding";
    return <Navigate to={from} replace />;
  }
  return children;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/signup"
            element={
              <NavigateOnAuth>
                <SignUp />
              </NavigateOnAuth>
            }
          />
          <Route
            path="/signin"
            element={
              <NavigateOnAuth>
                <SignIn />
              </NavigateOnAuth>
            }
          />
          <Route
            path="/onboarding"
            element={
              <RequireAuth>
                <Onboarding />
              </RequireAuth>
            }
          />
          <Route
            path="/blog/:address"
            element={
              <RequireAuth>
                <Root />
                {/** All nested routes are protected (required auth) */}
              </RequireAuth>
            }
          >
            <Route path="" element={<Home />} />
            <Route path="articles" element={<Articles />} />
          </Route>
          <Route
            path="/"
            element={
              <NavigateOnAuth>
                <SignIn />
              </NavigateOnAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;
