import React, { Component} from "react";
import Navbar from './components/layout/Navbar'
import UserItem from './components/users/UserItem'
import "./App.css";

class App extends Component {

  //lifecycle method, runs when the component loaded
  render() {

    return (
    
      //jsx requires to return one parent element
      <div className="App">
        <Navbar />
        <UserItem/>
      </div>
    );
  }

  
}

export default App;
