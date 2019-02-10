import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
} from "semantic-ui-react";

import PouchDB from "pouchdb";

import styles from "../css/LoginForm.module.scss";

import db from "../pouch.js";

let remoteDB;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    if (remoteDB instanceof PouchDB) {
      remoteDB.close();
    }
    if (!this.props.isAuthed) {
      try {
        this.doLogin();
      } catch {
        this.setSync(false);
      }
    }
  }

  doLogin() {
    console.log(this.props);
    remoteDB = new PouchDB("http://dnd.zeak.co:5984/dnd", {
      fetch(url, opts) {
        opts.credentials = "include";
        return PouchDB.fetch(url, opts);
      }
    });

    db.sync(remoteDB, {
      live: true,
      retry: true
    })
      .on("change", message => {
        this.props.setAuth(true);
      })
      .on("paused", message => {
        this.props.setAuth(true);
      })
      .on("active", message => {
        this.props.setAuth(true);
      })
      .on("error", err => {
        this.props.setAuth(false);
      });
  }

  // Attempt a login in case there is a existing login cookie

  startSync(username, password) {
    fetch("http://dnd.zeak.co:5984/_session", {
      method: "post",
      headers: {
        Accept: "application/json",
        Host: "localhost:5984",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      credentials: "include",
      body: "name=" + username + "&password=" + password
    })
      .then(response => {
        if (!response.ok) {
          this.props.setAuth({isAuthed: false, shouldSync: true});
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(responseAsJson => {
        this.doLogin();
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  doSubmit() {
    this.props.setSync(true);
    this.startSync(this.state.username, this.state.password);
  }

  render() {
    if (
      !this.props.shouldSync ||
      (this.props.shouldSync && this.props.isAuthed)
    ) {
      return this.props.children;
    }

    return (
      <div className={styles.LoginForm}>
        <Grid
          textAlign="center"
          style={{height: "100%"}}
          verticalAlign="middle"
        >
          <Grid.Column style={{maxWidth: 450}}>
            <Form>
              <Header>Login</Header>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                name="username"
                value={this.state.username}
                onChange={e => this.handleInputChange(e)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={e => this.handleInputChange(e)}
              />
              <Button.Group fluid widths="2">
                <Button
                  content="Continue offline"
                  size="large"
                  icon="power off"
                  onClick={() => this.props.setSync(false)}
                />
                <Button
                  primary
                  icon="sync"
                  size="large"
                  content="Login"
                  onClick={() => this.doSubmit()}
                />
              </Button.Group>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginForm;
