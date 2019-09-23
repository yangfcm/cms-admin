import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Container, Typography, Button, Modal, Grid } from "@material-ui/core";

import { RenderTextField } from "../form/Fields";
import { validateChangePasswordInput } from "../../utils/validate";

class ChangePassword extends React.Component {
  formSubmit = formValues => {
    this.props.changePassword(formValues);
  };

  render() {
    const { handleSubmit } = this.props;
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
              Change
            </Button>
          </Grid>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,null
)(
  reduxForm({
    form: "changePassword",
    validate: validateChangePasswordInput,
    touchOnBlur: false,
    touchOnChange: false
  })(ChangePassword)
);
