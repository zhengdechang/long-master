// import { Dispatch } from "redux";
import { DCM_ENABLE_TOOL, STORE_TOOL, MEASUREMENT_LIST } from "./actionTypes";


export const changeDcmEnabledTools = (data) => {
  return {
    type: DCM_ENABLE_TOOL,
    data
  };
};

export const storeTool = (data) => {
  return {
    type: STORE_TOOL,
    data
  };
};
export const changeMeasurementList = (data) => {
  return {
    type: MEASUREMENT_LIST,
    data
  };
};


