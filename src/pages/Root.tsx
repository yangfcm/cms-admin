import { Outlet } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Root() {
  return (
    <>
      <Header />
      <Box id="app__main-container" sx={{ display: " flex", height: "100vh" }}>
        <Sidebar />
        <Box id="app__main" component="main" sx={{ flexGrow: 1 }}>
          <Toolbar />
          <Box id="app__position-anchor" sx={{ location: "relative" }}>
            <Box id="app__router-container" sx={{ p: 2 }}>
              <div>Rootpage</div>
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Root;
