import React from 'react';
import EditableTable_new from './EditableFormTable_change';

export default class HelloAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return <EditableTable_new />;
    }
}
