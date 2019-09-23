import React from "react";
import { Typography, Grid } from "@material-ui/core";

const footerStyle = {
  position: "fixed",
  bottom: 0,
  padding: 15 + "px",
  left: 50 + "%",
  transform: "translateX(" + -45 + "%)",
  background: "#fafafa"
};

const Footer = props => {
  return (
    <Grid container justify="center" style={footerStyle}>
      <Typography variant="body2" color="textSecondary" align="center">
        Content Management System built by Fan.Y
      </Typography>
    </Grid>
  );
};

export default Footer;
