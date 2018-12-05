import React, { Component, Fragment } from "react";
import { Tooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import "firebase/auth";
import { logoutUser } from "../../../actions/authActions";
import { toggleUploadPanel } from "../../../actions/userActions";

class SignOutBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  signOut(e) {
    e.preventDefault();
    firebase.auth().signOut();
    this.props.logoutUser();
    this.props.toggleUploadPanel(true);
  }

  render() {
    return (
      <Fragment>
        <a id="sign-pop" onClick={this.signOut.bind(this)}>
          <FontAwesomeIcon icon="sign-out-alt" className="mr-2" />
        </a>
        <Tooltip
          placement="top"
          isOpen={this.state.isOpen}
          target="sign-pop"
          toggle={() => this.setState({ isOpen: !this.state.isOpen })}
        >
          Sign Out
        </Tooltip>
      </Fragment>
    );
  }
}

SignOutBtn.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  toggleUploadPanel: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users
});

export default connect(
  mapStateToProps,
  { logoutUser, toggleUploadPanel }
)(SignOutBtn);
