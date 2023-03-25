import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import useAuth from "../features/user/useAuth";
import ConfirmDialog from "./ConfirmDialog";
import LogoutIcon from "@mui/icons-material/Logout";

function HeaderMenu() {
  const { authUser, signout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [confirmSignout, setConfirmSignout] = useState(false);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title="" onClick={handleOpen}>
        <IconButton size="small">
          <Avatar sx={{ width: 40, height: 40 }} src={""} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar sx={{ width: 40, height: 40 }} src={authUser?.avatar} />{" "}
          {authUser?.username}
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            setConfirmSignout(true);
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
      <ConfirmDialog
        open={confirmSignout}
        onConfirm={signout}
        onCancel={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
          setConfirmSignout(false);
        }}
        title="Are you sure to log out?"
      />
    </>
  );
}

export default HeaderMenu;
