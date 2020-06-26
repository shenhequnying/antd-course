import React from 'react';
import EditableFormTable from './EditableFormTable';

export default class HelloAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return <EditableFormTable />;
    }
}
