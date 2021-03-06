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
  Switch,
  Select,
  // Switch,
} from "antd";
import PropTypes from "prop-types";
import { EditableContext } from "@/component/sql_tool/live_studio/TableContext";
import EditableCell from "@/component/sql_tool/live_studio/EditableCell";
import { connect } from "dva";

const namespace = "livestudio";
function mapStateToProps(state) {
  return {
    //这里就是return model中获取的state到prop中
    livestudio_list: state.livestudio.livestudio_list,
    livestudioLoading: state.loading.effects["livestudio/queryList"],
    basestudio_list: state.livestudio.basestudio_list,
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
    search: (studio_id) => {
      console.log("我是mapstate部分，我被调用了====", studio_id);
      const action = {
        type: `${namespace}/search`,
        payload: { studio_id },
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
class LiveStudioEditTableForm extends React.Component {
  componentDidMount() {
    this.props.onDidMount();
  }
  // shouldComponentUpdate() {
  //   console.log("我是生命周期函数should，我被调用了====");
  //   this.forceUpdate();
  // }
  constructor(props) {
    super(props);
    this.state = {
      //数据来源
      editingKey: "",
      modalvisible: false,
    };
    this.columns = [
      {
        title: "工作室编号",
        dataIndex: "base_studio_info.studio_name",
        // dataIndex: "studio_id",
        width: "8%",
        editable: false,
        // fixed: "left",
        // render: (text) => <p color={"green"}>{text}</p>,
        render: (text) => {
          if (text == null) {
            text = "暂无";
          }
          return {
            props: {
              style: { color: "blue" },
            },
            children: <div>{text}</div>,
          };
        },
      },
      // {
      //   title: "工作室编号",
      //   dataIndex: "studio_id",
      //   width: "8%",
      //   editable: false,
      //   // fixed: "left",
      //   // render: (text) => <p color={"green"}>{text}</p>,
      //   render: (text) => {
      //     return {
      //       props: {
      //         style: { color: "blue" },
      //       },
      //       children: <div>{text}</div>,
      //     };
      //   },
      // },
      {
        title: "直播跳转类型",
        dataIndex: "live_type",
        width: "8%",
        editable: true,
        render: (text) => {
          const slive_types = ["老版样式", "新版样式", "小程序SDK"];
          return {
            props: {
              style: { color: "green" },
            },
            children: <div>{slive_types[text - 1]}</div>,
          };
        },
        // fixed: "left",
      },
      {
        title: "重播跳转类型",
        dataIndex: "replay_type",
        // width: "10%",
        editable: true,
        render: (text) => {
          const slive_types = ["老版样式", "新版样式", "小程序SDK"];
          return {
            props: {
              style: { color: "green" },
            },
            children: <div>{slive_types[text - 1]}</div>,
          };
        },
      },
      {
        title: "直播是否显示抵扣卷",
        dataIndex: "live_show_voucher",
        // render: (val) => (val ? "开" : "关"),
        width: "10%",
        editable: true,
        render: (text) => {
          let check_default_value = true;
          if ((text == null) | (text == 0)) {
            check_default_value = false;
          } else {
            check_default_value = true;
          }
          return {
            children: (
              <Switch disabled={true} defaultChecked={check_default_value} />
            ),
          };
        },
      },
      {
        title: "直/重播是否显示单日排行榜",
        dataIndex: "live_singleday_rank_show",
        // render: (val) => (val ? "开" : "关"),
        // width: "10%",
        editable: true,
        render: (text) => {
          let check_default_value = text;
          if ((text == null) | (text == 0)) {
            check_default_value = false;
          } else {
            check_default_value = true;
          }
          return {
            children: (
              <Switch disabled={true} defaultChecked={check_default_value} />
            ),
          };
        },
      },
      {
        title: "重播是否显示定金",
        dataIndex: "replay_show_deposit",
        // render: (val) => (val ? "开" : "关"),
        // width: "10%",
        editable: true,
        render: (text) => {
          let check_default_value = true;
          if ((text == null) | (text == 0)) {
            check_default_value = false;
          } else {
            check_default_value = true;
          }
          return {
            children: (
              <Switch disabled={true} defaultChecked={check_default_value} />
            ),
          };
        },
      },
      {
        title: "直播是否自动弹框",
        dataIndex: "live_auto_popup",
        // render: (val) => (val ? "开" : "关"),
        // width: "10%",
        editable: true,
        render: (text) => {
          let check_default_value = text;
          if ((text == null) | (text == 0)) {
            check_default_value = false;
          } else {
            check_default_value = true;
          }
          return {
            children: (
              <Switch disabled={true} defaultChecked={check_default_value} />
            ),
          };
        },
      },
      {
        title: "重播是否显示优惠券",
        dataIndex: "replay_show_coupon",
        // render: (val) => (val ? "开" : "关"),
        // width: "10%",
        editable: true,
        render: (text) => {
          let check_default_value = true;
          if ((text == null) | (text == 0)) {
            check_default_value = false;
          } else {
            check_default_value = true;
          }
          return {
            children: (
              <Switch disabled={true} defaultChecked={check_default_value} />
            ),
          };
        },
      },
      {
        title: "直播是否最小化",
        dataIndex: "live_minimize",
        // render: (val) => (val ? "开" : "关"),
        // width: "10%",
        editable: true,
        render: (text) => {
          let check_default_value = true;
          if ((text == null) | (text == 0)) {
            check_default_value = false;
          } else {
            check_default_value = true;
          }
          return {
            children: (
              <Switch disabled={true} defaultChecked={check_default_value} />
            ),
          };
        },
      },
      {
        title: "重播是否显示商品",
        dataIndex: "replay_show_product",
        // render: (val) => (val ? "开" : "关"),
        // width: "10%",
        editable: true,
        render: (text) => {
          let check_default_value = text;
          if ((text == null) | (text == 0)) {
            check_default_value = false;
          } else {
            check_default_value = true;
          }
          return {
            children: (
              <Switch disabled={true} defaultChecked={check_default_value} />
            ),
          };
        },
      },
      {
        title: "重播是否显示抵扣卷",
        dataIndex: "replay_show_voucher",
        // render: (val) => (val ? "开" : "关"),
        width: "8%",
        editable: true,
        render: (text) => {
          let check_default_value = true;
          if ((text == null) | (text == 0)) {
            check_default_value = false;
          } else {
            check_default_value = true;
          }
          return {
            children: (
              <Switch disabled={true} defaultChecked={check_default_value} />
            ),
          };
        },
      },
      {
        title: "重播是否显示氛围",
        dataIndex: "replay_show_atmosphere",
        // render: (val) => (val ? "开" : "关"),
        width: "8%",
        editable: true,
        render: (text) => {
          let check_default_value = true;
          if ((text == null) | (text == 0)) {
            check_default_value = false;
          } else {
            check_default_value = true;
          }
          return {
            children: (
              <Switch disabled={true} defaultChecked={check_default_value} />
            ),
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
        fixed: "right",
        width: "7%",
      },
    ];
  }

  save = (id, form) => {
    //   const {editingKey} = this.state;
    // const editingKey = this.state;
    // console.log("在save 函数里，看下editkey的状态", editingKey);
    // if (editingKey !== "") {
    //   message.error("请先保存");
    //   return;
    // }
    this.props.save(id, form);
    // console.log("先调用我，再调用props里的dispatch函数-----");
    this.setState({ editingKey: "" });
    //this.forceUpdate();
    // this.props.onDidMount();
    window.location.href = "/sqltool/livestudio";
    console.log("我被执行了?");
  };
  saveModal = () => {
    // const editingKey = this.state;
    // console.log("在save 函数里，看下editkey的状态", editingKey);
    // if (editingKey !== "") {
    //   message.error("请先保存");
    //   return;
    // }
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
    console.log("我被点击了！！！");
    this.setState({ editingKey: key });
  };

  onFinish = (e) => {
    e.preventDefault();
    // console.log("我被调用了====onfinish");
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
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
    // console.log(
    //   "新的list值为: ----",
    //   this.props.discovery_list,
    //   this.state.editingKey
    // );
    // console.log("editkey_in_ live_studio=====", this.state.editingKey);
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    const {
      livestudio_list,
      livestudioLoading,
      form,
      basestudio_list,
    } = this.props;

    const { getFieldDecorator } = this.props.form;
    const { modalvisible } = this.state;
    let DOM = basestudio_list.map((item) => (
      <Select.Option value={item.id} key={item.id}>
        {item.studio_name}
      </Select.Option>
    ));

    // basestudio_list.forEach((item) => {
    //   console.log("====", item);
    // });
    // console.log(
    //   "我看看能不能拿到，live stuido info的值: ",
    //   // basestudio_list,
    //   typeof this.props.livestudio_list,
    //   // this.props.livestudio_list,
    //   DOM
    //   // Object.values(basestudio_list)
    // );
    console.log(
      "我看看能不能拿到，baseinfo的值: ",
      DOM
      // basestudio_list,
      // typeof this.props.basestudio_list,
      // this.props.basestudio_list
      // Object.values(basestudio_list)
    );
    // console.log("输出  下生成的DOM，是什么个样子:", DOM);
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

    return (
      <div>
        <Modal
          title="新建记录"
          visible={modalvisible}
          onOk={this.saveModal}
          onCancel={this.cancel_modal}
          centered={true}
        >
          <Form>
            <Form.Item label="studio_id">
              {getFieldDecorator("studio_id")(<Select>{DOM}</Select>)}
            </Form.Item>
            <Form.Item label="直播跳转类型">
              {getFieldDecorator("live_type")(
                <Select>
                  <Select.Option value="1">"老版样式"</Select.Option>
                  <Select.Option value="2">"新版样式"</Select.Option>
                  <Select.Option value="3">"小程序SDK"</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="重播跳转类型">
              {getFieldDecorator("replay_type")(
                <Select>
                  <Select.Option value="1">"老版样式"</Select.Option>
                  <Select.Option value="2">"新版样式"</Select.Option>
                  <Select.Option value="3">"小程序SDK"</Select.Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item label="直播是否显示抵扣卷">
              {getFieldDecorator("live_show_voucher", {
                valuePropName: "checked",
                initialValue: false,
              })(
                <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  // defaultChecked={check_default_value}
                />
              )}
            </Form.Item>
            <Form.Item label="直播是否自动弹框">
              {getFieldDecorator("live_auto_popup", {
                valuePropName: "checked",
                initialValue: false,
              })(
                <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  // defaultChecked={check_default_value}
                />
              )}
            </Form.Item>
            <Form.Item label="直播是否最小化">
              {getFieldDecorator("live_minimize", {
                valuePropName: "checked",
                initialValue: false,
              })(
                <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  // defaultChecked={check_default_value}
                />
              )}
            </Form.Item>
            <Form.Item label="直/重播是否显示单日出勤排行榜">
              {getFieldDecorator("live_singleday_rank_show", {
                valuePropName: "checked",
                initialValue: false,
              })(
                <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  // defaultChecked={check_default_value}
                />
              )}
            </Form.Item>
            <Form.Item label="重播是否显示氛围">
              {getFieldDecorator("replay_show_atmosphere", {
                valuePropName: "checked",
                initialValue: false,
              })(
                <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  // defaultChecked={check_default_value}
                />
              )}
            </Form.Item>
            <Form.Item label="重播是否显示优惠券">
              {getFieldDecorator("replay_show_coupon", {
                valuePropName: "checked",
                initialValue: false,
              })(
                <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  // defaultChecked={check_default_value}
                />
              )}
            </Form.Item>
            <Form.Item label="重播是否显示定金">
              {getFieldDecorator("replay_show_deposit", {
                valuePropName: "checked",
                initialValue: false,
              })(
                <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  // defaultChecked={check_default_value}
                />
              )}
            </Form.Item>
            <Form.Item label="重播是否显示抵扣卷">
              {getFieldDecorator("replay_show_voucher", {
                valuePropName: "checked",
                initialValue: false,
              })(
                <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  // defaultChecked={check_default_value}
                />
              )}
            </Form.Item>
            <Form.Item label="重播是否显示商品">
              {getFieldDecorator("replay_show_product", {
                valuePropName: "checked",
                initialValue: false,
              })(
                <Switch
                  checkedChildren="开"
                  unCheckedChildren="关"
                  // defaultChecked={check_default_value}
                />
              )}
            </Form.Item>
          </Form>
        </Modal>

        <EditableContext.Provider value={form}>
          <Table
            components={components}
            bordered
            dataSource={livestudio_list}
            bordered
            scroll={{ x: 1300 }}
            loading={livestudioLoading}
            columns={columns}
            rowClassName="editable-row"
            pagination={{
              onChange: this.cancel,
            }}
            rowKey={(record) => record.id}
          />
        </EditableContext.Provider>
        <Row gutter={20}>
          <Col span={6}>
            <div></div>
            <Button
              onClick={this.showModal}
              type="primary"
              style={{ marginBottom: 16 }}
            >
              添加一行
            </Button>
          </Col>
          <Form onSubmit={this.onFinish}>
            <Col span={8}>
              <Form.Item>
                {/* {getFieldDecorator("item_no_input", {
                  rules: [{ required: true, message: "请输入item no" }],
                })(<Input placeholder="item_no" />)} */}
                {getFieldDecorator("studio_id_input")(
                  <Input placeholder="studio_id" />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
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

const LiveStudioEditTable = Form.create()(LiveStudioEditTableForm);
// export default connect(mapStateToProps)(EditableFormTable);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LiveStudioEditTable);

LiveStudioEditTableForm.propTypes = {
  form: PropTypes.object,
};
