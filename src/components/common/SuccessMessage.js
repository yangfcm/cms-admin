import React from "react";
import { Grid, Typography } from "@material-ui/core";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import { makeStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles({
  textSuccess: {
    color: green[500]
  }
});

const SuccessMessage = props => {
  const classes = useStyles();
  return (
    <Grid container justify="space-around" alignItems="center" direction="row">
      <Grid item>
        <CheckOutlinedIcon fontSize="large" className={classes.textSuccess} />
      </Grid>
      <Grid item>
        <Typography className={classes.textSuccess} variant="h6">
          {props.message}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SuccessMessage;
