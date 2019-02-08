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
  Segment,
  Menu,
  Container
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
  getLoginLogout() {
    if (this.state.isAuthed) {
      return (
        <Button
          onClick={() => {
            this.setAuth(false);
          }}
        >
          Logout
        </Button>
      );
    } else {
      return (
        <Button
          primary
          onClick={() => {
            this.setSync(true);
          }}
        >
          Login
        </Button>
      );
    }
  }
  render() {
    return (
      <React.Fragment>
        <LoginForm
          setAuth={this.setAuth}
          setSync={this.setSync}
          shouldSync={this.state.shouldSync}
          isAuthed={this.state.isAuthed}
        >
          <Menu borderless>
            <Container>
              <Menu.Item as="a" header fitted="vertically">
                <Image
                  src="https://placehold.it/150x35"
                />
              </Menu.Item>
              <Menu.Item position="right">{this.getLoginLogout()}</Menu.Item>
            </Container>
          </Menu>
        </LoginForm>
      </React.Fragment>
    );
  }
}

export default App;
