import React, { Component } from "react";
import LoginForm from "./components/LoginForm.js";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <header>
          <p />
        </header>
        <LoginForm>
          <p>Authed!</p>
        </LoginForm>
      </React.Fragment>
    );
  }
}

export default App;
