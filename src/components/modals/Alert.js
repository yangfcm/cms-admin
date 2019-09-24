import React from "react";
import { Modal, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ErrorMessage from "../common/ErrorMessage";
import SuccessMessage from "../common/SuccessMessage";

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #aaa",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "50%",
    minHeight: "20%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const Alert = ({ message, isOpen, onCloseAlert, type }) => {
  const classes = useStyles();
  return (
    <Modal
      open={!!isOpen}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      onClose={() => {
        onCloseAlert();
      }}
      disableBackdropClick
    >
      <Grid
        className={classes.paper}
        container
        direction="column"
        justify="space-around"
      >
        <Grid item>
          {type === "success" ? (
            <SuccessMessage message={message} />
          ) : (
            <ErrorMessage message={message} />
          )}
        </Grid>
        <Grid item>
          <Button
            color="default"
            onClick={() => {
              onCloseAlert();
            }}
          >
            OK
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default Alert;
