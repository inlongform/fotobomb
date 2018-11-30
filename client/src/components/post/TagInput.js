import React from "react";
import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css"; // If using WebPack and style-loader.

class TagInput extends React.Component {
  constructor() {
    super();
    this.state = { tags: [] };
  }

  handleChange(tags) {
    this.setState({ tags });
    this.props.onTagChange(tags);
  }
  onTagReject() {
    alert("no spaces allowed to tags");
  }

  render() {
    return (
      <TagsInput
        maxTags="4"
        onlyUnique={true}
        validationRegex={/^\S*$/} //no spaces
        onValidationReject={this.onTagReject.bind(this)}
        value={this.state.tags}
        onChange={this.handleChange.bind(this)}
      />
    );
  }
}

export default TagInput;
