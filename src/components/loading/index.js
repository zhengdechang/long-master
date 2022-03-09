// loading组件
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.less";

const Loading = () => {
  return (
    <div className="base-loading flex-center">
      <LoadingOutlined />
    </div>
  );
};
export default Loading;
