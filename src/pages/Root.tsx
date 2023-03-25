import { Outlet } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import useAuth from "../features/user/useAuth";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Root() {
  const { signout } = useAuth();
  return (
    <>
      <Header />
      <Box id="app__main-container" sx={{ display: " flex", height: "100vh" }}>
        <Sidebar />
        <Box id="app__main" component="main" sx={{ flexGrow: 1 }}>
          <Toolbar />
          <Box id="app__position-anchor" sx={{ location: "relative" }}>
            <Box id="app__router-container" sx={{ p: 2 }}>
              <h1>Rootpage</h1>
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Root;
