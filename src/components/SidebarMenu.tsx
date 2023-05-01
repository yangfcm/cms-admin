import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiLink from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import CategoryIcon from "@mui/icons-material/Category";
import LabelIcon from "@mui/icons-material/Label";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import Divider from "@mui/material/Divider";
import BlogsMenu from "./BlogsMenu";

type MenuLinkProps = {
  to: string;
  icon: JSX.Element;
  text: string;
};
function MenuLink(props: MenuLinkProps) {
  const { to, icon, text } = props;
  return (
    <MuiLink component={Link} to={to} underline="none">
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </MuiLink>
  );
}

function SidebarMenu() {
  return (
    <List>
      <ListItem>
        <BlogsMenu />
      </ListItem>
      <Divider />
      <MenuLink to="." text="Home" icon={<HomeIcon />} />
      <MenuLink to="./articles" text="Articles" icon={<ArticleIcon />} />
      <MenuLink to="./categories" text="Categories" icon={<CategoryIcon />} />
      <MenuLink to="./tags" text="Tags" icon={<LabelIcon />} />
      <MenuLink
        to="./blog-settings"
        text="Blog Settings"
        icon={<RoomPreferencesIcon />}
      />
    </List>
  );
}

export default SidebarMenu;
