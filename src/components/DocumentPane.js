import React from "react";

import db from '../pouch.js'

import {
  Segment,
} from "semantic-ui-react";

import NewFolder from "./NewFolder";
import styles from '../css/DocumentPane.module.scss'

class DocumentPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {document: {}, directory: {}, directoryDocuments: []};
    this.getDocument(this.props.currentDocument)
    this.getDirectory(this.props.currentDirectory);
    if (this.props.currentDirectory) {
      this.getDirectoryDocuments(this.props.currentDirectory)
    }
  }

  getDocument(uuid) {

  }

  getDirectory(uuid) {

  }

  getDirectoryDocuments(uuid) {
    db.find({selector: {parent: uuid, type: 'doc'}}).then((result) => {
      this.setState({directoryDocuments: result.docs});
    }).catch(e => {
      console.log(e);
    });
  }

  getCurrentPane() {
    if (this.props.currentDocument === false && this.props.currentDirectory !== false) {

      if (this.state.directoryDocuments.length > 0) {
        return (<p>Has docs</p>)
      }
      return (<p>Has no docs</p>)
    }
    if (!this.state.currentDocument || !this.state.currentDocument.hasOwnProperty('uuid')) {
      return (
        <p>Select a directory on the left</p>
      )
    } else {
      return (
        <p>got a current doc</p>
      );
    }
  }

  render() {
    return (
      <Segment>
        <NewFolder currentDirectory={this.props.currentDirectory} />
        {this.getCurrentPane()}
      </Segment>
    )
  }
}


export default DocumentPane;
