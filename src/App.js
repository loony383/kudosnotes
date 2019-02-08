import React, { Component } from "react";
import LoginForm from "./components/LoginForm.js";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldSync: false, isAuthed: false };
  }
  setAuth = authed => {
    this.setState({ isAuthed: authed });
  };
  setSync = shouldSync => {
    this.setState({ shouldSync: shouldSync });
  };
  render() {
    return (
      <React.Fragment>
        <header>
          <p />
        </header>
        <LoginForm
          setAuth={this.setAuth}
          setSync={this.setSync}
          shouldSync={this.state.shouldSync}
          isAuthed={this.state.isAuthed}
        >
          <Button
            onClick={() => {
              this.setSync(true);
              this.setAuth(false);
            }}
          >
            Clear should auth
          </Button>
        </LoginForm>
      </React.Fragment>
    );
  }
}

export default App;
