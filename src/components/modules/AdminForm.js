import React from "react";
import { reduxForm, Field } from "redux-form";
import { Button, Grid, Typography } from "@material-ui/core";
import { RenderTextField, RenderSimpleSelect } from "../form/Fields";
import {
  validateAddAdminInput,
  asyncValidateAddAdminInput
} from "../../utils/validate";

class AdminForm extends React.Component {
  state = { isSubmitting: false };

  formSubmit = async formValues => {
    this.setState({
      isSubmitting: true
    });
    await this.props.onAddAdmin(formValues);
    this.setState({
      isSubmitting: false
    });
  };

  render() {
    const { handleSubmit, pristine } = this.props;
    const { isSubmitting } = this.state;
    // console.log(this.props.error);
    return (
      <React.Fragment>
        <form onSubmit={handleSubmit(this.formSubmit)}>
          <Field
            name="username"
            id="username"
            type="text"
            label="Username"
            component={RenderTextField}
          />
          <Field
            name="firstname"
            id="firstname"
            type="text"
            label="First Name"
            component={RenderTextField}
          />
          <Field
            name="lastname"
            id="lastname"
            type="text"
            label="Last Name"
            component={RenderTextField}
          />
          <Field
            name="email"
            id="email"
            type="text"
            label="Email"
            component={RenderTextField}
          />
          <Field
            name="role"
            id="role"
            label="Role"
            component={RenderSimpleSelect}
            options={[
              { id: 1, label: "Super Admin", value: 1 },
              { id: 2, label: "Admin", value: 2 }
            ]}
          />
          <Field
            id="status"
            name="status"
            label="Status"
            component={RenderSimpleSelect}
            options={[
              { id: 0, label: "Inactive", value: 0 },
              { id: 1, label: "Active", value: 1 }
            ]}
          />
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
          <Grid container justify="space-around">
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              disabled={pristine || isSubmitting}
            >
              Create
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
        </form>
        <br />
        <Grid container justify="center">
          {this.props.isSuccess && (
            <Typography color="secondary">
              Admin is created successfully!
            </Typography>
          )}
        </Grid>
        <br />
      </React.Fragment>
    );
  }
}

export default reduxForm({
  form: "addAdmin",
  touchOnBlur: false,
  touchOnChange: false,
  validate: validateAddAdminInput,
  asyncValidate: asyncValidateAddAdminInput,
  asyncChangeFields: ["username", "email"]
})(AdminForm);
