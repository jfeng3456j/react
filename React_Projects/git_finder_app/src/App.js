import React, { Component, Fragment} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";


class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };

  //lifeCycle method - run when the component mount
  // async componentDidMount() {

  //   // use class method setState to manipulate state
  //   this.setState({ loading: true });

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`);

  //   this.setState({users: res.data, loading: false})
  // }

  //search github users
  searchUsers = async (text) => {
    this.setState({
      loading: true,
    });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
    );

    this.setState({
      users: res.data.items,
      loading: false,
      alert: null,
    });
  };



  //Get single Github user
  getUser = async (username) => {
    this.setState({
      loading: true,
    });

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
    );

    this.setState({
      user: res.data,
      loading: false
    });
    
  }

    //get user repos
  getUserRepos = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`)
    
    this.setState({repos: res.data, loading: false})
    
    }

  //Clear users from state
  clearUsers = () => {
    this.setState({
      users: [],
      loading: false,
    });
  };

  //set alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });

    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  //lifecycle method, runs when the component loaded
  render() {
    //destructure state
    const { users, user, repos, loading } = this.state;

    return (
      <Router>
        {/* //jsx requires to return one parent element */}
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={this.getUser} user={user} getUserRepos={this.getUserRepos} repos={repos} loading={loading}/>
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
