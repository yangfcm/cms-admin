import React from "react";
import { Grid, Typography } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const ErrorMessage = props => {
  return (
    <Grid container justify="space-around" alignItems="center" direction="row">
      <Grid item>
        <ErrorOutlineIcon fontSize="large" color="secondary" />
      </Grid>
      <Grid item>
        <Typography color="secondary" variant="h6">
          {props.message}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ErrorMessage;
