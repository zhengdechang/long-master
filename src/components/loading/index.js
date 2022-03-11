// loading组件
import React from "react";
import { Spin } from 'antd'
import "./index.less";
import { useSelector } from 'react-redux'

const Loading = (props) => {

  const loading = useSelector((state) => state.app.loading);


  return (
    <div className={`loading-mask  ${loading ? "" : "loading-hidden"}`}>
      <Spin
        spinning={loading}
        tip="正在加载中......" />
    </div>
  );
};
export default Loading;
