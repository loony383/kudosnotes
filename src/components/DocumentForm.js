import React from "react";

import { PouchContext } from '../pouch.js'
import {
  Form
} from "semantic-ui-react";

class DocumentForm extends React.Component {
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
      <Form>
        <Form.Group>
          <Form.Field
            label='Title'
            placeholder='Title'
            name='title'
          />
          <Form.Field
            label='Content'
            placeholder='Enter your note here...'
            control='textarea' rows='6'
          />
          <Form.Field
            id='form-button-control-public'
            content='Confirm'
            label='Save'
          />
        </Form.Group>
      </Form>
    )
  }
}

DocumentForm.contextType = PouchContext;

export default DocumentForm;
