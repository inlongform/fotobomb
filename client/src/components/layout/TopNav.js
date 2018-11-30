import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Navbar, NavbarBrand, Form, FormGroup, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import LoginPopover from "./LoginPopover";

import "react-datepicker/dist/react-datepicker.css";

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      tags: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  buildQuery() {
    let query = ["/posts/details/query?"];

    if (this.state.startDate) {
      query.push(`start=${this.state.startDate}&`);
    }

    if (this.state.endDate) {
      query.push(`end=${this.state.endDate}&`);
    }

    if (this.state.tags) {
      query.push(`tags=${this.state.tags.trim()}`);
    }

    return query.join("");
  }

  render() {
    const { errors } = this.state;
    const { auth } = this.props;
    console.log(this.props);
    return (
      <Navbar>
        <NavbarBrand href="/">
          <img src="images/logo.svg" alt="logo" />
        </NavbarBrand>
        <Form>
          <FormGroup>
            {/* <FontAwesomeIcon icon="tags" className="mr-2" /> */}
            <Input
              type="text"
              placeholder="nyc, party"
              name="tags"
              value={this.state.tags}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            {/* <FontAwesomeIcon icon="calendar-alt" className="mr-2" /> */}
            <DatePicker
              selected={this.state.startDate}
              className="date-picker form-control form-control-md"
              onChange={date => {
                console.log("hello", date);
                this.setState({
                  startDate: date,
                  popoverOpen: false
                });
              }}
            />
          </FormGroup>
          <FormGroup>
            {/* <FontAwesomeIcon icon="calendar-alt" className="mr-2" /> */}
            <DatePicker
              selected={this.state.endDate}
              className="date-picker form-control form-control-md"
              onChange={date => {
                this.setState({
                  endDate: date,
                  popoverOpen: false
                });
              }}
            />
          </FormGroup>
          <Link to={this.buildQuery()}>
            <FontAwesomeIcon icon="search" />
          </Link>
        </Form>
        <div className="login-container">
          <LoginPopover />
          {/* <FontAwesomeIcon icon="user-circle" /> */}
        </div>
      </Navbar>
    );
  }
}

TopNav.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(TopNav);
