import React from "react";
import { Table, Input, InputNumber, Popconfirm, Form } from "antd";
import { connect } from "dva";
const namespace = "discovery";

function mapStateToProps(state) {
  return {
    //这里就是return model中获取的state到prop中
    discovery_list: state.discovery.discovery_list,
    discoveryLoading: state.loading.effects["discovery/queryList"],
  };
}

class DiscoveryEditable extends React.Component {
  columns = [
    {
      title: "item_no",
      dataIndex: "item_no",
      editable: true,
    },
    {
      title: "target_group_id",
      dataIndex: "target_group_id",
      editable: true,
    },
    {
      title: "item_label",
      dataIndex: "item_label",
      editable: true,
    },
  ];

  componentDidMount() {
    this.props.dispatch({
      type: "discovery/queryList",
    });
  }
  render() {
    const { discovery_list, discoveryLoading } = this.props;
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={discovery_list}
          loading={discoveryLoading}
          rowKey="id"
        />
      </div>
    );
  }
}
export default connect(mapStateToProps)(DiscoveryEditable);
