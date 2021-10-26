import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import GithubContext from "../../context/github/githubContext";

// const Users = (props) => {
const Users = () => {
  // const { users } = props.users;

  //bring in context and use the github context props
  const githubContext = useContext(GithubContext);

  //destructureing props from context
  const { loading, users } = githubContext;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {/* callback function users.map */}
        {users.map((user) => (
          //pass user as in props
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
};

const userStyle = {
  display: "grid",
  //(3,1fr) 3 one fraction even column
  gridTemplateColumns: "repeat(3,1fr)",
  gridGap: "1rem",
};

export default Users;
