import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field, SubmissionError } from "redux-form";
import { Container, Typography, Button, Grid } from "@material-ui/core";

import { RenderTextField } from "../form/Fields";
import { validateChangePasswordInput } from "../../utils/validate";
import { changePassword } from "../../actions/profile";
import { clearError } from "../../actions/error";
import Alert from "../modals/Alert";

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

class ChangePassword extends React.Component {
  formSubmit = formValues => {
    this.props.onChangePassword(formValues);
  };

  render() {
    const { handleSubmit, changePasswordState, onResetState } = this.props;
    console.log(changePasswordState);
    return (
      <Container>
        <form onSubmit={handleSubmit(this.formSubmit)}>
          <Field // old password
            name="oldPassword"
            id="oldPassword"
            type="password"
            label="Old Password"
            required={false}
            component={RenderTextField}
          />
          <Field // new password
            name="newPassword"
            id="newPassword"
            type="password"
            label="New Password"
            required={false}
            component={RenderTextField}
          />
          <Field // confirm password
            name="confPassword"
            id="confPassword"
            type="password"
            label="Confirm Password"
            required={false}
            component={RenderTextField}
          />
          <br />
          <br />
          <Grid container justify="center">
            <Button variant="outlined" color="secondary" type="submit">
              Change Password
            </Button>
          </Grid>

          <Alert
            message={changePasswordState.message}
            isOpen={changePasswordState.state}
            onCloseAlert={onResetState}
          />
        </form>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    authData: state.auth.auth.data,
    profile: state.profile,
    error: state.error
  };
};

export default compose(
  connect(
    mapStateToProps,
    { changePassword, clearError }
  ),
  reduxForm({
    form: "changePassword",
    validate: validateChangePasswordInput,
    touchOnBlur: false,
    touchOnChange: false
  })
)(ChangePassword);
