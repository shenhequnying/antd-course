import React from "react";
import {
  Popconfirm,
  Form,
  Table,
  Button,
  message,
  Input,
  Row,
  Col,
  Modal,
} from "antd";
import PropTypes from "prop-types";
// import { Tabledata } from "./TableData";
import { EditableContext } from "./TableContext";
import EditableCell from "./EditableCell";
import { connect } from "dva";

const namespace = "student_qr_code";
function mapStateToProps(state) {
  return {
    //这里就是return model中获取的state到prop中
    student_qr_code_list: state.student_qr_code.student_qr_code_list,
    student_qr_codeLoading: state.loading.effects["student_qr_code/queryList"],
    editingKey: state.student_qr_code.editingKey,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDidMount: () => {
      dispatch({
        type: `${namespace}/queryList`,
      });
    },
    save: (id, form) => {
      // console.log("传递过来的再props里的id为： ",id)
      // console.log("传递过来再props里的form为：",form)
      const action = {
        type: `${namespace}/save`,
        payload: { id, form },
        // payload: form
      };
      dispatch(action);
    },
    search: (item_no) => {
      //   console.log("我是mapstate部分，我被调用了====", item_no);
      const action = {
        type: `${namespace}/search`,
        payload: { item_no },
      };
      dispatch(action);
    },
    addOne: (form) => {
      console.log("addOne我是mapstate部分,我被调用了=====", form);
      const action = {
        type: `${namespace}/addOne`,
        payload: { form },
      };
      dispatch(action);
    },
  };
};
class StudentQrCodeEditTableForm extends React.Component {
  componentDidMount() {
    this.props.onDidMount();
  }
  constructor(props) {
    super(props);
    this.state = {
      //数据来源
      // data: discovery_list,
      editingKey: this.props.editingKey,
      modalvisible: false,
    };
    this.columns = [
      {
        title: "item_no",
        dataIndex: "item_no",
        width: "25%",
        editable: false,
        render: (text) => {
          return {
            props: {
              style: { color: "blue" },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: "source",
        dataIndex: "source",
        width: "15%",
        editable: false,
        render: (text) => {
          return {
            props: {
              style: { color: "green" },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: "group_id",
        dataIndex: "group_id",
        width: "20%",
        editable: true,
        render: (text) => {
          return {
            props: {
              style: { color: "blue" },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: "create_time",
        dataIndex: "create_time",
        width: "20%",
        editable: false,
        render: (text) => {
          return {
            props: {
              style: { color: "blue" },
            },
            children: <div>{text}</div>,
          };
        },
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (text, record) => {
          //确定下当前是否处于编辑状态.
          // console.log(record,"我是草泥马record");
          // console.log("我输出下，当前的state信息吧", this.state)
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          //   console.log("编辑按钮的状态为----", editable);
          //编辑按钮的状态
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {(form) => (
                  <button
                    // onClick={() => this.save(form, record.id)}
                    onClick={() => this.save(record.id, form)}
                    // onClick={() => this.props.save(record.id, form)}
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
              {/*<Popconfirm*/}
              {/*    title="Sure to delete?"*/}
              {/*    onConfirm={() => this.delete(record.id)}*/}
              {/*>*/}
              {/*    <button type="button">delete</button>*/}
              {/*</Popconfirm>*/}
            </span>
          ) : (
            <button
              type="button"
              disabled={editingKey !== ""}
              onClick={() => this.edit(record.id)}
            >
              Edit
            </button>
          );
        },
      },
    ];
  }

  save = (id, form) => {
    //   const {editingKey} = this.state;
    this.props.save(id, form);
    console.log("先调用我，再调用props里的dispatch函数-----");
    this.setState({ editingKey: "" });
  };
  saveModal = () => {
    const {
      form: { validateFields },
    } = this.props;
    validateFields((err, values) => {
      //   if (!err) {
      this.props.addOne(values);
      this.setState({ modalvisible: false });
      this.props.form.resetFields();
      //   }
      //   if (!err) {
      // this.props.addOne(values);
      // this.setState({ modalvisible: false });
      //   }
    });
  };
  isEditing = (record) => {
    // console.log("看看在过程中，我是不是变了----", this.state)
    // console.log("我看看props是什么样子---",this.props)
    const { editingKey } = this.state;
    return record.id === editingKey;
  };
  cancel_modal = () => {
    this.setState({ modalvisible: false });
    this.props.form.resetFields();
  };
  cancel = (key) => {
    // console.log(key, "this is key...")
    if (key.length > 6) {
      const { data } = this.state;
      console.log("这里的data是啥啊？ ", data);
      const newData = data;
      newData.splice(data.length - 1, 1);
      this.setState({ data: newData, editingKey: key });
    }
    this.setState({ editingKey: "" });
  };

  delete = (key) => {
    const { data } = this.state;
    const newData = data;
    const index = newData.findIndex((item) => key === item.key);
    newData.splice(index, 1);
    this.setState({ data: newData, editingKey: "" });
  };

  showModal = () => {
    const { data, editingKey } = this.state;
    if (editingKey !== "") {
      message.error("请先保存");
      return;
    }
    this.setState({ modalvisible: true });
  };

  edit = (key) => {
    this.setState({ editingKey: key });
  };

  onFinish = (e) => {
    e.preventDefault();
    // console.log("我被调用了====onfinish");
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log("Received values of form: ", values);
        this.props.search(values);
        // console.log("我只能被调用一次?");
        this.props.form.resetFields();
      }
    });
  };
  onFinishFailed = (errorInfo) => {
    console.log("我被调用了====onfinishfailed");
    console.log("Failed:", errorInfo);
  };
  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    console.log("editkey", this.state.editingKey, this.props.editingKey);
    // console.log
    const { student_qr_code_list, student_qr_codeLoading, form } = this.props;
    // const { discovery_list, discoveryLoading, form } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { modalvisible } = this.state;
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        //onCell 作为一个新的参数返回了，那么onCell是个什么东西?
        onCell: (record) => ({
          record,
          inputType: col.dataIndex === "age" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    // const { form } = this.props;
    // const

    // console.log("getFieldDecorator",getFieldDecorator)
    return (
      <div>
        <Modal
          title="新建记录"
          visible={modalvisible}
          onOk={this.saveModal}
          onCancel={this.cancel_modal}
        >
          <Form>
            <Form.Item label="item_no">
              {getFieldDecorator("item_no")(<Input />)}
            </Form.Item>
            <Form.Item label="target_group_id">
              {getFieldDecorator("target_group_id")(<Input />)}
            </Form.Item>
            <Form.Item label="item_label">
              {getFieldDecorator("item_label")(<Input />)}
            </Form.Item>
          </Form>
        </Modal>

        <EditableContext.Provider value={form}>
          <Table
            components={components}
            bordered
            dataSource={student_qr_code_list}
            loading={student_qr_codeLoading}
            columns={columns}
            rowClassName="editable-row"
            pagination={{
              onChange: this.cancel,
            }}
            rowKey="id"
          />
        </EditableContext.Provider>
        <Row gutter={12}>
          {/* <Col span={6}>
            <Button
              onClick={this.showModal}
              type="primary"
              style={{ marginBottom: 16 }}
            >
              添加一行
            </Button>
          </Col> */}
          <Form onSubmit={this.onFinish}>
            <Col span={5}>
              <Form.Item>
                {/* {getFieldDecorator("item_no_input", {
                  rules: [{ required: true, message: "请输入item no" }],
                })(<Input placeholder="item_no" />)} */}
                {getFieldDecorator("item_no_input")(
                  <Input placeholder="item_no" />
                )}
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ marginBottom: 16 }}
                >
                  搜索
                </Button>
              </Form.Item>
            </Col>
          </Form>
        </Row>
      </div>
    );
  }
}
// StudentQrCodeEditTableForm
const StudentQrCodeEditTable = Form.create()(StudentQrCodeEditTableForm);
// export default connect(mapStateToProps)(EditableFormTable);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentQrCodeEditTable);

StudentQrCodeEditTableForm.propTypes = {
  form: PropTypes.object,
};
