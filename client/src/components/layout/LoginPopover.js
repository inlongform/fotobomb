import React, { Component, Fragment } from "react";
import { Popover, PopoverBody, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FIREBASE_CONFIG } from "../../utils/constants";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../../actions/authActions";
import { toggleUploadPanel } from "../../actions/userActions";
import PropTypes from "prop-types";

import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

class LoginPopover extends Component {
  constructor(props) {
    super(props);

    firebase.initializeApp(FIREBASE_CONFIG);

    this.state = {
      popoverOpen: false,
      email: "",
      password: "",
      isSignedIn: false
    };

    this.uiConfig = {
      signInFlow: "popup",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult: () => false
      }
    };

    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  componentDidMount = () => {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const nUser = {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
          google: {
            id: user.uid,
            email: user.email
          }
        };

        this.props.loginUser(nUser);
      }
      this.setState({ isSignedIn: !!user });
    });
  };

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  openPanel(e) {
    e.preventDefault();
    this.props.toggleUploadPanel(true);
  }

  render() {
    const { auth } = this.props;

    return (
      <div style={{ display: "flex" }}>
        {auth && auth.user.avatar ? (
          <a onClick={this.openPanel.bind(this)}>
            <div className="user-icon">
              <img
                src={auth.user.avatar}
                alt={auth.user.displayName}
                className="rounded-circle"
              />
            </div>
          </a>
        ) : (
          <Fragment>
            <a id="Popover1" onClick={this.toggle}>
              <FontAwesomeIcon icon="user-circle" />
            </a>

            <Popover
              placement="bottom-end"
              isOpen={this.state.popoverOpen}
              target="Popover1"
              toggle={this.toggle}
            >
              <PopoverBody>
                <span className="google-btn">
                  <StyledFirebaseAuth
                    uiConfig={this.uiConfig}
                    firebaseAuth={firebase.auth()}
                  />
                </span>
              </PopoverBody>
            </Popover>
          </Fragment>
        )}
      </div>
    );
  }
}

LoginPopover.propTypes = {
  loginUser: PropTypes.func.isRequired,
  toggleUploadPanel: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users
});

export default connect(
  mapStateToProps,
  { loginUser, toggleUploadPanel }
)(LoginPopover);
