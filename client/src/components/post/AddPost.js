import React, { Component, Fragment } from "react";
import { Input, Button, FormGroup, Label } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CAPTION_LENGTH } from "../../utils/constants";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import { addPost } from "../../actions/postActions";
import { toggleUploadPanel } from "../../actions/userActions";

class AddPost extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isOpen: false
    // };

    // this.togglePanel = this.togglePanel.bind(this);
  }

  // togglePanel() {
  //   let currentState = !this.state.isOpen;
  //   this.setState({
  //     isOpen: currentState
  //   });
  // }

  render() {
    const { auth, users } = this.props;

    return (
      <Fragment>
        {auth.isAuthenticated ? (
          <div
            id="addpost"
            className={!users.showUploadPanel ? "closed" : null}
          >
            <div>
              <div className="post-inner">
                <div className="add-header">
                  <h5 className="heavy">Add Post</h5>
                  <div>
                    <a href="#" className="ml-2">
                      <FontAwesomeIcon icon="cog" className="mr-2" />
                    </a>
                    <FontAwesomeIcon icon="sign-out-alt" className="mr-2" />
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      // onClick={this.togglePanel}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>
                <div className="sep" />
                <Label className="heavy mt-3">Upload</Label>
                <FormGroup className="mb-4">
                  <Input
                    type="file"
                    className="custom-file-input"
                    id="chooseFile"
                    name="chooseFile"
                    aria-describedby="inputGroupFileAddon"
                  />
                  {/* <Input /> */}
                  <Label className="custom-file-label" for="chooseFile">
                    filename.jpg
                  </Label>
                </FormGroup>
                <FormGroup className="mb-4">
                  <img src="/images/thumb.jpg" />
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label className="heavy">
                    Tags <small>(1 tag required)</small>
                  </Label>
                  <Input />
                </FormGroup>
                <FormGroup className="mt-3">
                  <Label className="heavy">
                    Caption <small>(optional)</small>
                  </Label>
                  <Input type="textarea" />
                </FormGroup>
                <FormGroup className="mt-3 add-footer">
                  <Button color="link">Submit</Button>
                </FormGroup>
              </div>
            </div>
          </div>
        ) : null}
      </Fragment>
    );
  }
}

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  showUploadPanel: PropTypes.bool,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  users: state.users,
  errors: state.errors
  // posts: state.post
});

export default connect(
  mapStateToProps,
  { addPost, toggleUploadPanel }
)(AddPost);
