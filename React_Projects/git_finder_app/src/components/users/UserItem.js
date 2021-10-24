import React from "react";
import PropTypes from 'prop-types';

//props is passed in
const UserItem = ({ user: { login, avatar_url, html_url}}) => {
  //destruct prop object, pull fields from it
//   const { login, avatar_url, html_url } = props.user;
  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        alt=""
        className="round-image"
        style={{ width: "60px" }}
      />
      <h3>{login}</h3>

      <div>
        <a href={html_url} className="btn btn0dark btn-sm my-1">
          More
        </a>
      </div>
    </div>
  );
};

UserItem.propTypes = {
    user: PropTypes.object.isRequired,
}

export default UserItem;
