import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import CreateIcon from "@mui/icons-material/Create";
import MenuIcon from "@mui/icons-material/Menu";
import { useToggleSidebar } from "../features/preference/useToggleSidebar";
import HeaderMenu from "./HeaderMenu";

function Header() {
  const theme = useTheme();
  const { setOpenSidebar } = useToggleSidebar();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: {
          md: theme.zIndex.drawer + 1,
        },
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={(e) => {
              setOpenSidebar(true);
            }}
            sx={{
              display: {
                xs: "inline-flex",
                md: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <MuiLink component={Link} to="/" underline="none">
            <Typography
              component="h1"
              variant="h6"
              color="white"
              noWrap
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <CreateIcon />
              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "inline-flex",
                  },
                  ml: 1,
                }}
              >
                LiteBlog
              </Box>
            </Typography>
          </MuiLink>
        </Box>
        <HeaderMenu />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
