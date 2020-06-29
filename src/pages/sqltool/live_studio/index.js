import React from "react";
import LiveStudioEditTableForm from "@/component/sql_tool/LiveStudioEditTableForm";

export default class LiveStudioTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <LiveStudioEditTableForm />;
  }
}
