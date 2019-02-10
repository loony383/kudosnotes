import React from "react";
import { List, Loader } from "semantic-ui-react";

import db from '../pouch.js'

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
            result.docs.map((current => {
                this.setDirectories(current.uuid)
            }))

        }).catch(e => {
            console.log(e);
        });
    }

    setDirectory(event, data) {
        this.props.setCurrentDirectory(data);
    }

    hasChildren(uuid) {
        console.log(uuid);
        return this.state.directories.hasOwnProperty(uuid) && this.state.directories[uuid].length > 0;
    }

    getListForDir(uuid) {
        return (
            this.state.directories[uuid].map((current) => {
                return (
                    <List.Item>
                        <List.Icon name='folder' />
                        <List.Content>
                            <List.Description>{current.name}</List.Description>
                            {this.hasChildren(current.uuid) ?
                                <List.List>{this.getListForDir(current.uuid)}</List.List> : ''}
                        </List.Content>
                    </List.Item>
                )
            })
        )
    }

    render() {
        if (Object.keys(this.state.directories).length == 0) {
            return (
                <Loader active />
            )
        } else {
            return (
                <List>
                    <List.Item>
                        <List.Header>Folder Tree</List.Header>
                    </List.Item>
                    {this.getListForDir('')}
                </List>
            );
        }
    }
}

export default DocumentTree;
