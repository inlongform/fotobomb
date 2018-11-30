import React, { Component, Fragment } from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

export default class Notifications extends Component {
  createNotification = () => {
    switch (this.props.type) {
      case "info":
        NotificationManager.info(this.props.message, this.props.title);
        break;
      case "success":
        NotificationManager.success(this.props.message, this.props.title);
        break;
      case "warning":
        NotificationManager.warning(this.props.message, this.props.title);
        break;
      case "error":
        NotificationManager.error(this.props.message, this.props.title);
        break;
      default:
        return;
    }
  };

  render() {
    return (
      <Fragment>
        <NotificationContainer />
      </Fragment>
    );
  }
}
