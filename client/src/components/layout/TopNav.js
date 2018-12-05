import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import DatePicker from "react-datepicker";

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

    let sDate = new Date(this.state.startDate).toISOString();
    let eDate = new Date(this.state.endDate).toISOString();

    if (this.state.startDate) {
      query.push(`start=${sDate}&`);
    }

    if (this.state.endDate) {
      query.push(`end=${eDate}&`);
    }

    if (this.state.tags) {
      query.push(`tags=${this.state.tags.trim()}`);
    }

    return query.join("");
  }

  render() {
    const { errors } = this.state;

    return (
      <Navbar>
        <NavbarBrand href="/">
          <img src="images/logo.svg" alt="logo" />
        </NavbarBrand>
        <Form>
          <FormGroup>
            <Input
              type="text"
              placeholder="nyc, party"
              name="tags"
              value={this.state.tags}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
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
