import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row } from "reactstrap";
import { getPosts } from "../../actions/postActions";

import ImgItem from "../results/ImgItem";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }
  componentDidMount() {
    this.props.getPosts(1);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }

    // console.log(this.state);
  }

  nextPage(e) {
    // e.preventDefault();

    const { currentPage, totalPages } = this.props.post.posts;
    console.log(typeof currentPage, totalPages);

    if (currentPage < totalPages) {
      this.props.getPosts(currentPage + 1);
    }
  }

  render() {
    // console.log(this.props);
    const { errors, loading } = this.props.post;
    const { items, count, currentPage, totalPages } = this.props.post.posts;
    console.log(loading);
    return (
      <div className="outer-container">
        <Container id="main-content">
          <Row>
            {items ? (
              <div>
                {items.map((post, i) => {
                  return <ImgItem key={post._id} data={post} count={i} />;
                })}
                {currentPage >= totalPages ? null : (
                  <button onClick={this.nextPage.bind(this)}>Load more</button>
                )}
              </div>
            ) : (
              <h3>There are no posts</h3>
            )}
            {/* {loading ? (
              <h5>Loading</h5>
            ) : items ? (
              <div>
                {items.map((post, i) => {
                  return <ImgItem key={post._id} data={post} count={i} />;
                })}
                {currentPage >= totalPages ? null : (
                  <button onClick={this.nextPage.bind(this)}>Load more</button>
                )}
              </div>
            ) : (
              <h3>There are no posts</h3>
            )} */}
          </Row>
        </Container>
      </div>
    );
  }
}

Landing.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Landing);
