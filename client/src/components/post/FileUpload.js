import React, { Component } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Label
} from "reactstrap";

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
      <InputGroup>
        <h5 className="upload-headers">Upload Photo</h5>

        <InputGroupAddon addonType="prepend">
          <InputGroupText>Upload</InputGroupText>
        </InputGroupAddon>
        <div className="custom-file">
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
        </div>
        {/* show uploaded image */}
        {this.state.file.name ? (
          <div
            style={{
              width: "300px",
              marginTop: "10px"
            }}
          >
            <img
              id="output_image"
              style={{
                width: "100%"
              }}
              alt="preview"
            />
          </div>
        ) : null}
      </InputGroup>
    );
  }
}

export default FileUpload;
