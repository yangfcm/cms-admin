import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
// import { SidebarMenu } from "./SidebarMenu";
import { SIDEBAR_WIDTH } from "../settings/constants";
import { useToggleSidebar } from "../features/preference/useToggleSidebar";

function Sidebar() {
  const { openSidebar: open, setOpenSidebar: setOpen } = useToggleSidebar();
  return (
    <>
      <Drawer // Sidebar on small screen.
        open={open}
        onClick={() => {
          setOpen(false);
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: SIDEBAR_WIDTH,
          },
        }}
      >
        {/* <SidebarMenu /> */}
      </Drawer>
      <Drawer // Sidebar on large screen.
        variant="permanent"
        open
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: SIDEBAR_WIDTH,
          },
          width: SIDEBAR_WIDTH,
        }}
      >
        <Toolbar />
        {/* <SidebarMenu /> */}
      </Drawer>
    </>
  );
}

export default Sidebar;
