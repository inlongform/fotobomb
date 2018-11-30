import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  Button,
  Form
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostList from "./PostLIst";
import { updateProfile } from "../../actions/authActions";
import { getPostsByUser } from "../../actions/postActions";
import isEmpty from "../../utils/is-empty";

class Settings extends Component {
  constructor(props) {
    super(props);

    const { auth } = this.props;
    this.onChange = this.onChange.bind(this);

    this.onUpdateProfile = this.onUpdateProfile.bind(this);
    this.state = {
      displayName: auth.user.displayName,
      location: auth.user.location ? auth.user.location : ""
    };
  }

  componentDidMount() {
    this.props.getPostsByUser(this.props.auth.user._id);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onUpdateProfile(e) {
    e.preventDefault();

    const { auth } = this.props;
    let params = {};

    if (this.state.displayName !== auth.user.displayName) {
      if (this.state.displayName < 3) {
        alert("Display Name has to be longer than 3 characters!");
      } else {
        params["displayName"] = this.state.displayName;
      }
    }

    if (this.state.location !== auth.user.location) {
      if (this.state.location.length < 3) {
        alert("Please enter a valid location!");
      } else {
        params["location"] = this.state.location;
      }
    }

    if (isEmpty(params)) {
      alert("please update settings before saving!");
    } else {
      this.props.updateProfile(this.props.auth.user._id, params);
    }
  }
  render() {
    const { post } = this.props;

    return (
      <Container style={{ marginTop: "40px" }}>
        <Row>
          <Col>
            <h4 style={{ width: "100%" }}>Settings</h4>
            <Form onSubmit={this.onUpdateProfile}>
              <FormGroup>
                <Label for="displayName">Display Name</Label>
                <Input
                  type="displayName"
                  name="displayName"
                  id="displayName"
                  placeholder="Display Name"
                  value={this.state.displayName}
                  onChange={this.onChange}
                />
              </FormGroup>

              <FormGroup>
                <Label for="exampleEmail">Location (optional)</Label>
                <Input
                  type="location"
                  name="location"
                  id="location"
                  placeholder="Location"
                  value={this.state.location}
                  onChange={this.onChange}
                />
              </FormGroup>
              <Button>Save</Button>
            </Form>
          </Col>
        </Row>
        <Row style={{ marginTop: "40px" }}>
          {post && post.posts.length > 0 ? (
            <Col>
              <PostList posts={post.posts} />
            </Col>
          ) : null}
        </Row>
      </Container>
    );
  }
}

Settings.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  getPostsByUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { updateProfile, getPostsByUser }
)(Settings);
