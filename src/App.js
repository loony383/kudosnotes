import React from "react";
import LoginForm from "./components/LoginForm.js";
import DocumentTree from "./components/DocumentTree.js";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { Button, Image, Menu, Container, Grid } from "semantic-ui-react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {shouldSync: false, isAuthed: false, CurrentDirectory: false, currentDocument: false};
  }

  setAuth = authed => {
    this.setState({isAuthed: authed});
  };
  setSync = shouldSync => {
    this.setState({shouldSync: shouldSync});
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

  setCurrentDirectory = (uuid) => {
    this.setState({CurrentDirectory: uuid});
  }

  setCurrentDocument = (uuid) => {
    this.setState({currentDocument: uuid});
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
                <Image src="https://placehold.it/150x35"/>
              </Menu.Item>
              <Menu.Item position="right">{this.getLoginLogout()}</Menu.Item>
            </Container>
          </Menu>
          <Container>
            <Grid>
              <Grid.Row>
                <Grid.Column width={4}>
                  <DocumentTree CurrentDirectory={this.state.CurrentDirectory}
                                setCurrentDirectory={this.setCurrentDirectory}/>
                </Grid.Column>
                <Grid.Column width={12}>
                  <p>Edit pane</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </LoginForm>
      </React.Fragment>
    );
  }
}

export default App;
