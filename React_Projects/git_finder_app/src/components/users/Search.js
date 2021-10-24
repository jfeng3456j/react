import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ showClear, clearUsers, setAlert, searchUsers}) => {
  //useState hook
  //create text value state and set default value = ''
  const [text, setText] = useState('');

  const onChange = (e) => {
    //e.target.name is the input attribute name
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      setAlert("Please enter something", "light");
    } else {
      // pass this this.state.text to app.js and use in api url
      searchUsers(text);

      //set the component text back to blank
      setText('');
    }
  };

    return (
      <div>
        <form onSubmit={onSubmit} className="form">
          <input
            type="text"
            name="text"
            value={text}
            onChange={onChange}
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

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Search;
