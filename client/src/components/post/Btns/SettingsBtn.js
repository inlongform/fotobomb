import React, { Component, Fragment } from "react";
import { Tooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

class SettingsBtn extends Component {
  state = {
    isOpen: false
  };
  render() {
    return (
      <Fragment>
        <Link to="/settings" className="ml-2" id="settings_pop">
          <FontAwesomeIcon icon="cog" className="mr-2" />
        </Link>
        <Tooltip
          placement="top"
          isOpen={this.state.isOpen}
          target="settings_pop"
          toggle={() => this.setState({ isOpen: !this.state.isOpen })}
        >
          Settings
        </Tooltip>
      </Fragment>
    );
  }
}

export default SettingsBtn;
