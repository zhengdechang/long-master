import { DCM_ENABLE_TOOL, STORE_TOOL, MEASUREMENT_LIST } from "./actionTypes";

const initialState = {
  dcmEnableTool: false,
  tool: '',
  measurementList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DCM_ENABLE_TOOL:
      return { ...state, dcmEnableTool: action.data };
    case STORE_TOOL:
      return { ...state, tool: action.data };
    case MEASUREMENT_LIST:
      return { ...state, measurementList: action.data };

    default:
      return state;
  }
};
export default reducer;
