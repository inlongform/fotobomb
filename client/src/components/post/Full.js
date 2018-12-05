import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "reactstrap";
import { PropTypes } from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton
} from "react-share";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SHARE_VIA } from "../../utils/constants";
import { getPostById } from "../../actions/postActions";
import Spinner from "../common/Spinner";

class Full extends Component {
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
    const { post, loading } = this.props.post;

    return (
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <Container id="full">
            <Row>
              <Col>
                {!loading && post.user ? (
                  <Card>
                    <CardHeader>
                      <div className="user-info">
                        <ul>
                          <li>
                            <img
                              src={post.user.avatar}
                              alt="avatar"
                              className="rounded-circle"
                            />
                          </li>
                          <li>
                            <h6 className="heavy">{post.user.displayName}</h6>
                          </li>
                        </ul>
                        <ul className="dtime">
                          <li>
                            <FontAwesomeIcon icon="calendar-alt" />
                          </li>
                          <li>
                            <h6>{moment(post.date).format("LLL")}</h6>
                          </li>
                        </ul>
                      </div>
                      <div className="social">
                        <ul>
                          <li>
                            <TwitterShareButton
                              title={post.caption}
                              via={SHARE_VIA}
                              url={this.getShareUrl()}
                              hashtag={post.tags}
                            >
                              <FontAwesomeIcon icon={["fab", "twitter"]} />
                            </TwitterShareButton>
                          </li>
                          <li>
                            <FacebookShareButton
                              url={this.getShareUrl()}
                              quote={post.caption}
                              hashtag="#fotobomb"
                            >
                              <FontAwesomeIcon icon={["fab", "facebook"]} />
                            </FacebookShareButton>
                          </li>
                          <li>
                            <EmailShareButton
                              url={this.getShareUrl()}
                              subject={this.getEmailSubject()}
                              body={`check out this link ${this.getShareUrl()}`}
                            >
                              <FontAwesomeIcon icon="envelope" />
                            </EmailShareButton>
                          </li>
                        </ul>
                      </div>
                    </CardHeader>
                    <CardBody className="pt-0">
                      <img
                        src={`/images/posts/full/${post.image_id}`}
                        alt={post.image_id}
                      />
                    </CardBody>
                    <CardFooter>
                      <div className="tags mb-3">
                        <FontAwesomeIcon icon="tags" />
                        <ul>
                          {post.tags &&
                            post.tags.map(tag => {
                              return (
                                <li>
                                  <Link
                                    to={`/posts/tag/${tag}`}
                                    key={tag}
                                    className="mr-2"
                                  >
                                    #{tag}
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                      <p>{post.caption}</p>
                    </CardFooter>
                  </Card>
                ) : null}
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

Full.propTypes = {
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
)(Full);
