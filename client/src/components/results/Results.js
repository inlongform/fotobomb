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
import isEmpty from "../../utils/is-empty";

class Results extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.getUrlParamData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (
      nextProps.match.url !== this.props.match.url ||
      nextProps.location.search !== this.props.location.search
    ) {
      this.getUrlParamData(nextProps);
    }

    console.log(nextProps);
  }

  getUrlParamData(params) {
    const matchParams = params.match.params;
    const searchParams = params.location.search;

    if (matchParams.hasOwnProperty("tag")) {
      this.props.getPostsByTag(matchParams.tag, 1);
    } else if (matchParams.hasOwnProperty("id")) {
      this.props.getPostsByUser(matchParams.id, 1);
    } else {
      if (searchParams) {
        this.props.getPostsByDetails(searchParams, 1);
      }
    }
  }

  nextPage(e) {
    e.preventDefault();

    const { currentPage, totalPages } = this.props.post.posts;
    console.log(typeof currentPage, totalPages);

    if (currentPage < totalPages) {
      this.props.getPosts(currentPage + 1);
    }
  }

  render() {
    const { loading } = this.props.post;
    const { errors } = this.props;
    const { items, count, currentPage, totalPages } = this.props.post.posts;
    console.log(errors);

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
            <Row className={isEmpty(errors) ? "masonry" : ""}>
              {items && items.length > 0 ? (
                <Fragment>{nItems}</Fragment>
              ) : (
                <Fragment>
                  {errors ? (
                    <h3 className="center-block">{errors.message}</h3>
                  ) : (
                    <h3 className="center-block">There are no posts</h3>
                  )}
                </Fragment>
              )}
            </Row>

            {items && totalPages > 1 ? (
              <Row>
                {currentPage >= totalPages ? null : (
                  <button
                    onClick={this.nextPage.bind(this)}
                    className="mt-4 mb-4 center-block more-btn"
                  >
                    Load more
                  </button>
                )}
              </Row>
            ) : null}
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
  post: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getPostsByUser, getPostsByTag, getPostsByDetails }
)(Results);
