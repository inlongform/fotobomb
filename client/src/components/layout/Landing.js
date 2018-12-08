import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row } from "reactstrap";
import { getPosts } from "../../actions/postActions";
import Masonry from "react-masonry-component";
import ImgItem from "../results/ImgItem";
import Spinner from "../common/Spinner";

const masonryOptions = {
  transitionDuration: 0
};

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      loaded: false
    };
  }
  componentDidMount() {
    this.props.getPosts(1);
    console.log(this.props);
    // this.preloadImages(items);
  }

  // componentDidUpdate(newProps) {
  //   if (newProps.errors) {
  //     this.setState({ errors: newProps.errors });
  //   }
  // }

  nextPage(e) {
    e.preventDefault();

    const { currentPage, totalPages } = this.props.post.posts;
    console.log(typeof currentPage, totalPages);

    if (currentPage < totalPages) {
      this.props.getPosts(currentPage + 1);
    }
  }

  preloadImages(items) {
    const images =
      items &&
      items.map(post => {
        return `/images/posts/thumb/${post.image_id}`;
      });
    let loaded = 0;

    if (images && images.length > 0) {
      images.forEach(element => {
        const img = new Image();
        img.src = element;
        img.onload = () => {
          loaded++;
          // console.log(loaded, images.length);
          if (loaded >= images.length - 1) {
            this.setState({ loaded: true });
            console.log("done");
          }
        };
      });
    }
  }

  render() {
    const { loading } = this.props.post;
    const { items, count, currentPage, totalPages } = this.props.post.posts;

    // if (!loading) {
    //   this.preloadImages(items);
    // }
    // this.preloadImages(items);

    // if (!this.state.loaded) {
    //   this.preloadImages(items);
    // }

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
              {items ? (
                <Fragment>
                  {nItems}
                  {currentPage >= totalPages ? null : (
                    <button onClick={this.nextPage.bind(this)}>
                      Load more
                    </button>
                  )}
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
