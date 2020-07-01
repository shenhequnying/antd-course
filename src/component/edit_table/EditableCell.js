import React from "react";
import { Input, InputNumber, Form, Switch, Select } from "antd";
import { EditableContext } from "./TableContext";

const FormItem = Form.Item;

class EditableCell extends React.Component {
  getInput = (dataIndex) => {
    // console.log("输入以下这里，看看我都有什么类型", this.props);
    // console.log("输出下这里: ", this.props.record);
    // console.log("输出所有的key...:", Object.keys(this.props.record));
    // console.log("我看看传进来的东西，能用吗====", dataIndex);
    const { inputType } = this.props;
    if (dataIndex === "live_type") {
      //直播跳转类型1 老版样式 2 新版样式 3 小程序SDK
      const slive_types = ["老版样式", "新版样式", "小程序SDK"];

      // const default_value = slive_types[this.props.record[dataIndex] - 1];
      const default_value = this.props.record[dataIndex].toString();
      // const default_value = this.props.record[dataIndex] - 1).toString();
      console.log(
        "输出下这里，看看是不是正常====",
        this.props.record[dataIndex] - 1,
        "===",
        default_value
      );
      // console.log()
      return (
        <Select
        // defaultValue={default_value}
        // style={{ width: "10%" }}
        // placeholder={default_value}

        // value={this.props.record[dataIndex] - 1}
        >
          <Option value="1">"老版样式"</Option>
          <Option value="2">"新版样式"</Option>
          <Option value="3">"小程序SDK"</Option>
        </Select>
      );
    }
    if (dataIndex === "replay_type") {
      //直播跳转类型1 老版样式 2 新版样式 3 小程序SDK
      const replay_types = ["老版样式", "新版样式", "小程序SDK"];

      const default_value = replay_types[this.props.record[dataIndex] - 1];
      console.log(
        "输出下这里，看看是不是正常====",
        this.props.record[dataIndex] - 1,
        "===",
        default_value
      );
      // console.log()
      return (
        <Select
        // defaultValue="老版样式"
        // style={{ width: "10%" }}
        // placeholder={default_value}
        // value={default_value}
        >
          <Option value="1">"老版样式"</Option>
          <Option value="2">"新版样式"</Option>
          <Option value="3">"小程序SDK"</Option>
        </Select>
      );
    }
    const switchType = [
      "live_show_voucher",
      "live_auto_popup",
      "live_minimize",
      "live_singleday_rank_show",
      "replay_show_atmosphere",
      "replay_show_coupon",
      "replay_show_deposit",
      "replay_show_product",
    ];
    if (switchType.includes(dataIndex)) {
      // const x_value = this.props.record;
      // console.log(x_value);
      // console.log("输出一下这里吧，看看状态怎么样", x_value[dataIndex]);
      let check_default_value = true;
      if (
        (this.props.record[dataIndex] == null) |
        (this.props.record[dataIndex] == 0)
      ) {
        check_default_value = false;
      }
      // let check_default_value = this.props.record[dataIndex];
      // if (check_default_value == null) {
      //   check_default_value = false;
      // }
      return (
        <Switch
          checkedChildren="开"
          unCheckedChildren="关"
          defaultChecked={check_default_value}
        />
      );
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      // index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <FormItem style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput(dataIndex))}
          </FormItem>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

export default EditableCell;
