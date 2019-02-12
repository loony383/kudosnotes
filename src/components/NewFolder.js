import React from "react";
import {
  Button,
  Form,
} from "semantic-ui-react";

import uuidv4 from 'uuid/v4'

import styles from "../css/NewFolder.module.scss";

import db from "../pouch.js";

class NewFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', error: false}
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
    if (this.state.name.length > 3) {
      db.post({
        parent: this.props.currentDirectory,
        type: 'dir',
        name: this.state.name,
        uuid: uuidv4()
      });
      this.setState({name: '', error: false});
    } else {
      this.setState({error: true})
    }
  }

  render() {
    return (
      <Form className={styles.NewFolder}>
        <Form.Group>
          <Form.Input
            inline
            name="name"
            placeholder="Add a new folder"
            onChange={e => this.handleInputChange(e)}
            value={this.state.name}
            error={this.state.error}
          />
          <Button
            primary
            icon="add"
            content="Add a new folder"
            onClick={() => this.doSubmit()}
          />
        </Form.Group>
      </Form>
    );
  }
}

export default NewFolder;
