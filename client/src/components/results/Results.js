import React, { Component, Fragment } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import {
  getPostsByUser,
  getPostsByTag,
  getPostsByDetails
} from "../../actions/postActions";
import ImgItem from "./ImgItem";
import { Container, Row } from "reactstrap";
import Spinner from "../common/Spinner";

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
    const { loading } = this.props.post;
    const { items, count, currentPage, totalPages } = this.props.post.posts;
    console.log(this.props);

    const nItems =
      items &&
      items.map((post, i) => {
        return <ImgItem key={post.date} data={post} />;
      });

    return (
      <div className="outer-container">
        {loading ? (
          <Spinner />
        ) : (
          <Container id="main-content">
            <Row>
              {items && items.length > 0 ? (
                <Fragment>
                  {nItems}
                  {/* {currentPage >= totalPages ? null : (
                    <button onClick={this.nextPage.bind(this)}>
                      Load more
                    </button>
                  )} */}
                </Fragment>
              ) : (
                <h3 className="center-block">There are no posts</h3>
              )}
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

Results.propTypes = {
  getPostsByUser: PropTypes.func.isRequired,
  getPostsByTag: PropTypes.func.isRequired,
  getPostsByDetails: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPostsByUser, getPostsByTag, getPostsByDetails }
)(Results);
