import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Root from "../pages/Root";
import AuthProvider from "../components/AuthProvider";
import Home from "../pages/Home";
import Articles from "../pages/Articles";
import PersonalSettings from "../pages/PersonalSettings";
import RequireAuth from "../components/RequireAuth";

function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/"
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
