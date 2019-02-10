import React from "react";
import LoginForm from "./components/LoginForm.js";
import DocumentTree from "./components/DocumentTree.js";
import DocumentPane from "./components/DocumentPane.js";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { Button, Image, Menu, Container, Grid } from "semantic-ui-react";

class App extends React.Component {
  constructor(props) {
    super(props);
    let storedCurrentDirectory = localStorage.getItem('currentDirectory');
    let storedCurrentDocument = localStorage.getItem('currentDocument');
    this.state = {
      shouldSync: false,
      isAuthed: false,
      currentDirectory: (storedCurrentDirectory ? storedCurrentDirectory : false),
      currentDocument: (storedCurrentDocument ? storedCurrentDocument : false)
    };
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
    this.setState({currentDirectory: uuid});
    localStorage.setItem('currentDirectory', uuid);
  }

  setCurrentDocument = (uuid) => {
    this.setState({currentDocument: uuid});
    localStorage.setItem('currentDocument', uuid);
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
                  <DocumentTree currentDirectory={this.state.currentDirectory}
                                setCurrentDirectory={this.setCurrentDirectory}/>
                </Grid.Column>
                <Grid.Column width={12}>
                  <DocumentPane currentDocument={this.state.currentDocument}
                                currentDirectory={this.state.currentDirectory}
                                setCurrentDocument={this.setCurrentDocument}/>
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
