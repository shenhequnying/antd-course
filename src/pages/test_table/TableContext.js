import React from "react";
//create是个啥?
export const EditableContext = React.createContext();
//antd getFieldDecorator  这个是怎么玩的.
//component render 里边是干嘛的.正常都是直接()

//edit需要的过程
//父子间传值、父表格传递给单元格。createcontext
//然后应该需要维持子单元格的状态，新旧两个状态，这里是怎么处理的?
//应该是正常是一个单元格
//在编辑状态，进入context中的另一个单元格?
