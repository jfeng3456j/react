import React, { useReducer, useEffect} from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";

import {
  LOAD_USERS,
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";

let githubClientId;
let githubClientaSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientaSecret = process.env.REACT_APP_GITHUB_CLIENT_ID;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientaSecret = process.env.GITHUB_CLIENT_ID;
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  //dispatcher
  const [state, dispatch] = useReducer(GithubReducer, initialState);


  //get github users on load
  const loadUsers = async() => {
    setLoading();

    const res = await axios.get("https://api.github.com/users");

    dispatch({
      type: LOAD_USERS,
      payload: res.data
    })
  }

  useEffect(() => {
    loadUsers();
  },[])

  //search Github users
  const searchUsers = async (text) => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientaSecret}`
    );

    //dispatch to reducer object
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items,
    });
  };

  //Get single Github user
  const getUser = async (username) => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientaSecret}`
    );

    // setUser(res.data);
    // setLoading(false);
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  //get user repos
  const getUserRepos = async (username) => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientaSecret}`
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  //Clear users from state
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        loadUsers,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
