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
  Box,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import MaterialTable from "material-table";
import moment from "moment";

import {
  readAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin
} from "../../actions/admin";
import { clearError } from "../../actions/error";
import PageTitle from "../common/PageTitle";
import Loading from "../common/Loading";
import Avatar from "../common/Avatar";
import Alert from "../modals/Alert";
import tableIcons from "../common/TableIcons";
import AdminForm from "../modules/AdminForm";

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
    openAddAdminForm: false
  };

  componentDidMount = async () => {
    await this.props.readAdmins();
    this.setState({
      data: this.props.admin
    });
  };

  handleAddAdmin = async formValues => {
    console.log(formValues);
    await this.props.createAdmin(formValues);
  };

  handleUpdateAdmin = async (oldData, newData) => {};

  handleDeleteAdmin = async oldData => {};

  render() {
    const { error } = this.props;
    if (!this.state.data) {
      return <Loading />;
    }
    console.log(this.state.data);
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
              }
            ]}
          />
        </Container>

        <Alert
          isOpen={error.type === "admin" && error.errorMsg}
          message={error.errorMsg}
          onCloseAlert={this.props.clearError}
        />

        <Dialog fullScreen open={this.state.openAddAdminForm}>
          <br />
          <br />
          <br />
          <br />
          <Container maxWidth="sm">
            <Typography variant="h5">Add Admin</Typography>
            <AdminForm
              onAddAdmin={this.handleAddAdmin}
              onCancel={() => {
                this.setState({
                  openAddAdminForm: false
                });
              }}
            />
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
    clearError
  }
)(Admins);
