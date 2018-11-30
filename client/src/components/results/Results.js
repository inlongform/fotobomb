import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  getPostsByUser,
  getPostsByTag,
  getPostsByDetails
} from "../../actions/postActions";
import ImgItem from "./ImgItem";
import { Container, Row } from "reactstrap";

class Results extends Component {
  componentDidMount() {
    this.getUrlParamData(this.props);
  }

  getUrlParamData(params) {
    const matchParams = params.match.params;
    const searchParams = params.location.search;

    if (matchParams.hasOwnProperty("tag")) {
      this.props.getPostsByTag(matchParams.tag);
    } else if (matchParams.hasOwnProperty("id")) {
      this.props.getPostsByUser(matchParams.id);
    } else {
      if (searchParams) {
        this.props.getPostsByDetails(searchParams);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.url !== this.props.match.url ||
      nextProps.location.search !== this.props.location.search
    ) {
      this.getUrlParamData(nextProps);
    }
  }
  render() {
    const { posts } = this.props.posts;

    return (
      <div className="outer-container">
        <Container id="main-content">
          <Row>
            {posts && posts.length > 0 ? (
              posts.map(post => {
                return <ImgItem key={post._id} data={post} />;
              })
            ) : (
              <h3>There are no posts</h3>
            )}
          </Row>
        </Container>
      </div>
    );
  }
}

Results.propTypes = {
  getPostsByUser: PropTypes.func.isRequired,
  getPostsByTag: PropTypes.func.isRequired,
  getPostsByDetails: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  posts: state.post
});

export default connect(
  mapStateToProps,
  { getPostsByUser, getPostsByTag, getPostsByDetails }
)(Results);
