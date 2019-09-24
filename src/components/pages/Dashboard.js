import React from "react";
import Greeting from "../modules/Greeting";
import ChangePassword from "../modules/ChangePassword";
import Login from "../pages/Login";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <Greeting />
      </div>
    );
  }
}

export default Dashboard;
