import React from "react";
import { reduxForm, Field } from "redux-form";
import { Button, Grid, DialogActions, Typography } from "@material-ui/core";
import { RenderTextField } from "../form/Fields";
import { validateChangePasswordInput } from "../../utils/validate";

class ResetPassword extends React.Component {
  state = { isSubmitting: false };
  formSubmit = async formValues => {
    this.setState({
      isSubmitting: true
    });
    await this.props.onResetPassword(formValues);
    this.setState({
      isSubmitting: false
    });
  };

  render() {
    const { handleSubmit, pristine } = this.props;
    const { isSubmitting } = this.state;
    return (
      <React.Fragment>
        <form onSubmit={handleSubmit(this.formSubmit)}>
          <Field
            name="password"
            id="password"
            type="password"
            label="Password"
            component={RenderTextField}
          />
          <Field
            name="confPassword"
            id="confPassword"
            type="password"
            label="Confirm Password"
            component={RenderTextField}
          />
          <br />
          <br />
          <DialogActions>
            <Grid container justify="space-around">
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                disabled={pristine || isSubmitting}
              >
                Reset
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                type="button"
                onClick={this.props.onCancel}
              >
                Cancel
              </Button>
            </Grid>
          </DialogActions>
        </form>
        <Grid container justify="center">
          {this.props.isSuccess && (
            <Typography color="secondary">
              Password is reset successfully!
            </Typography>
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

export default reduxForm({
  form: "resetPassword",
  touchOnBlur: false,
  touchOnChange: false,
  validate: validateChangePasswordInput
})(ResetPassword);
