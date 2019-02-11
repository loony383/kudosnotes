import React from "react";

import db from '../pouch.js'

import {
  Grid,
} from "semantic-ui-react";

import NewFolder from "./NewFolder";
import DeleteFolder from "./DeleteFolder";
import styles from '../css/DocumentPane.module.scss'

class DocumentPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {document: {}, directory: {}, directoryDocuments: [], currentDirectoryDocument: {}};
    this.getDocument(this.props.currentDocument)
    if (this.props.currentDirectory) {
      this.getDirectory(this.props.currentDirectory)
      this.getDirectoryDocuments(this.props.currentDirectory)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentDirectory !== prevProps.currentDirectory) {
      this.getDirectory(this.props.currentDirectory)
      this.getDirectoryDocuments(this.props.currentDirectory)
    }
  }

  getDocument(uuid) {

  }

  getDirectory(uuid) {
    db.find({selector: {uuid: uuid, type: 'dir'}}).then((result) => {
      if (result.docs.length > 0) {
        this.setState({currentDirectoryDocument: result.docs[0]});
      }
    }).catch(e => {
      console.log(e);
    });
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
      <Grid>
        <Grid.Row>
          <Grid.Column floated='left' width={2}>
            <DeleteFolder setCurrentDirectory={this.props.setCurrentDirectory}
                          currentDirectoryDocument={this.state.currentDirectoryDocument}/>
          </Grid.Column>
          <Grid.Column floated='right' width={10}>
            <NewFolder currentDirectory={this.props.currentDirectory}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={12}>
            {this.getCurrentPane()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}


export default DocumentPane;
