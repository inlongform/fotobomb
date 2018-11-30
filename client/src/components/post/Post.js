import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { PropTypes } from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton
} from "react-share";

import { SHARE_VIA } from "../../utils/constants";
import { getPostById } from "../../actions/postActions";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareUrl: ""
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.getPostById(id);
  }

  getShareUrl() {
    const { post } = this.props.post;

    return document.location.origin + "/r/" + post.shortId;
  }

  getEmailSubject() {
    const { auth } = this.props;
    return `${auth.user.name} sent you a link!`;
  }

  render() {
    const { post } = this.props.post;

    console.log(this.props);

    return (
      <Container id="post-display">
        <Row>
          <Col>
            {post && post.user ? (
              <div>
                <span className="user-icon">
                  <img src={post.user.avatar} alt="avatar" />
                </span>
                <h3>{post.user.displayName}</h3>
              </div>
            ) : null}
            <p>{moment(post.date).format("LLL")}</p>
            {post &&
              post.image_id && (
                <img
                  src={`/images/posts/full/${post.image_id}`}
                  alt={post.image_id}
                />
              )}

            <p>{post.caption}</p>

            <ul className="share-btns">
              <li className="mr-2">
                <FacebookShareButton
                  url={this.getShareUrl()}
                  quote={post.caption}
                  hashtag="#photoshare"
                >
                  fb
                </FacebookShareButton>
              </li>
              <li className="mr-2">
                <TwitterShareButton
                  title={post.caption}
                  via={SHARE_VIA}
                  url={this.getShareUrl()}
                  hashtag={post.tags}
                >
                  tw
                </TwitterShareButton>
              </li>
              <li className="mr-2">
                <EmailShareButton
                  url={this.getShareUrl()}
                  subject={this.getEmailSubject()}
                  body={`check out this link ${this.getShareUrl()}`}
                >
                  em
                </EmailShareButton>
              </li>
            </ul>

            <p>
              {post.tags &&
                post.tags.map(tag => {
                  return (
                    <Link to={`/posts/tag/${tag}`} key={tag} className="mr-2">
                      #{tag}
                    </Link>
                  );
                })}
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

Post.propTypes = {
  getPostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPostById }
)(Post);
