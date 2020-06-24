import React from "react";
import { Table, Modal, Button, Form, Input } from "antd";
import { connect } from "dva";
const namespace = "product_item";

function mapStateToProps(state) {
  return {
    //这里就是return model中获取的state到prop中
    product_item_list: state.product_item.product_item_list,
    product_itemLoading: state.loading.effects["product_item/queryList"],
  };
}

class ProductItem extends React.Component {
  columns = [
    {
      title: "item_no",
      dataIndex: "item_no",
    },
    {
      title: "source",
      dataIndex: "source",
    },
    {
      title: "group_id",
      dataIndex: "group_id",
    },
    {
      title: "create_time",
      dataIndex: "create_time",
    },
    {
      title: "qr_code_url",
      dataIndex: "qr_code_url",
    },
  ];
  componentDidMount() {
    this.props.dispatch({
      type: "product_item/queryList",
    });
  }
  render() {
    const { product_item_list, product_itemLoading } = this.props;
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={product_item_list}
          loading={product_itemLoading}
          rowKey="id"
        />
      </div>
    );
  }
}
export default connect(mapStateToProps)(ProductItem);
