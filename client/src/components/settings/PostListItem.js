import React, { Component } from "react";
// import FontAwesome from "react-fontawesome";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { deletePost } from "../../actions/postActions";
const imagePath = "/images/posts/thumb/";

class PostListItem extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(e) {
    e.preventDefault();
    const { post } = this.props;
    this.props.deletePost(post._id);
  }

  render() {
    const { post } = this.props;
    return (
      <tr>
        <td>
          <img src={`${imagePath}${post.image_id}`} alt={post.image_id} />
        </td>
        <td>
          {post.tags.map(tag => {
            return (
              <span key={tag} className="mr-2">
                #{tag}
              </span>
            );
          })}
        </td>
        <td>{moment(post.date).format("LLL")}</td>
        <td>
          <a onClick={this.onDelete} style={{ cursor: "pointer" }}>
            {/* <FontAwesome name="trash-alt" /> */}
          </a>
        </td>
      </tr>
    );
  }
}

PostListItem.propTypes = {
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  // post: state.post
});

export default connect(
  mapStateToProps,
  { deletePost }
)(PostListItem);
