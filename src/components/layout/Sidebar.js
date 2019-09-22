import React from "react";
import { Drawer, List, ListItemText, ListItemIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";

import ListItemLink from "../common/ListItemLink";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  "active-link": {
    color: theme.palette.primary.main,
    "& > *": {
      color: "inherit"
    }
  }
}));

const Sidebar = props => {
  const classes = useStyles();

  const drawer = (
    <List>
      <ListItemLink
        button
        to="/dashboard"
        activeClassName={classes["active-link"]}
      >
        <ListItemIcon>
          <DashboardOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemLink>
      <ListItemLink button to="/new" activeClassName={classes["active-link"]}>
        <ListItemIcon>
          <CreateOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="New Post" />
      </ListItemLink>
      <ListItemLink button to="/posts" activeClassName={classes["active-link"]}>
        <ListItemIcon>
          <LibraryBooksOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Posts" />
      </ListItemLink>
      <ListItemLink
        button
        to="/categories"
        activeClassName={classes["active-link"]}
      >
        <ListItemIcon>
          <CategoryOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItemLink>
      <ListItemLink button to="/tags" activeClassName={classes["active-link"]}>
        <ListItemIcon>
          <LocalOfferOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Tags" />
      </ListItemLink>
      <ListItemLink
        button
        to="/comments"
        activeClassName={classes["active-link"]}
      >
        <ListItemIcon>
          <CommentOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Comments" />
      </ListItemLink>
    </List>
  );

  return (
    <div>
      <div className={classes.toolbar}></div>
      <Drawer variant="permanent">
        <div className={classes.toolbar} />
        {drawer}
      </Drawer>
    </div>
  );
};

export default Sidebar;
