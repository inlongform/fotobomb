import React, { Component } from "react";
import { Card, CardBody, CardTitle, CardFooter, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

class ImgItem extends Component {
  render() {
    const { tags, user, _id } = this.props.data;

    return (
      <Card style={{ display: "inline-flex" }}>
        <CardBody>
          <Link to={`/post/${_id}`}>
            <CardImg
              top
              width="100%"
              src={`/images/posts/thumb/${this.props.data.image_id}`}
              alt={this.props.data.image_id}
            />
          </Link>
        </CardBody>
        <CardFooter>
          <CardTitle>
            <Link to={`/posts/user/${user._id}`} className="btn-light">
              {user.displayName}
            </Link>
          </CardTitle>

          <ul className="flex flex-wrap justify-content-center">
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
      // <div className="img-item">
      //   <figure>
      //     <Link to={`/post/${_id}`}>
      //       <img
      //         src={`/images/posts/thumb/${this.props.data.image_id}`}
      //         alt={this.props.data.image_id}
      //       />
      //     </Link>
      //   </figure>

      //   <div className="entry-content flex flex-column align-items-center justify-content-center">
      //     <h5>
      //       <Link to={`/posts/user/${user._id}`}>{user.displayName}</Link>
      //     </h5>

      //     <ul className="flex flex-wrap justify-content-center">
      //       {tags &&
      //         tags.map((tag, i) => {
      //           return (
      //             <li key={i}>
      //               <Link to={`/posts/tag/${tag}`}>#{tag}</Link>
      //             </li>
      //           );
      //         })}
      //     </ul>
      //   </div>
      // </div>
    );
  }
}

export default ImgItem;
