import React from "react";
import LoginForm from "./components/LoginForm.js";
import DocumentTree from "./components/DocumentTree.js";
import DocumentPane from "./components/DocumentPane.js";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { PouchContext } from "./pouch.js";

import { Button, Image, Menu, Container, Grid } from "semantic-ui-react";

class App extends React.Component {
  constructor(props) {
    super(props);
    let storedCurrentDirectory = localStorage.getItem('currentDirectory');
    let storedCurrentDocument = localStorage.getItem('currentDocument');
    this.state = {
      currentDirectory: (storedCurrentDirectory ? storedCurrentDirectory : ''),
      currentDocument: (storedCurrentDocument ? storedCurrentDocument : false)
    };
  }

  getLoginLogout() {
    if (this.context.isLoggedIn()) {
      return (
        <Button
          onClick={() => {
            this.context.doLogout();
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
            this.context.setSync(true);
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
        <LoginForm>
          <Menu borderless>
            <Container>
              <Menu.Item as="a" header fitted={true}>
                <Image src="https://placehold.it/150x35"/>
              </Menu.Item>
              <Menu.Item fitted="horizontally" position="right">{this.getLoginLogout()}</Menu.Item>
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
                                setCurrentDocument={this.setCurrentDocument}
                                setCurrentDirectory={this.setCurrentDirectory}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </LoginForm>
    );
  }
}

App.contextType = PouchContext;


export default App;
