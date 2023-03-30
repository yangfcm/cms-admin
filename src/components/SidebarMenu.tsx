import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiLink from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import Divider from "@mui/material/Divider";
import BlogsMenu from "./BlogsMenu";

function SidebarMenu() {
  return (
    <List>
      <ListItem>
        <BlogsMenu />
      </ListItem>
      <Divider />
      <MuiLink component={Link} to="." underline="none">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
      </MuiLink>
      <MuiLink component={Link} to="./articles" underline="none">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Articles" />
          </ListItemButton>
        </ListItem>
      </MuiLink>
    </List>
  );
}

export default SidebarMenu;
