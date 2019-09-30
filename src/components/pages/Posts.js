import React from "react";
import { connect } from "react-redux";
import {
  Container,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Badge,
  Grid
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import moment from "moment";
import { withRouter } from "react-router";

import { readPosts, deletePost, updatePost } from "../../actions/post";
import { clearError } from "../../actions/error";
import PageTitle from "../common/PageTitle";
import Loading from "../common/Loading";
import Avatar from "../common/Avatar";
import Alert from "../modals/Alert";
import Confirm from "../modals/Confirm";
import tableIcons from "../common/TableIcons";

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

class Posts extends React.Component {
  state = {
    postsColumns: [
      {
        title: "Title",
        field: "title",
        render: rowData => {
          return rowData.isTop ? (
            <Badge
              style={{ paddingRight: 1 + "rem" }}
              color="secondary"
              badgeContent="top"
            >
              {rowData.title}
            </Badge>
          ) : (
            rowData.title
          );
        }
      },
      {
        title: "Category",
        field: "category",
        render: rowData => {
          return rowData.category ? rowData.category.name : "No Category";
        },
        customSort: (a, b) => {
          return a.category.name.toLowerCase() > b.category.name.toLowerCase()
            ? 1
            : -1;
        }
      },
      {
        title: "Author",
        field: "author",
        render: rowData => {
          return rowData.author ? (
            <Avatar loginUser={rowData.author} color="orange" />
          ) : (
            "No avatar"
          );
        },
        customSort: (a, b) => {
          return a.author.firstname.toLowerCase() >
            b.author.firstname.toLowerCase()
            ? 1
            : -1;
        }
      },
      {
        title: "Created At",
        field: "createdAt",
        render: rowData => {
          return moment(rowData.createdAt * 1000).format("Do MMM YYYY");
        }
      },
      {
        title: "Updated At",
        field: "updatedAt",
        render: rowData => {
          return moment(rowData.updatedAt * 1000).format("Do MMM YYYY");
        }
      },
      {
        title: "Status",
        field: "status",
        render: rowData => {
          return rowData.status === "1" ? (
            <Typography color="primary">Published</Typography>
          ) : (
            <Typography color="inherit">Draft</Typography>
          );
        }
      }
    ],
    postsData: null,
    trashColumns: [
      { title: "Title", field: "title" },
      {
        title: "Category",
        field: "category",
        render: rowData => {
          return rowData.category ? rowData.category.name : "No Category";
        }
      },
      {
        title: "Author",
        field: "author",
        render: rowData => {
          return rowData.author ? (
            <Avatar loginUser={rowData.author} color="orange" />
          ) : (
            "No avatar"
          );
        }
      },
      {
        title: "Deleted At",
        field: "updatedAt",
        render: rowData => {
          return moment(rowData.updatedAt * 1000).format("Do MMM YYYY");
        }
      }
    ],
    trashData: null,
    value: 0,
    openConfirmDeleteModal: false, // Open or not open the modal to confirm post deletion
    postIdToDelete: null // id of the post to delete
  };

  filterData = () => {
    // Filter out normal posts and deleted posts(in trash) and put them in different state
    if (this.props.post && this.props.post.length >= 0) {
      this.setState({
        postsData: this.props.post.filter(post => {
          return post.status === "1" || post.status === "2";
        }),
        trashData: this.props.post.filter(post => {
          return post.status === "3";
        })
      });
    }
  };

  componentDidMount = async () => {
    await this.props.readPosts();
    this.filterData();
  };

  /** Close alert window */
  handleCloseAlert = () => {
    this.props.clearError();
  };

  /** Move a post to trash */
  handleMoveToTrash = async (ev, rowData) => {
    // Move post to trash
    await this.props.updatePost(rowData._id, {
      status: "3"
    });
    if (this.props.error.errorMsg) {
      return;
    }
    this.setState((state, props) => {
      return {
        postsData: props.post.filter(post => {
          return post.status === "1" || post.status === "2";
        }),
        trashData: [...state.trashData, rowData]
      };
    });
  };

  /** Edit a post, redirect to post edit page */
  handleEdit = (ev, rowData) => {
    // Go to post edit page
    console.log(rowData);
    this.props.history.push(`/edit/${rowData._id}`);
  };

  /** Delete a post permanently */
  handleDeletePermanently = async () => {
    await this.props.deletePost(this.state.postIdToDelete);
    if (this.props.error.errorMsg) {
      this.setState({
        openConfirmDeleteModal: false,
        postIdToDelete: null
      });
      return;
    }
    this.setState((state, props) => {
      return {
        trashData: props.post.filter(post => {
          return post.status === "3";
        }),
        openConfirmDeleteModal: false, // close confirm modal
        postIdToDelete: null
      };
    });
  };

  /** Move a post out from trash */
  handleRestoreFromTrash = async (ev, rowData) => {
    await this.props.updatePost(rowData._id, {
      status: "2"
    });
    if (this.props.error.errorMsg) {
      return;
    }
    this.setState((state, props) => {
      return {
        trashData: props.post.filter(post => {
          return post.status === "3";
        }),
        postsData: [...state.postsData, rowData]
      };
    });
  };

  renderPostDetailPanel = rowData => {
    return (
      <Container maxWidth="md">
        <Box component="div" p={1}>
          <Grid container>
            <Grid item md={8} xs={12}>
              <Grid container>
                <Grid container>
                  <Grid item xs={2}>
                    <Typography variant="subtitle2" component="span">
                      Title
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body1" component="span">
                      {rowData.title}
                    </Typography>
                  </Grid>
                </Grid>{" "}
                {/* post title */}
                <Grid container>
                  <Grid item xs={2}>
                    <Typography variant="subtitle2" component="span">
                      Category
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body1" component="span">
                      {rowData.category.name}
                    </Typography>
                  </Grid>
                </Grid>{" "}
                {/* Category */}
                {rowData.tags.length > 0 && (
                  <Grid container>
                    <Grid item xs={2}>
                      <Typography variant="subtitle2" component="span">
                        Tags
                      </Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography variant="body1" component="span">
                        {rowData.tags.map((tag, index) => {
                          if (index === 0) return tag.name;
                          else {
                            return " | " + tag.name;
                          }
                        })}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                {/* Tags */}
                <Grid container>
                  <Grid item xs={2}>
                    <Typography variant="subtitle2" component="span">
                      Author Name
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body1" component="span">
                      {rowData.author.firstname + " " + rowData.author.lastname}
                    </Typography>
                  </Grid>
                </Grid>{" "}
                {/* post author's name */}
                <Grid container>
                  <Grid item xs={2}>
                    <Typography variant="subtitle2" component="span">
                      Author Email
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body1" component="span">
                      {rowData.author.email}
                    </Typography>
                  </Grid>
                </Grid>{" "}
                {/* post author's email */}
                <Grid container>
                  <Grid item xs={2}>
                    <Typography variant="subtitle2" component="span">
                      Username
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body1" component="span">
                      {rowData.author.username}
                    </Typography>
                  </Grid>
                </Grid>{" "}
                {/* author's username */}
                <Grid container>
                  <Grid item xs={2}>
                    <Typography variant="subtitle2" component="span">
                      Created At
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body1" component="span">
                      {moment(rowData.createdAt * 1000).format(
                        "Do MMM YYYY, h:mm:ss a"
                      )}
                    </Typography>
                  </Grid>
                </Grid>{" "}
                {/* Creation date time */}
                <Grid container>
                  <Grid item xs={2}>
                    <Typography variant="subtitle2" component="span">
                      Updated At
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body1" component="span">
                      {moment(rowData.updatedAt * 1000).format(
                        "Do MMM YYYY, h:mm:ss a"
                      )}
                    </Typography>
                  </Grid>
                </Grid>{" "}
                {/* last update date time */}
              </Grid>
            </Grid>
            <Grid item md={4} xs={12}>
              <Grid
                container
                justify="center"
                alignItems="center"
                style={{ height: "100%" }}
              >
                {rowData.featuredImage && (
                  <img
                    src={rowData.featuredImage}
                    alt={rowData.title}
                    style={{ maxWidth: "80%", maxHeight: 160 + "px" }}
                  />
                )}
              </Grid>{" "}
              {/* Featured image */}
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  };

  render() {
    // console.log(this.state);
    const { error, classes } = this.props;
    const adminId = this.props.auth.auth.data.admin._id;
    if (!this.state.postsData) {
      // Is fetching data
      return <Loading />;
    }
    return (
      <React.Fragment>
        <PageTitle>Posts Admin</PageTitle>
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
                      this.state.postsData
                        ? this.state.postsData.length.toString()
                        : "0"
                    }
                  >
                    Posts
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
                    Trash
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
              columns={this.state.postsColumns}
              data={this.state.postsData}
              actions={[
                rowData => ({
                  icon: tableIcons.Edit,
                  tooltip: "Edit",
                  onClick: this.handleEdit,
                  disabled: rowData.author._id !== adminId
                }),
                rowData => ({
                  icon: tableIcons.Delete,
                  tooltip: "Move to Trash",
                  onClick: this.handleMoveToTrash,
                  disabled: rowData.author._id !== adminId
                })
              ]}
              detailPanel={this.renderPostDetailPanel}
              onRowClick={(ev, rowData, togglePanel) => {
                togglePanel();
              }}
              options={{
                sorting: true
              }}
            />
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            <MaterialTable
              style={{ paddingLeft: 1 + "rem", paddingRight: 1 + "rem" }}
              title=""
              icons={tableIcons}
              columns={this.state.trashColumns}
              data={this.state.trashData}
              actions={[
                rowData => ({
                  icon: tableIcons.DeleteForever,
                  tooltip: "Delete Permanently",
                  onClick: (ev, rowData) => {
                    this.setState({
                      openConfirmDeleteModal: true,
                      postIdToDelete: rowData._id
                    });
                  },
                  disabled: rowData.author._id !== adminId
                }),
                rowData => ({
                  icon: tableIcons.Restore,
                  tooltip: "Restore",
                  onClick: this.handleRestoreFromTrash,
                  disabled: rowData.author._id !== adminId
                })
              ]}
              detailPanel={this.renderPostDetailPanel}
              onRowClick={(ev, rowData, togglePanel) => {
                togglePanel();
              }}
              options={{
                sorting: true
              }}
            />
          </TabPanel>
        </Container>

        <Alert
          isOpen={error.type === "post" && error.errorMsg}
          message={error.errorMsg}
          onCloseAlert={this.handleCloseAlert}
        />
        <Confirm
          isOpen={this.state.openConfirmDeleteModal}
          message="Are you sure to delete the post permanently?"
          onCloseConfirm={() => {
            this.setState({
              openConfirmDeleteModal: false,
              postIdToDelete: null
            });
          }}
          onConfirm={this.handleDeletePermanently}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.post,
    auth: state.auth,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  {
    readPosts,
    deletePost,
    updatePost,
    clearError
  }
)(withStyles(styles)(withRouter(Posts)));
