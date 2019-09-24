import React from "react";
import { connect } from "react-redux";
import { Container, Button, Grid } from "@material-ui/core";

import Loading from "../common/Loading";
import ProfileDetail from "../modules/ProfileDetail";
import ChangePassword from "../modules/ChangePassword";
import { changePassword } from "../../actions/profile";
import { clearError } from "../../actions/error";

class Profile extends React.Component {
  state = {
    profile: null, // User's profile
    changePasswordState: { state: null, message: "" },
    // null - no action,
    // success - password is successfully changed
    // fail - failed to change password
    isChangingPassword: false
  };

  componentDidMount = async () => {
    if (this.props.auth) {
      this.setState({
        profile: this.props.auth.data.admin
      });
    }
  };

  handleChangePassword = async formValues => {
    // console.log(formValues);
    const { oldPassword, newPassword } = formValues;
    const { email } = this.state.profile;
    await this.props.changePassword({ oldPassword, newPassword, email });
    const { error } = this.props;
    if (error.type === "profile") {
      this.setState({
        changePasswordState: {
          state: "fail",
          message: error.errorMsg
        }
      });
    }
    if (error.type !== "profile" && error.errorMsg === "") {
      this.setState({
        changePasswordState: {
          state: "success",
          message: "Password is changed successfully"
        }
      });
    }
  };

  handleResetState = () => {
    this.props.clearError();
    this.setState({
      changePasswordState: {
        state: null,
        message: ""
      }
    });
    // this.props.history.push("/profile");
  };

  render() {
    const { profile } = this.state;
    if (!profile) {
      return <Loading />;
    }
    return (
      <React.Fragment>
        <Container maxWidth="sm">
          <ProfileDetail profile={profile} />
          <br />
          <Grid container justify="space-around">
            <Grid item>
              <Button
                variant={
                  this.state.isChangingPassword ? "contained" : "outlined"
                }
                onClick={() => {
                  this.setState(state => {
                    return {
                      isChangingPassword: !state.isChangingPassword
                    };
                  });
                }}
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
          <br />
          {this.state.isChangingPassword && (
            <ChangePassword
              onChangePassword={this.handleChangePassword}
              changePasswordState={this.state.changePasswordState}
              onResetState={this.handleResetState}
            />
          )}
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.auth,
    profile: state.profile.profile,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { changePassword, clearError }
)(Profile);
