import React, { Component } from "react";
import PropTypes from "prop-types";

export class Search extends Component {
  state = {
    text: "",
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  onChange = (e) => {
    //e.target.name is the input attribute name
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.text === "") {
      this.props.setAlert("Please enter something", "light");
    } else {
      // pass this this.state.text to app.js and use in api url
      this.props.searchUsers(this.state.text);

      //set the component text back to blank
      this.setState({
        text: "",
      });
    }
  };

  render() {
    const { showClear, clearUsers } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.onChange}
            placeholder="Search users..."
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>{" "}
        {showClear && (
          <button className="btn btn-light btn-block" onClick={clearUsers}>
            Clear{" "}
          </button>
        )}{" "}
      </div>
    );
  }
}

export default Search;
