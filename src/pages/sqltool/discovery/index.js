import React from "react";
import DiscoveryEditTableForm from "@/component/sql_tool/discovery/DiscoveryEditTableForm";

export default class DiscoveryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <DiscoveryEditTableForm />;
  }
}
