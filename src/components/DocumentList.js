import React from "react";

import { PouchContext } from '../pouch.js'
import {
  List
} from "semantic-ui-react";

class DocumentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {document: {}, directory: {}, directoryDocuments: [], currentDirectoryDocument: {}};
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }
  
  render() {
    return (
      <List divided relaxed>
        <List.Item>
          <List.Icon name='file outline' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
            <List.Description as='a'>Updated 10 mins ago</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='file outline' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
            <List.Description as='a'>Updated 22 mins ago</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name='file outline' size='large' verticalAlign='middle' />
          <List.Content>
            <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
            <List.Description as='a'>Updated 34 mins ago</List.Description>
          </List.Content>
        </List.Item>
      </List>
    )
  }
}

DocumentList.contextType = PouchContext;

export default DocumentList;
