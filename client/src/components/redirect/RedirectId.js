import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import Spinner from "../common/Spinner";

class RedirectId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null
    };
  }
  componentWillMount() {
    axios
      .get(`/api/posts/redirect/${this.props.match.params.id}`)
      .then(res => {
        if (res.data._id) {
          this.setState({ id: res.data._id });
        } else {
          this.setState({ id: "" });
        }
      })
      .catch(e => this.setState({ id: "" }));
  }

  checkState() {
    if (this.props.match.params.id && this.state.id === null) {
      return <Spinner />;
    } else {
      if (this.state.id) {
        return <Redirect to={`/post/${this.state.id}`} />;
      } else {
        return <Redirect to="/" />;
      }
    }
  }

  render() {
    return <div className="text-center mt-4">{this.checkState()}</div>;
  }
}

export default RedirectId;
