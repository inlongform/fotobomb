import React from "react";
import {
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter
} from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";

const ImgItem = props => {
  const { tags, user, _id } = props.data;

  return (
    <Col xl="3" lg="3" md="6" className="p-2">
      <Card>
        <Link to={`/post/${_id}`}>
          <CardImg
            top
            src={`/images/posts/thumb/${props.data.image_id}`}
            alt={props.data.image_id}
            className="p-10"
          />
        </Link>
        <CardBody className="p-2">
          <div>
            <img
              src="/images/avatar.jpg"
              alt="avatar"
              className="rounded-circle user-icon"
            />
          </div>
          <div>
            <CardTitle>
              <Link to={`/posts/user/${user._id}`} className="btn-light">
                {user.displayName}
              </Link>
            </CardTitle>
            <CardSubtitle>{moment(props.data.date).format("LLL")}</CardSubtitle>
          </div>
        </CardBody>
        <CardFooter>
          <div className="sep" />
          <ul>
            {tags &&
              tags.map((tag, i) => {
                return (
                  <li key={i}>
                    <Link to={`/posts/tag/${tag}`} className="card-link">
                      #{tag}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </CardFooter>
      </Card>
    </Col>
  );
};

export default ImgItem;
