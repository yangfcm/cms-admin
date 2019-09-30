/** Manage admins */
/** Super admin permissions:
 * - Create admin(super admin)
 * - Update admin(disable/enable admin, change role)
 * - Delete admin
 * - Reset password
 */
import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import MaterialTable from "material-table";
// import moment from "moment";

import {
  readAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  resetPassword
} from "../../actions/admin";
import { clearError } from "../../actions/error";
import PageTitle from "../common/PageTitle";
import Loading from "../common/Loading";
// import Avatar from "../common/Avatar";
import Alert from "../modals/Alert";
import tableIcons from "../common/TableIcons";
import AdminForm from "../modules/AdminForm";
import ResetPassword from "../modules/ResetPassword";

class Admins extends React.Component {
  state = {
    columns: [
      { title: "Username", field: "username" },
      { title: "First Name", field: "firstname" },
      { title: "Last Name", field: "lastname" },
      { title: "Email", field: "email" },
      {
        title: "Role",
        field: "role",
        lookup: { 1: "Super Admin", 2: "Admin" },
        render: rowData => {
          return rowData.role === 1 ? "Super Admin" : "Admin";
        }
      },
      {
        title: "Status",
        field: "status",
        lookup: { 0: "Inactive", 1: "Active" },
        render: rowData => {
          return rowData.status === 0 ? (
            <Typography color="secondary">Inactive</Typography>
          ) : (
            <Typography>Active</Typography>
          );
        }
      }
    ],
    data: null,
    openAddAdminForm: false,
    openResetPasswordForm: false,
    adminIdToResetPassword: null,
    isSuccess: false // Indicate if form operation is successful
  };

  componentDidMount = async () => {
    await this.props.readAdmins();
    this.setState({
      data: this.props.admin
    });
  };

  /** Add an admin */
  handleAddAdmin = async formValues => {
    // console.log(formValues);
    await this.props.createAdmin(formValues);
    if (!this.props.error.errorMsg) {
      this.setState({
        isSuccess: true,
        data: this.props.admin
      });
      setTimeout(() => {
        this.setState({
          isSuccess: false,
          openAddAdminForm: false
        });
      }, 800);
    }
  };

  /** Reset password */
  handleResetPassword = async formValues => {
    const id = this.state.adminIdToResetPassword;
    const { password } = formValues;
    await this.props.resetPassword({ id, password });
    if (!this.props.error.errorMsg) {
      this.setState({
        isSuccess: true
      });
      setTimeout(() => {
        this.setState({
          isSuccess: false,
          openResetPasswordForm: false
        });
      }, 800);
    }
  };

  /** Update admin */
  handleUpdateAdmin = (newData, oldData) => {
    console.log(this.props.auth.auth.data.admin._id);
    console.log(oldData);
    return new Promise(async (resolve, reject) => {
      const data = this.state.data;
      const index = data.indexOf(oldData);
      data[index] = newData;
      await this.props.updateAdmin(oldData._id, newData);
      if (this.props.error.errorMsg) {
        reject();
      } else {
        this.setState({
          data: this.props.admin
        });
        resolve();
      }
    });
  };

  /** Delete admin */
  handleDeleteAdmin = oldData => {
    return new Promise(async (resolve, reject) => {
      await this.props.deleteAdmin(oldData._id);
      if (this.props.error.errorMsg) {
        reject();
      } else {
        this.setState({
          data: this.props.admin
        });
        resolve();
      }
    });
  };

  render() {
    const { error } = this.props;
    if (!this.state.data) {
      return <Loading />;
    }
    // console.log(this.state.data);
    return (
      <React.Fragment>
        <PageTitle>Admins Management</PageTitle>
        <Container maxWidth="lg">
          <MaterialTable
            title="Admins List"
            icons={tableIcons}
            columns={this.state.columns}
            data={this.state.data}
            editable={{
              isEditable: rowData =>
                rowData._id !== this.props.auth.auth.data.admin._id,
              isDeletable: rowData =>
                rowData._id !== this.props.auth.auth.data.admin._id,
              onRowUpdate: this.handleUpdateAdmin,
              onRowDelete: this.handleDeleteAdmin
            }}
            actions={[
              {
                icon: tableIcons.Add,
                tooltip: "Add Admin",
                isFreeAction: true,
                onClick: () => {
                  this.setState({ openAddAdminForm: true });
                }
              },
              rowData => ({
                icon: tableIcons.ResetPassword,
                tooltip: "Reset Password",
                onClick: () => {
                  this.setState({
                    openResetPasswordForm: true,
                    adminIdToResetPassword: rowData._id
                  });
                },
                disabled: rowData._id === this.props.auth.auth.data.admin._id
              })
            ]}
          />
        </Container>

        <Alert
          isOpen={error.type === "admin" && error.errorMsg}
          message={error.errorMsg}
          onCloseAlert={this.props.clearError}
        />

        <Dialog fullScreen open={this.state.openAddAdminForm}>
          <Container maxWidth="sm" style={{ paddingTop: "6rem" }}>
            <Typography variant="h5">Add Admin</Typography>
            <AdminForm
              onAddAdmin={this.handleAddAdmin}
              onCancel={() => {
                this.setState({
                  openAddAdminForm: false
                });
              }}
              isSuccess={this.state.isSuccess}
            />
          </Container>
        </Dialog>

        <Dialog fullScreen open={this.state.openResetPasswordForm}>
          <Container maxWidth="sm" style={{ paddingTop: "6rem" }}>
            <DialogTitle>
              <Typography variant="h5">Reset Password</Typography>
            </DialogTitle>
            <DialogContent>
              <ResetPassword
                onResetPassword={this.handleResetPassword}
                onCancel={() => {
                  this.setState({
                    openResetPasswordForm: false
                  });
                }}
                isSuccess={this.state.isSuccess}
              />
            </DialogContent>
          </Container>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    admin: state.admin,
    auth: state.auth,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  {
    readAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    resetPassword,
    clearError
  }
)(Admins);
