import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Root from "../pages/Root";
import AuthProvider from "../components/AuthProvider";
import Home from "../pages/Home";
import Articles from "../pages/Articles";
import PersonalSettings from "../pages/PersonalSettings";
import useAuth from "../features/user/useAuth";

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { isSignedIn } = useAuth();
  if (isSignedIn === null) return null;
  if (isSignedIn === false) {
    return <Navigate to="signin" state={{ from: location }} replace />;
  }

  return children;
}

function NavigateOnAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { isSignedIn } = useAuth();
  const from = location.state?.from?.pathname || "/";
  if (isSignedIn) {
    return <Navigate to={from} replace />;
  }
  return children;
}

function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
            path="/blog/:id"
            element={
              <RequireAuth>
                <Root />
                {/** All nested routes are protected (required auth) */}
              </RequireAuth>
            }
          >
            <Route path="" element={<Home />} />
            <Route path="articles" element={<Articles />} />
            <Route path="personalsettings" element={<PersonalSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRoutes;
