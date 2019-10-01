import React from "react";
import { Grid } from "@material-ui/core";
import Greeting from "../modules/Greeting";
import coverPic from "../../assets/dashboard-image.jpg";

class Dashboard extends React.Component {
  render() {
    return (
      <div style={{ height: "100%" }}>
        <Greeting />
        <Grid container justify="center">
          <img src={coverPic} style={{ maxWidth: "80%" }} alt="cover" />
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
