import React from "react";
import StudentQrCodeEditTable from "@/component/sql_tool/student_qr_code/StudentQrCodeEditTableForm";

export default class StudentQrCodeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <StudentQrCodeEditTable />;
  }
}
