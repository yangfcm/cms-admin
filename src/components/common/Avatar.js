import React from "react";
import { Avatar, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles({
  orangeAvatar: {
    color: "#fff",
    backgroundColor: deepOrange[500]
  },
  purpleAvatar: {
    color: "#fff",
    backgroundColor: deepPurple[500]
  },
  bigAvatar: {
    width: 60,
    height: 60,
    fontSize: 25
  }
});

export default ({ loginUser, color, size }) => {
  const classes = useStyles();
  const avatarSrc = loginUser.avatar;
  return (
    <Tooltip title={loginUser.username || loginUser.email} placement="right">
      {avatarSrc ? (
        <Avatar src={loginUser.avatarSrc} />
      ) : (
        <Avatar
          className={`${color === "purple" && classes.purpleAvatar} 
					${color === "orange" && classes.orangeAvatar}
					${size === "big" && classes.bigAvatar}`}
        >
          {loginUser.firstname[0].toUpperCase()}
          {loginUser.lastname[0].toUpperCase()}
        </Avatar>
      )}
    </Tooltip>
  );
};
