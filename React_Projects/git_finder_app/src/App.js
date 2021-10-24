import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert"
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    users: [],
    loading: false,
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
      this.setState({alert: null})
    } , 3000)
  };

  //lifecycle method, runs when the component loaded
  render() {
    //destructure state
    const { users, loading } = this.state;

    return (
      //jsx requires to return one parent element
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={ this.state.alert}/>
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
