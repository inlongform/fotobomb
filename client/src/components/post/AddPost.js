import React, { Component, Fragment } from "react";
import { Button, FormGroup, Label } from "reactstrap";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { CAPTION_LENGTH } from "../../utils/constants";
import { addPost } from "../../actions/postActions";
import { toggleUploadPanel } from "../../actions/userActions";
import SettingsBtn from "./Btns/SettingsBtn";
import SignOutBtn from "./Btns/SignOutBtn";
import FileUpload from "./FileUpload";
import TagInput from "./TagInput";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import Spinner from "../common/Spinner";

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: "",
      file: {},
      location: "",
      tags: [],
      errors: {},
      panelHeight: 66
    };

    this.onChange = this.onChange.bind(this);

    this.onUpdateFile = this.onUpdateFile.bind(this);
    this.onSubmitPost = this.onSubmitPost.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onTagChange(val) {
    this.setState({
      tags: val.map(nVal => {
        return String(nVal).replace(/\s+/g, "");
      })
    });
  }

  onUpdateFile(file) {
    this.setState({
      file: file
    });
  }

  onSubmitPost(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    if (!this.state.file["name"]) {
      alert("you forgot the image!");
      return;
    }

    if (this.state.tags < 1) {
      alert("There must be at least 1 tag associated with this post!");
      return;
    }

    if (this.state.caption > CAPTION_LENGTH) {
      alert(`your caption needs to be less than ${CAPTION_LENGTH} characters`);
      return;
    }

    let formData = new FormData();

    formData.append("file", this.state.file);
    formData.append("tags", this.state.tags);
    formData.append("id", user._id);
    if (this.state.caption) formData.append("caption", this.state.caption);

    this.props.addPost(formData, this.props.history);
  }

  componentDidMount() {
    let resizeId;

    this.resizePanel();

    window.onresize = () => {
      clearTimeout(resizeId);
      resizeId = setTimeout(() => {
        this.resizePanel();
      }, 500);
    };
  }

  resizePanel() {
    const navBar = document.getElementsByClassName("navbar")[0];
    this.setState({
      panelHeight: window.innerHeight - navBar.clientHeight
    });
  }

  closePanel(e) {
    e.preventDefault();
    this.props.toggleUploadPanel(false);
  }

  uploadProgress() {
    const { auth, post } = this.props;

    if (auth.isAuthenticated) {
      if (post.uploading) {
        return <Spinner />;
      } else {
        return (
          <Fragment>
            <div className="add-header">
              <h5 className="heavy">Add Post</h5>
              <div>
                <SettingsBtn />
                <SignOutBtn />
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  id="sign_out_pop"
                  onClick={this.closePanel.bind(this)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            </div>
            <div className="sep" />
            <FileUpload updateFile={this.onUpdateFile} />
            <FormGroup className="mb-4">
              <Label className="heavy">
                Tags <small>(1 tag required)</small>
              </Label>
              <TagInput onTagChange={this.onTagChange.bind(this)} name="tags" />

              <small className="error hide">One tag is required</small>
            </FormGroup>
            <FormGroup className="mt-3">
              <Label className="heavy">
                Caption <small>(optional)</small>
              </Label>
              <TextAreaFieldGroup
                name="caption"
                value={this.state.caption}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup className="mt-3 add-footer">
              <Button color="link" value="submit" onClick={this.onSubmitPost}>
                Submit
              </Button>
            </FormGroup>
          </Fragment>
        );
      }
    }
  }

  render() {
    const { auth, users } = this.props;

    return (
      <Fragment>
        <div
          id="addpost"
          className={!users.showUploadPanel ? "closed" : null}
          style={{ height: this.state.panelHeight }}
        >
          <div>
            <div className="post-inner">{this.uploadProgress()}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  toggleUploadPanel: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
  errors: state.errors,
  post: state.post
});

export default withRouter(
  connect(
    mapStateToProps,
    { addPost, toggleUploadPanel }
  )(AddPost)
);
