import React, { Component } from "react";
import { Popover, PopoverBody, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GOOGLE_CLIENT_ID } from "../../utils/constants";
import { connect } from "react-redux";
import { loginUser, logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { GoogleLogin } from "react-google-login";

class LoginPopover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false,
      email: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  responseGoogle(res) {
    this.toggle();
    console.log(res);
    if (res && res.accessToken) {
      this.props.loginUser(res.accessToken);
    } else {
      alert("Im sorry there was an error loging you in!");
    }
  }

  onLogOut(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { auth } = this.props;

    return (
      <div style={{ display: "flex" }}>
        {auth && auth.user.displayName ? (
          <span className="mr-sm-2">{auth.user.displayName}</span>
        ) : null}
        <a id="Popover1" onClick={this.toggle}>
          {auth && auth.user.avatar ? (
            <div className="user-icon">
              <img src={auth.user.avatar} alt={auth.user.displayName} />
            </div>
          ) : (
            <FontAwesomeIcon icon="user-circle" />
          )}
        </a>

        <Popover
          placement="bottom-end"
          isOpen={this.state.popoverOpen}
          target="Popover1"
          toggle={this.toggle}
        >
          <PopoverBody>
            {auth && auth.isAuthenticated ? (
              <span className="google-btn">
                <Button color="danger" onClick={this.onLogOut.bind(this)}>
                  {/* <FontAwesome name="google" className="fab" /> */}
                  <span className="ml-2">Sign out</span>
                </Button>
              </span>
            ) : (
              <span className="google-btn">
                <GoogleLogin
                  clientId={GOOGLE_CLIENT_ID}
                  buttonText="Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                >
                  {/* <FontAwesome name="google" className="fab" /> */}
                  {/* <span className="ml-2">Sign in</span> */}
                </GoogleLogin>
              </span>
            )}
            {/* </form> */}
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

LoginPopover.propTypes = {
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser, logoutUser }
)(LoginPopover);
