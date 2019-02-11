import React from "react";
import {
  Button, Icon, Modal,
} from "semantic-ui-react";

import uuidv4 from 'uuid/v4'

import db from "../pouch.js";

class NewFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false}
  }

  doClose = () => this.setState({open: false})
  doOpen = () => this.setState({open: true})

  getCurrentDirectoryName = () => {
    return (typeof this.props.currentDirectoryDocument !== undefined ? this.props.currentDirectoryDocument.name : 'loading..')
  }

  doKeep = () => {
    this.doClose();
  }

  doDelete = () => {
    this.doClose();
    let documentToDelete = {...this.props.currentDirectoryDocument};
    this.props.setCurrentDirectory(this.props.currentDirectoryDocument.parent);
    db.remove(documentToDelete)
  }

  render() {
    return (
      <Modal open={this.state.open}
             onClose={this.doClose}
             trigger={<Button onClick={this.doOpen} icon floated="left"><Icon name="trash"/></Button>}>
        <Modal.Header>Are you sure you wish to delete the folder: {this.getCurrentDirectoryName()}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>Once deleted, this cannot be undone.</p>
            <Button onClick={this.doKeep} color='teal'>No, keep this folder</Button>
            <Button onClick={this.doDelete} floated='right' color='red'>Yes, delete this folder</Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default NewFolder;
