import React, { Component, Fragment } from "react";
import { FormGroup, Input, Label } from "reactstrap";

import { FILE_TYPES, MAX_FILE_SIZE } from "../../utils/constants";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {}
    };
  }

  onImageChange(e) {
    const file = Array.from(e.target.files)[0];

    if (file) {
      if (FILE_TYPES.indexOf(file.type) > -1) {
        if (file.size >= MAX_FILE_SIZE) {
          alert("file is to big, please use a 10 MB max");
          return;
        }
        this.setState({
          file: file
        });

        const reader = new FileReader();

        let _this = this;

        reader.onload = function() {
          const output = document.getElementById("output_image");
          output.src = reader.result;

          _this.props.updateFile(file);
        };

        reader.readAsDataURL(file);
      } else {
        alert(`${file.type} is not a supported format!`);
      }
    }
  }

  render() {
    return (
      <Fragment>
        <Label className="heavy mt-3">Upload</Label>
        <FormGroup className="mb-4">
          <Input
            type="file"
            className="custom-file-input form-control"
            id="chooseFile"
            name="chooseFile"
            aria-describedby="inputGroupFileAddon"
            onChange={this.onImageChange.bind(this)}
          />

          <Label className="custom-file-label" for="chooseFile">
            {this.state.file.name ? this.state.file.name : "choose file"}
          </Label>
          <small className="error hide">you forgot an image</small>
        </FormGroup>
        <FormGroup className="mb-4">
          {this.state.file.name ? (
            <div className="mt-3">
              <img id="output_image" alt="preview" />
            </div>
          ) : null}
        </FormGroup>
      </Fragment>
    );
  }
}

export default FileUpload;
