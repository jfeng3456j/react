import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  
  //initialize context hook
  const githubContext = useContext(GithubContext);

  const alertContext = useContext(AlertContext);

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
      alertContext.setAlert("Please enter something", "light");
    } else {
      // pass this this.state.text to app.js and use in api url
      githubContext.searchUsers(text);

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
        </form>
        {githubContext.users.length > 0 && (
          <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>
            Clear
          </button>
        )}
      </div>
    );
  }
export default Search;
