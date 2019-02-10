import React from "react";
import { List, Loader } from "semantic-ui-react";

import db from '../pouch.js'

import styles from '../css/DocumentTree.module.scss'

class DocumentTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {directories: {}};
    this.setDirectories('')
  }

  setDirectories(uuid) {
    db.find({selector: {parent: uuid, type: 'dir'}}).then((result) => {
      let directories = this.state.directories;
      directories[uuid] = result.docs;
      this.setState({directories: directories});
      result.docs.forEach((current => {
        this.setDirectories(current.uuid)
      }))

    }).catch(e => {
      console.log(e);
    });
  }

  hasChildren(uuid) {
    return this.state.directories.hasOwnProperty(uuid) && this.state.directories[uuid].length > 0;
  }

  setDirectory(uuid) {
    this.props.setCurrentDirectory(uuid);
  }

  getListForDir(uuid) {
    return (
      this.state.directories[uuid].map((current) => {
        return (
          <List.Item key={current.uuid}>
            <List.Icon name='folder'/>
            <List.Content>
              <List.Description as='a' onClick={() => this.setDirectory(current.uuid)}>{current.name}</List.Description>
              {this.hasChildren(current.uuid) ?
                <List.List className={styles.ChildList}>{this.getListForDir(current.uuid)}</List.List> : ''}
            </List.Content>
          </List.Item>
        )
      })
    )
  }

  render() {
    if (Object.keys(this.state.directories).length === 0) {
      return (
        <Loader active/>
      )
    } else {
      return (
        <List selection>
          <List.Item>
            <List.Header>Folder Tree</List.Header>
          </List.Item>
          <List.Item>
            <List.Icon name='folder'/>
            <List.Content>
              <List.Description as='a' onClick={() => this.setDirectory('')}>root</List.Description>
              {this.hasChildren('') ?
                <List.List className={styles.ChildList}>
                  {this.getListForDir('')}
                </List.List> : ''}
            </List.Content>
          </List.Item>
        </List>
      );
    }
  }
}

export default DocumentTree;
