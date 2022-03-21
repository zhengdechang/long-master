// import { Dispatch } from "redux";
import { LOADING } from "./actionTypes";
import { LOGIN } from "./actionTypes";

// 是否显示加载遮罩层
export const changeLoading = (data) => {
  return {
    type: LOADING,
    data
  };
};

// 是否显示加载遮罩层
export const changeLogin = (data) => {
  return {
    type: LOGIN,
    data
  };
};



// // 修改消息数量
// export const changeMessageNum = (data) => {
//   return {
//     type: MESSAGE_NUM,
//     data
//   };
// };
