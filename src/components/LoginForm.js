import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
} from "semantic-ui-react";
import styles from "../css/LoginForm.module.scss";

import { PouchContext } from "../pouch";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: "", password: "", showForm: false}
  }

  componentDidMount() {
    if (localStorage.getItem('autoLogin') === 'true' && !this.context.isLoggedIn()) {
      try {
        this.context.doLogin();
      } catch {
        this.context.setSync(false);
      }
    }
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
    this.context.setSync(true);
    this.context.startSync(this.state.username, this.state.password);
  }

  render() {
    if (!this.context.requiresLogin()) {
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
                  onClick={() => this.context.setSync(false)}
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

LoginForm.contextType = PouchContext;

export default LoginForm;
