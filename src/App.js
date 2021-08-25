import React, { Component } from "react";
import Header from "./components/header";
import Banner from "./components/banner";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Banner />
      </React.Fragment>
    );
  }
}

export default App;
