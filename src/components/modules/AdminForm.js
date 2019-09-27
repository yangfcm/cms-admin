import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { reduxForm, Field } from "redux-form";
import { Button, Grid, FormHelperText } from "@material-ui/core";
import { RenderTextField, RenderSimpleSelect } from "../form/Fields";
import { validateAddAdminInput } from "../../utils/validate";

class AdminForm extends React.Component {
  formSubmit = formValues => {
    this.props.onAddAdmin(formValues);
  };

  render() {
    const { handleSubmit } = this.props;
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
            <Button variant="outlined" color="primary" type="submit">
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
        {/* error.type === "admin" && error.errorMsg && (
          <FormHelperText error style={{ marginTop: "0" }}>
            {error.errorMsg}
          </FormHelperText>
				) */}
        <br />
      </React.Fragment>
    );
  }
}

export default reduxForm({
  form: "addAdmin",
  touchOnBlur: false,
  touchOnChange: false,
  validate: validateAddAdminInput
})(AdminForm);
