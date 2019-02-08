import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

import styles from "../css/LoginForm.module.scss";

import db, { startSync } from "../pouch.js";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  doSubmit = () => {
    startSync(this.state.username, this.state.password);
  };

  render() {
    return (
      <div className={styles.LoginForm}>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  name="username"
                  onChange={e => this.handleInputChange(e)}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={e => this.handleInputChange(e)}
                />

                <Button
                  color="teal"
                  fluid
                  size="large"
                  onClick={() => this.doSubmit()}
                >
                  Login
                </Button>

                <Button
                  color="teal"
                  fluid
                  size="large"
                  onClick={() => {
                    db.post({ ts: Math.random() });
                  }}
                >
                  Add stuffs
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginForm;
