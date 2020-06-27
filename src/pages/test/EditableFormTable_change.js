import React from 'react';
import { Popconfirm, Form, Table, Button, message } from 'antd';
import PropTypes from 'prop-types';
import { Tabledata } from './TableData';
import { EditableContext } from './TableContext';
import EditableCell from './EditableCell';
import { connect } from "dva";

const namespace = "discovery"
function mapStateToProps(state) {
    return {
        //这里就是return model中获取的state到prop中
        discovery_list: state.discovery.discovery_list,
        discoveryLoading: state.loading.effects["discovery/queryList"],
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDidMount: () => {
            dispatch({
                type: `${namespace}/queryList`,
            });
        },
        save: (form, key) => {
            const action = {
                type: `${namespace}/save`,
                payload: form,key
            };
            dispatch(action);
        }
    }
}
class EditableTable_new extends React.Component {

    componentDidMount() {
        this.props.onDidMount();
    }

    constructor(props) {
        super(props);
        this.state = {
            //数据来源
            // data: discovery_list,
            editingKey: '',
        };
        this.columns = [
            {
                title: 'item_no',
                dataIndex: 'item_no',
                width: '25%',
                editable: true,
            },
            {
                title: 'target_group_id',
                dataIndex: 'target_group_id',
                width: '15%',
                editable: true,
            },
            {
                title: 'item_label',
                dataIndex: 'item_label',
                width: '40%',
                editable: false,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    //确定下当前是否处于编辑状态.

                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    //编辑按钮的状态
                    return editable ? (
                        <span>
                                <EditableContext.Consumer>
                                    {(form) => (
                                        <button
                                            onClick={() => this.save(form, record.key)}
                                            // onClick={() => this.props.save(form, record.key)}
                                            style={{ marginRight: 8 }}
                                            type="button"
                                        >
                                            Save
                                        </button>
                                    )}
                                </EditableContext.Consumer>
                            <Popconfirm
                                title="Sure to cancel?"
                                onConfirm={() => this.cancel(record.id)}
                            >
                                <button style={{ marginRight: 8 }} type="button">
                                    Cancel
                                </button>
                            </Popconfirm>
                            <Popconfirm
                                title="Sure to delete?"
                                onConfirm={() => this.delete(record.id)}
                            >
                                <button type="button">delete</button>
                            </Popconfirm>
                        </span>
                    ) : (
                        <button
                            type="button"
                            disabled={editingKey !== ''}
                            onClick={() => this.edit(record.key)}
                        >
                            Edit
                        </button>
                    );
                },
            },
        ];
    }

    isEditing = (record) => {
        const { editingKey } = this.state;
        return record.key === editingKey;
    };

    cancel = (key) => {
        console.log(key, "this is key...")
        if (key.length > 6) {
            const { data } = this.state;
            const newData = data;
            newData.splice(data.length - 1, 1);
            this.setState({ data: newData, editingKey: key });
        }
        this.setState({ editingKey: '' });
    };

    delete = (key) => {
        const { data } = this.state;
        const newData = data;
        const index = newData.findIndex((item) => key === item.key);
        newData.splice(index, 1);
        this.setState({ data: newData, editingKey: '' });
    };

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const { data } = this.state;
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }

    edit = (key) => {
        this.setState({ editingKey: key });
    };

    handleAdd = () => {
        const { data, editingKey } = this.state;
        if (editingKey !== '') {
            message.error('请先保存');
            return;
        }
        const key = new Date().toString();
        const row = {
            key,
            name: '',
            age: '',
            address: '',
        };
        console.log(data);
        console.log(row);
        const newData = data;
        newData.splice(data.length, 1, row);
        this.setState({ data: newData, editingKey: key });
        console.log(newData);
    };

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };
        const { discovery_list, discoveryLoading } = this.props;
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                //onCell 作为一个新的参数返回了，那么onCell是个什么东西?
                onCell: (record) => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });
        const { data } = this.state;
        const { form } = this.props;
        return (
            <EditableContext.Provider value={form}>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    Add a row
                </Button>
                <Table
                    components={components}
                    bordered
                    dataSource={discovery_list}
                    loading={discoveryLoading}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: this.cancel,
                    }}
                    rowKey="id"
                />
            </EditableContext.Provider>
        );
    }
}

const EditableFormTable = Form.create()(EditableTable_new);
// export default connect(mapStateToProps)(EditableFormTable);
export default connect(mapStateToProps, mapDispatchToProps)(EditableFormTable);

EditableTable_new.propTypes = {
    form: PropTypes.object,
};
