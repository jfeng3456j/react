import {
    LOAD_USERS,
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";

//action contains type and payload
// export default (state, action) => {
const Reducer = (state, action) => {
    switch (action.type) {
        case LOAD_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case SEARCH_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                loading: false
            }
    default:
      return state;
  }
};

export default Reducer;
