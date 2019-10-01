import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Body from "../components/layout/Body";
import Footer from "../components/layout/Footer";
import { checkAuth } from "../actions/auth";

/** The route only super admin can access */
class SuperAdminRoute extends React.Component {
  componentDidMount = () => {
    // console.log('check auth,', this.props);
    this.props.checkAuth();
  };

  render() {
    const {
      auth: { auth, error },
      checkAuth,
      component: Component,
      ...rest
    } = this.props;
    // console.log(auth);
    if (auth === null && error === null) {
      // Initial state
      return <div></div>;
    }

    if (!!error || !auth.data) {
      // Auth failed
      // console.log(auth);
      return <Redirect to="/login" />;
    }

    if (auth.data.admin.role !== 1) {
      console.log(this.props.history);
      // Check if it is super admin, If not go back to previous page
      return <Redirect to="/dashboard" />;
      // this.props.history.push("/dashboard");
    }

    return (
      <Route
        component={props => (
          <div>
            <Header />
            <Body>
              <Sidebar />
              <Component {...props} />
              <Footer />
            </Body>
          </div>
        )}
        {...rest}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { checkAuth }
)(SuperAdminRoute);
