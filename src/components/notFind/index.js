// loading组件
import React from "react";
import { Result } from 'antd';
import "./index.less";

const NotFind = () => {
  return (
    <div className="not-find">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />,
    </div>
  );
};
export default NotFind;
