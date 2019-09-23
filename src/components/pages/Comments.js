import React from "react";
import { connect } from "react-redux";
import {
  Container,
  AppBar,
  Tabs,
  Tab,
  Badge,
  Typography,
  Box
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import moment from "moment";

import {
  readComments,
  readComment,
  deleteComment,
  updateComment
} from "../../actions/comment";
import { clearError } from "../../actions/error";
import PageTitle from "../common/PageTitle";
import Loading from "../common/Loading";
import Avatar from "../common/Avatar";
import Alert from "../modals/Alert";
import Confirm from "../modals/Confirm";
import tableIcons from "../common/TableIcons";
import { truncateString } from "../../utils/utils";
// import TabPanel, { a11yProps } from "../common/TabPanel";

/**
 * Read all comments, the new(isRead = false) is put on the top
 * Operations:
 * - Categorize comments by its status 0(censored) or 1(published or normal)
 * - Set comment as top
 * - Trash a comment or trash comments in bulk
 * - Delete a comment or delete comments in bulk
 */
const TabPanel = props => {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tabpanel-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
};

const a11yProps = index => {
  return {
    id: `tabpanel-${index}`,
    "aria-controls": `tabpanel-${index}`
  };
};
const styles = theme => {
  return {
    badgeSpacing: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(0, 2)
    }
  };
};

const columns = [
  // The common columns used by normal comments and censored comments
  {
    title: "Comment",
    field: "content",
    render: rowData => {
      return rowData.isTop ? (
        <Badge
          style={{ paddingRight: 1 + "rem" }}
          color="secondary"
          badgeContent="top"
        >
          <Typography
            style={{ fontWeight: !rowData.isRead ? "bold" : "normal" }}
          >
            {truncateString(rowData.content, 50)}
          </Typography>
        </Badge>
      ) : (
        <Typography style={{ fontWeight: !rowData.isRead ? "bold" : "normal" }}>
          {truncateString(rowData.content, 50)}
        </Typography>
      );
    }
  },
  {
    title: "Post",
    field: "post",
    render: rowData => {
      return truncateString(rowData.post.title, 40);
    }
  },
  {
    title: "Author",
    field: "author",
    render: rowData => {
      return rowData.author ? (
        <Avatar
          loginUser={{
            lastname: rowData.author.lastName,
            firstname: rowData.author.firstName,
            email: rowData.author.email,
            avatarSrc: rowData.author.avatar
          }}
          color="orange"
        />
      ) : (
        "No avatar"
      );
    }
  }
];

class Comments extends React.Component {
  state = {
    commentsColumns: [
      ...columns,
      {
        title: "Created At",
        field: "createdAt",
        render: rowData => {
          return moment(rowData.createdAt * 1000).format("Do MMM YYYY");
        }
      }
    ], // Columns for normal comments
    commentsData: null, // Normal comments data
    trashColumns: [
      ...columns,
      {
        title: "Censored At",
        field: "updatedAt",
        render: rowData => {
          return moment(rowData.updatedAt * 1000).format("Do MMM YYYY");
        }
      }
    ], // Comments for censored
    trashData: null, // Censored comments data
    value: 0
  };

  setData = () => {
    // Filter out normal comments and censored comments
    // and save them in this.state.commentsData and this.state.trashData respectively
    if (this.props.comment && this.props.comment.length >= 0) {
      this.setState({
        commentsData: this.props.comment.filter(comment => {
          return comment.status === "1";
        }),
        trashData: this.props.comment.filter(comment => {
          return comment.status === "0";
        })
      });
    }
  };

  componentDidMount = async () => {
    await this.props.readComments();
    this.setData();
  };

  /** Set comment top
   * If the comment is already set as top, then unset it top.
   */
  handleSetTop = async (ev, rowData) => {
    console.log("set top", rowData);
    if (rowData.isTop === false) {
      await this.props.updateComment(rowData._id, {
        isTop: true
      });
    }
    if (rowData.isTop === true) {
      await this.props.updateComment(rowData._id, {
        isTop: false
      });
    }
    if (this.props.error.type === "comment" || this.props.error.errorMsg) {
      return;
    }
    this.setData();
  };

  /** Censor a comment(Move it to trash) */
  handleCensor = async (ev, rowData) => {
    console.log("censor", rowData);
    await this.props.updateComment(rowData._id, {
      status: "0"
    });
    if (this.props.error.type === "comment" || this.props.error.errorMsg) {
      return;
    }
    this.setData();
  };

  /** Delete a comment permanently */
  handleDeleteForever = async (ev, rowData) => {
    await this.props.deleteComment(rowData._id);
    if (this.props.error.type === "comment") {
      return;
    }
    this.setData();
  };

  /** Uncensor a comment(move comment from trash to published) */
  handleRestore = async (ev, rowData) => {
    await this.props.updateComment(rowData._id, {
      status: "1"
    });
    if (this.props.error.type === "comment") {
      return;
    }
    this.setData();
  };

  render() {
    console.log(this.props.comment);
    console.log(this.state);
    const { error, classes } = this.props;
    if (!this.state.commentsData || !this.state.trashData) {
      return <Loading />;
    }

    return (
      <React.Fragment>
        <PageTitle>Comments Admin</PageTitle>
        <Container maxWidth="lg">
          <AppBar position="static">
            <Tabs
              value={this.state.value}
              onChange={(e, newValue) => {
                this.setState({ value: newValue });
              }}
            >
              <Tab
                label={
                  <Badge
                    className={classes.badgeSpacing}
                    color="secondary"
                    badgeContent={
                      this.state.commentsData
                        ? this.state.commentsData.length.toString()
                        : "0"
                    }
                  >
                    Published
                  </Badge>
                }
                {...a11yProps(0)}
              />
              <Tab
                label={
                  <Badge
                    className={classes.badgeSpacing}
                    color="secondary"
                    badgeContent={
                      this.state.trashData
                        ? this.state.trashData.length.toString()
                        : "0"
                    }
                  >
                    Censored
                  </Badge>
                }
                {...a11yProps(1)}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={this.state.value} index={0}>
            <MaterialTable
              title=""
              icons={tableIcons}
              columns={this.state.commentsColumns}
              data={this.state.commentsData}
              actions={[
                {
                  icon: tableIcons.SetTop,
                  tooltip: "Toggle Top",
                  onClick: this.handleSetTop
                },
                {
                  icon: tableIcons.Censor,
                  tooltip: "Censor",
                  onClick: this.handleCensor
                }
              ]}
            />
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            <MaterialTable
              title=""
              icons={tableIcons}
              columns={this.state.trashColumns}
              data={this.state.trashData}
              actions={[
                {
                  icon: tableIcons.DeleteForever,
                  tooltip: "Delete permanently",
                  onClick: this.handleDeleteForever
                },
                {
                  icon: tableIcons.Restore,
                  tooltip: "Restore",
                  onClick: this.handleRestore
                }
              ]}
            />
          </TabPanel>
        </Container>

        <Alert
          isOpen={error.type === "comment"}
          message={error.errorMsg || "Operation failed!"}
          onCloseAlert={this.props.clearError}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    comment: state.comment,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { readComment, readComments, updateComment, deleteComment, clearError }
)(withStyles(styles)(Comments));
