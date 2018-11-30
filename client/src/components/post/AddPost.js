import React, { Component } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import { addPost } from "../../actions/postActions";
import TagInput from "./TagInput";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import FileUpload from "./FileUpload";
// import AutoComplete from "./AutoComplete";

import { CAPTION_LENGTH } from "../../utils/constants";

class AddPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      caption: "",
      file: {},
      location: "",
      tags: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    // this.onPlaceSelected = this.onPlaceSelected.bind(this);
    this.onUpdateFile = this.onUpdateFile.bind(this);
    this.onSubmitPost = this.onSubmitPost.bind(this);
  }

  // componentWillReceiveProps(newProps) {
  //   if (newProps.errors) {
  //     this.setState({ errors: newProps.errors });
  //   }
  // }

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

  // onPlaceSelected(e) {
  //   this.setState({
  //     location: e.formatted_address
  //   });
  // }

  onUpdateFile(file) {
    this.setState({
      file: file
    });
  }

  onSubmitPost(e) {
    e.preventDefault();
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

    const { user } = this.props.auth;

    formData.append("file", this.state.file);
    formData.append("tags", this.state.tags);
    formData.append("id", user.id);
    if (this.state.caption) formData.append("caption", this.state.caption);
    // if (this.state.location) formData.append("location", this.state.location);

    this.props.addPost(formData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    if (errors.hasOwnProperty("message")) {
      alert(errors.message);
    }
    return (
      <Container style={{ marginTop: "40px" }} id="add-photo">
        <Row>
          <Col>
            <form>
              <Row>
                <FileUpload updateFile={this.onUpdateFile} />
              </Row>
              <Row>
                <h5 className="upload-headers">Add Tags</h5>
                <TagInput
                  onTagChange={this.onTagChange.bind(this)}
                  name="tags"
                />
              </Row>
              {/* <Row>
                <h5>Location (optional)</h5>
                <AutoComplete />
              </Row> */}
              <Row>
                <h5 className="upload-headers">Add Caption (Optional)</h5>

                <TextAreaFieldGroup
                  name="caption"
                  value={this.state.caption}
                  onChange={this.onChange}
                />

                <Button
                  color="primary"
                  size="sm"
                  value="submit"
                  onClick={this.onSubmitPost}
                >
                  Submit
                </Button>
              </Row>
            </form>
          </Col>
          <Col>
            <Row />
            <Row />
            <Row />
          </Col>
          <Col />
        </Row>
      </Container>
    );
  }
}

AddPost.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
  // posts: state.post
});

export default connect(
  mapStateToProps,
  { addPost }
)(AddPost);
